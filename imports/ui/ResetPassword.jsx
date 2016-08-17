import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import Form from './Form';


export default class ResetPassword extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    let token = this.props.params.token, {password, confirmPassword} = FormValidators
  	return(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Form save={this.submit.bind(this)} validators={{password, confirmPassword}}>
          <div className='accounts'>
          <h2>Set your password</h2>
          <div className='accountsForm'>
            <div className='accountsFields'>
              <TextField ref='password' type="password" floatingLabelText="Password" />
              <TextField ref='confirmPassword' type="password" floatingLabelText="Confirm Password"/>
            </div>
          </div>
          <RaisedButton ref='submit' style={{maxWidth: '400px', width: "100%", marginTop: "2vh"}} label="Submit"/>
          <div style={{color: "rgb(244, 67, 54)"}} >{this.state.serverError ? this.state.serverError : ''}</div>
        </div>
      </Form>
    </MuiThemeProvider>);
  }
  submit(form) {
    Accounts.resetPassword(this.props.params.token, form.password, (e,r) => {
      if (e) this.setState({serverError: e.reason})
      else browserHistory.push('/')
    })
  }
}
