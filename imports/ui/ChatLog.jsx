import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';


class ChatLog extends Component {
  constructor(props) {
    super(props)
    this.state = {offset: 73}
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(event) {
    let offset = (73 - document.body.scrollTop)
    if (offset < 5) offset = 5
    this.setState({offset})
  }

	render() {
    return(
			<Paper style={{top: this.state.offset + 'px'}} className='log-container' zDepth={1}>
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
