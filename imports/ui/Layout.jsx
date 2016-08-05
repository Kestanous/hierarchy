import React, { Component } from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';


export default class Layout extends Component {
  render() {
    let theme;
    if (false) theme = darkBaseTheme
    else theme = lightBaseTheme

    return(
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
