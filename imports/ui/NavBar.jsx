import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AppBar from 'material-ui/AppBar';



export default class NavBar extends Component {
  render() {
  		return (
		  <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  	/>
	);
}
}