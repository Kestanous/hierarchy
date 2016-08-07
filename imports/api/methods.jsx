import { Email } from 'meteor/email'

export default methods = {
  inviteUser(email, gameId) {
    user = Accounts.findUserByEmail(email)
    //TODO
  },
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
  }
}

function makePassword()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
