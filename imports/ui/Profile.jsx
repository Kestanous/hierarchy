import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Games, Characters } from '../api/collections.jsx';

import GamesView from './profile/GamesView.jsx';
import CreateGame from './profile/CreateGame.jsx';
import CreateCharacter from './profile/CreateCharacter.jsx';
import User from './profile/User.jsx';

class Profile extends Component {
  render() {
    if (!this.props.ready) return <div />
    let gamesToPlay = this.props.games.filter((g) => g.gm != this.props.user._id)
    return(
	   	<div className='profile'>
        <User games={this.props.games} gamesToPlay={gamesToPlay} invitedGames={this.props.invitedGames} createGame={this.createGame.bind(this)} createCharacter={this.createCharacter.bind(this)}/>
        <GamesView games={this.props.games} user={this.props.user} characters={this.props.characters} />
        <CreateGame ref='game' />
        {gamesToPlay.length > 0 ? <CreateCharacter ref='character' games={gamesToPlay} /> : null}
	    </div>
    )
  }

  createGame() {
    this.refs.game.open()
  }

  createCharacter() {
    this.refs.character.open()
  }
}

//meteorize the class
export default createContainer(() => {
  let profileSub = Meteor.subscribe('profile')
  if (!profileSub.ready()) {
    return {
      ready: false
    };
  } else {
   return {
      ready: true,
      games: Games.find({$or: [{players: Meteor.userId()}, {gm: Meteor.userId()}] }).map((game) => {
        let gm = Meteor.users.findOne(game.gm)
        game.gmName = (gm && gm.profile && gm.profile.username)
        return game
      }),
      invitedGames: Games.find({invited: Meteor.userId()}).map((game) => {
        let gm = Meteor.users.findOne(game.gm)
        game.gmName = (gm && gm.profile && gm.profile.username)
        return game
      }),
      characters: Characters.find().fetch(),
      user: Meteor.user()
    }
  }
}, Profile);
