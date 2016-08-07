import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

class Profile extends Component {
  render() {
    return(
	   	<div className='container'>
	    </div>
    );
  }
}

//meteorize the class
export default createContainer(() => {
  return {
  };
}, Profile);
