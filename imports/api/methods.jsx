import { Email } from 'meteor/email'
import { Games } from './collections.jsx';

export default methods = {
  userForgotPassword(email) {
    let password = makePassword(), user = Accounts.findUserByEmail(email)
    Accounts.setPassword(user._id, password)
    Email.send({
      to: email,
      from: "no_reply@hierarchy.com",
      subject: "Password Reset",
      text: `
        A password reset was requested by the user attached to this email.
        Your new password is ${password}.
        You can change this password in your proflie after loging in.
      `
    });
    return 'Email Sent'
  },
  updateUser(options) {
    let user = Meteor.users.findOne(this.userId),
      password = {digest: options.digest, algorithm: 'sha-256'},
      result = Accounts._checkPassword(user, password);
    if (result.error) throw new Meteor.Error('BadPass', "Your password was incorrect")


    let {email, username} = options, set = {}
    if (email) {
      user = Accounts.findUserByEmail(email)
      if (user && user._id != this.userId) {
        throw new Meteor.Error('UserExists', "This email is already in use.")
      } else if (!user) {
        set['emails.0.address'] = email
      }
    }

    if (username) set['profile.username'] = username
    return Meteor.users.update(this.userId, {$set: set})
  },
  addPlayer(email, gameId) {
    let  game = Games.findOne({_id: gameId, gm: this.userId}), user = Accounts.findUserByEmail(email),
      gm = Meteor.users.findOne(this.userId), userId
    if (!game) throw new Meteor.Error('NoGame', "User does not have GM rights to this game (may not exist)")

    if (user) {
      if (user._id == game.gm || game.players.indexOf(user._id) != -1 || game.invited.indexOf(user._id) != -1)
        throw new Meteor.Error('IsPlayer', "User already has access to this game")
      userId = user._id
    } else {
      userId = createUser(email, game, gm)
    }
    Games.update(game._id, {$addToSet: {invited: userId}})
  },
  kickPlayer(userId, gameId) {
    gameCursor = Games.find({_id: gameId, gm: this.userId, $or: [{players: userId}, {invited: userId}]}, {limit: 1})
    if (!gameCursor.count()) throw new Meteor.Error('NoGame', "User does not have GM rights to this game (may not exist)")
    Games.update(gameId, {$pull: {invited: userId, players: userId} })
  }
}

function makePassword() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function createUser(email, game, gm) {
  let password = makePassword(), id = Accounts.createUser({email, password}), extraMessage

  if (gm.profile && gm.profile.username) extraMessage = `by ${gm.profile.username}`
  if (id) {
    Email.send({
      to: email,
      from: "no_reply@hierarchy.com",
      subject: "Welcome to Hierarchy",
      text: `
        You have been invited to play ${game.name} ${extraMessage} at hierarchy-rpg.com!
        We already crated your user, your temporary password is ${password}.
        You can change this password in your proflie after loging in.
        Hope to see you soon!
      `
    });
  }
  return id
}
