import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//api
import { Characters } from '../api/collections.jsx';

//ui
import Divider from 'material-ui/Divider';

//components
import ChatLog from './ChatLog';
import CharacterBio from './character/CharacterBio';
import Stats from './character/Stats';
import Abilities from './character/Abilities';
import Items from './character/Items';

class Character extends Component {
  render() {
    let {character, user, ready} = this.props
    if (!ready) return <div>Loading...</div>
    if (!character) return <div>Ether you dont have access to this character or it no longer exists</div>

    return(
	   	<div className='container'>
	   		<div className='character'>
	        <div className='bio'>
	        	<CharacterBio character={character} user={user} />
	        </div>
	        <div className='stuff'>
		        <div className='stats'>
		        	<Stats character={character} />
		        	<Divider />
		        	<Items character={character} />
		        </div>
		        <div className='abilities'>
		        	<Abilities character={character} />
		        </div>
		      </div>
		    </div>
		    <div className='chatLog'>
	      	<ChatLog gameId={character.gameId} />
	      </div>
	    </div>
    );
  }
}

//meteorize the class
export default createContainer((route) => {
  let characterSub = Meteor.subscribe('character', route.params.characterId)
  return {
    ready: characterSub.ready(),
    character: Characters.findOne({_id: route.params.characterId}),
    user: Meteor.user()
  };
}, Character);
