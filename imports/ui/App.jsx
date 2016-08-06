import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//api
import { Characters } from '../api/collections.jsx';

//ui
import Divider from 'material-ui/Divider';

//components
import CharacterBio from './CharacterBio';
import Stats from './Stats';
import Abilities from './Abilities';
import ChatLog from './ChatLog';

class App extends Component {
  render() {
    let character = this.props.character
    if (!character) return <div>Loading...</div>

    return(
	   	<div className='container'>
	   		<div className='character'>
	        <div className='bio'>
	        	<CharacterBio character={character} />
	        </div>
	        <div className='stuff'>
		        <div className='stats'>
		        	<Stats character={character} />
		        	<Divider />
		        </div>
		        <div className='abilities'>
		        	<Abilities character={character} />
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
  return {
    character: Characters.findOne()
  };
}, App);
