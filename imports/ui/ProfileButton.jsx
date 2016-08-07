import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionAccountCircle from 'material-ui/svg-icons/action/acount-circle';
import FlatButton from 'material-ui/FlatButton';



export default class profileButton extends Component {
  

	render() {
    if (this.props.active) {
      return(<FlatButton 
      					onClick={this.props.onClick}
      					label="Save"
					      labelPosition="before"
					      primary={true}
					      icon={<ActionAccountCircle />}
    />)
    } else {
      return(<FlatButton
      					onClick={this.props.onClick}
					      label=""
					      labelPosition="before"
					      primary={true}
					      icon={<ActionAccountCircle />}
    />)
    }
  }
}
