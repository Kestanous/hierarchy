import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../../api/collections.jsx';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


class PlayerInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: props.username,
      email: props.email,
      newPassword: '',
      oldPassword: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username,
      email: nextProps.email
    });
  }
  render() {
	   return(
			<Card className="user">
        <CardText>
            <TextField onChange={this.changePlayerName.bind(this)} value={this.state.username} floatingLabelText="Name" floatingLabelFixed={true} fullWidth={true}/>
            <TextField onChange={this.changeEmail.bind(this)} value={this.state.email} floatingLabelText="Email" floatingLabelFixed={true} fullWidth={true}/>
            <TextField type='password' onChange={this.changeOldPassword.bind(this)} value={this.state.oldPassword} floatingLabelText="Current Password" floatingLabelFixed={true} fullWidth={true}/>
            <TextField type='password' onChange={this.changeNewPassword.bind(this)} value={this.state.newPassword} floatingLabelText="Change Password" floatingLabelFixed={true} fullWidth={true}/>
          <div className='userSubmit'>
            <FlatButton
              label="Submit"
              primary={true}
              disabled={this.submitDisabled()}
              onTouchTap={this.onSave.bind(this)}
            />
            <span className='userSubmitMessage'>{this.state.message}</span>
          </div>
        </CardText>
        <CardActions>
          <RaisedButton fullWidth={true} onClick={this.props.createGame} label="Create Game" />
          {this.props.games.length ?
            <RaisedButton fullWidth={true} onClick={this.props.createCharacter} label="Create Character" />
          : null}
        </CardActions>
        {this.props.invitedGames.length ?
          <CardText>
            <Card>
              <CardHeader title="Your Game Invites" subtitle='Click to accept or decline' />
              <CardActions>
                {this.props.invitedGames.map((game) => {
                  return <RaisedButton key={game._id} fullWidth={true} onClick={this.joinGame.bind(this, game)} label={`${game.name}`} />
                })}
              </CardActions>
            </Card>
          </CardText>
        : '' }
		  </Card>
  	)
  }

  submitDisabled() {
    let {oldPassword, newPassword, changed} = this.state
    if (!oldPassword) return true
    if (oldPassword.length < 8) return true
    if (!(newPassword && newPassword.length > 7) && !changed) return true
  }

  changePlayerName(e, username) {
    this.setState({username, changed: true})
  }

  changeEmail(e, email) {
    this.setState({email, changed: true})
  }

  changeOldPassword(e, oldPassword) {
    this.setState({oldPassword})
  }
  changeNewPassword(e, newPassword) {
    this.setState({newPassword})
  }

  onSave() {
    let {username, email, change, oldPassword, newPassword, changed} = this.state
    if (oldPassword && oldPassword.length > 7) {
      let digest = Package.sha.SHA256(oldPassword)
      if (changed) {
        Meteor.call('updateUser', {username, email, digest}, (e, r) => {
          if (!e) this.setState({oldPassword: '', message: 'Updated', changed: false})
          else this.setState({message: e.reason})
        })
      }
      if (newPassword && newPassword.length > 7) {
        Accounts.changePassword(oldPassword, newPassword, (e, r) => {
         if (!e) this.setState({oldPassword: '', newPassword: '', message: 'Updated'})
         else this.setState({message: e.reason})
       })
      }
      if (newPassword && newPassword.length < 8) {
        this.setState({message: 'New Password too short'})
      }
    }
  }
  joinGame(game) {
    let join = confirm(`Join ${game.name}?`)
    if (join) {
      Games.update(game._id, {
        $pull: {invited: Meteor.userId()},
        $addToSet: {players: Meteor.userId()}
      })
    } else {
      Games.update(game._id, {
        $pull: {invited: Meteor.userId()}
      })
    }
  }
}

//meteorize the class
export default createContainer(() => {
  let user = Meteor.user(), email, username = 'Player'
  if (user) {
    if (user.profile) username = user.profile.username
    if (user.emails && user.emails.length) email = user.emails[0].address
  }
  return {user, email, username};
}, PlayerInfo);
