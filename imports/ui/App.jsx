import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//ui
import CharacterBio from './CharacterBio';
import Stats from './Stats';

class App extends Component {
  render() {
    return(
	   	<div>
	        <CharacterBio />
	        <div className='stats'>
	        	<Stats />
	        </div>
	    </div>
    );
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, App);
