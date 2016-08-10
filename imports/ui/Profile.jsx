import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Games, Characters } from '../api/collections.jsx';

import GamesView from './profile/GamesView.jsx';
import CreateGame from './profile/CreateGame.jsx';
import CreateCharacter from './profile/CreateCharacter.jsx';
import User from './profile/User.jsx';

class Profile extends Component {
  render() {
    return(
	   	<div className='profile'>
        <User createGame={this.createGame.bind(this)} createCharacter={this.createCharacter.bind(this)}/>
        <GamesView games={this.props.games} />
        <CreateGame ref='game' />
        <CreateCharacter ref='character' />
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
  return {
    games: Games.find().map((game) => {
      let gm = Meteor.users.findOne(game.gm)
      game.gmName = (gm && gm.profile && gm.profile.username)
      return game
    })
  };
}, Profile);
