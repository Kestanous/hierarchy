import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';


class ChatLog extends Component {
	render() {
    return(

			<Paper className='log-container' zDepth={1}>
        <div className='log'>
          hi
        </div>
  		</Paper>

    )
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, ChatLog);
