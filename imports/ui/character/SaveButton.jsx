import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDone from 'material-ui/svg-icons/action/done';
import FlatButton from 'material-ui/FlatButton';



export default class SaveButton extends Component {
  

	render() {
    if (this.props.active) {
      return(<FlatButton 
      					onClick={this.props.onClick}
      					label="Save"
					      labelPosition="before"
					      primary={true}
					      icon={<ActionDone />}
    />)
    } else {
      return(<FlatButton
      					onClick={this.props.onClick}
					      label=""
					      labelPosition="before"
					      primary={true}
					      icon={<ActionSettings />}
    />)
    }
  }
}
