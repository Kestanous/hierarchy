import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';



export default class NavBar extends Component {
  render() {
    style = {
      height: 64,
      width: '100%',
      textAlign: 'center',
      display: 'inline-block',
      "background-color": 'rgb(0, 188, 212)'
    };
  	return (
      <Paper style={style} zDepth={1}>

      </Paper>);
  }
}
