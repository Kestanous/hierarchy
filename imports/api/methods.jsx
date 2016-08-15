import { Email } from 'meteor/email'
import { Games } from './collections.jsx';

export default methods = {
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
      let userId = Accounts.createUser({email})
      if (userId) Accounts.sendEnrollmentEmail(userId)
    }
    Games.update(game._id, {$addToSet: {invited: userId}})
  },
  kickPlayer(userId, gameId) {
    gameCursor = Games.find({_id: gameId, gm: this.userId, $or: [{players: userId}, {invited: userId}]}, {limit: 1})
    if (!gameCursor.count()) throw new Meteor.Error('NoGame', "User does not have GM rights to this game (may not exist)")
    Games.update(gameId, {$pull: {invited: userId, players: userId} })
  }
}
