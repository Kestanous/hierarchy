import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


import NavBar from './NavBar';
import AccountsView from './AccountsView'

class Layout extends Component {
  render() {
    let theme, mainView, loading, toRender = <AccountsView />;
    if (false) theme = darkBaseTheme
    else theme = lightBaseTheme

    mainView = (<div>
      <NavBar location={this.props.location} />
      {this.props.children}
    </div>)

    if (this.props.user) toRender = mainView
    
    return(
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        {toRender}
      </MuiThemeProvider>
    );
  }
}

//meteorize the class
export default createContainer(() => {
  return {
    user: Meteor.user()
  };
}, Layout);
