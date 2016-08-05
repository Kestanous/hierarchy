import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//ui
import CharacterBio from './CharacterBio';
import Stats from './Stats';
import Abilities from './Abilities';
import ChatLog from './ChatLog';

class App extends Component {
  render() {
    return(
	   	<div className='container'>
	   		<div className='character'>
	        <div className='bio'>
	        	<CharacterBio />
	        </div>
	        <div className='stuff'>
		        <div className='stats'>
		        	<Stats />
		        </div>
		        <div className='abilities'>
		        	<Abilities />
		        </div>
		      </div>
		    </div>
		    <div className='chatLog'>
	      	<ChatLog  />
	      </div>
	    </div>
    );
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, App);
