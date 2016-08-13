import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import { Logs } from '../api/collections.jsx';

class ChatLog extends Component {
  constructor(props) {
    super(props)
  }

	render() {
    return(
			<div className='log-container'>
        <div className='log' >
          {this.props.logs.map((log, i) => {
            return (
              <Paper key={i} className="chatText" zDepth={2}>
                  {log.text}
              </Paper>
            )
          })}
        </div>
  		</div>

    )
  }
}

//meteorize the class
export default createContainer(() => {
  return {
    logs: Logs.find({}, {sort: {createdAt: -1}}).fetch()
  };
}, ChatLog);
