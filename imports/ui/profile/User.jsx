import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Games } from '../../api/collections.jsx';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import Form from '../Form';
import FormValidators from '../helpers/FormValidators';

class PlayerInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let values = {email: this.props.email, username: this.props.username},
    {username, email, password} = FormValidators
	  return(<Card className="user">
      <CardText>
        <Form values={values} save={this.onSave.bind(this)} validators={{username, email, password}}>
          <TextField ref='username' floatingLabelText="Name" floatingLabelFixed={true} fullWidth={true}/>
          <TextField ref='email' floatingLabelText="Email" floatingLabelFixed={true} fullWidth={true}/>
          <TextField ref='password' type='password' floatingLabelText="Current Password" floatingLabelFixed={true} fullWidth={true}/>
          <div className='userSubmit'>
            <FlatButton ref='submit' label="Submit" primary={true} />
            <span className='userSubmitMessage'>{this.state.message}</span>
          </div>
        </Form>
      </CardText>
      <CardActions>
        <RaisedButton fullWidth={true} onClick={this.props.createGame} label="Create Game" />
        {this.props.gamesToPlay.length > 0 ?
          <RaisedButton fullWidth={true} onClick={this.props.createCharacter} label="Create Character" />
        : null}
      </CardActions>
      {this.props.invitedGames.length > 0 ?
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
		</Card>)
  }

  onSave(data) {
    let {username, email, password} = data, digest = Package.sha.SHA256(password)
    Meteor.call('updateUser', {username, email, digest}, (e, r) => {
      if (!e) this.setState({message: 'Updated'})
      else this.setState({message: e.reason})
    })
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
