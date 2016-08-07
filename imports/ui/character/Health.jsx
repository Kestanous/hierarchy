import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


class Health extends Component {
	render() {
    return(

			<Paper zDepth={0}>
    		<TextField hintText="Max Health" underlineShow={false} />
    		<Divider />
    		<TextField hintText="Current Health" underlineShow={false} />
  		</Paper>

    )
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, Health);