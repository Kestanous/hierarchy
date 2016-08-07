import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Games, Characters } from '../api/collections.jsx';

import GamesView from './profile/GamesView.jsx';
import User from './profile/User.jsx';

class Profile extends Component {
  render() {
    return(
	   	<div className='profile'>
          <User />
          <GamesView games={this.props.games} />
	    </div>
    );
  }
}

//meteorize the class
export default createContainer(() => {
  return {
    games: Games.find().fetch()
  };
}, Profile);
