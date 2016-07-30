import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


class App extends Component {
  render() {
    return <div>
      hi
    </div>;
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, App);
