import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

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
      backgroundColor: 'rgb(0, 188, 212)',
      borderRadius: 0
    };
    let shouldBack = true
    if (this.props.location.pathname == '/') shouldBack = false
  	return (
      <Paper className="navBar" style={style} zDepth={1}>
        <div>
          {shouldBack ?
            <Link to={'/'}><FlatButton
              style = {
              {height: 64} }
              label="Back"
              labelPosition="after"
              primary={false}
              icon={<HardwareKeyboardBackspace />}
            /></Link>
            : '' }
        </div>
        <h2 className="navBarTitle">
          H i e r a r c h y
        </h2>
        <div>
          <FlatButton
            onClick={() => Meteor.logout() }
            style = { {height: 64} }
            label="Log Out"
            labelPosition="before"
            primary={false}
            icon={<ActionPowerSettingsNew />}
          />
        </div>
      </Paper>);
  }
}
