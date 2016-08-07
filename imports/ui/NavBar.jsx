import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardBackspace from 'material-ui/svg-icons/hardware/keyboard-backspace';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';



export default class NavBar extends Component {
  render() {
    style = {
      height: 64,
      width: '100%',
      textAlign: 'center',
      display: 'inline-block',
      "backgroundColor": 'rgb(0, 188, 212)'
    };
  	return (
      <Paper className="navBar" style={style} zDepth={1}>
        <div>
          <FlatButton
            style = {
            {height: 64} }
            label="Back"
            labelPosition="after"
            primary={false}
            icon={<HardwareKeyboardBackspace />}
          />
        </div>
        <h2 className="navBarTitle">
          H e i r a r c h y
        </h2>
        <div>
          <FlatButton
            style = {
            {height: 64} }
            label="Log Out"
            labelPosition="before"
            primary={false}
            icon={<ActionPowerSettingsNew />}
          />
        </div>
      </Paper>);
  }
}
