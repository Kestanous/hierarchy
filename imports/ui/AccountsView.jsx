import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

//ui
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';


//components
import Form from './Form';
import FormValidators from './helpers/FormValidators';

export default class AccountsView extends Component {
  constructor() {
    super()
    this.state = {
      accountsState: 'signIn',
      email: '',
      password: '',
      confirmPassword: '',
      invalidEmail: false,
      invalidPassword: false,
      invalidConfirmPassword: false
    }
  }
  render() {
    let {email, password, confirmPassword} = FormValidators, validators = {email}
    switch (this.state.accountsState) {
      case 'signUp':
        validators.confirmPassword = confirmPassword
      case 'signIn':
        validators.password = password
        break;
      default:

    }
    return(<Form ref='form' save={this.submit.bind(this)} validators={{email, password, confirmPassword}}>
	   	<div className='accounts'>
        <h2>Welcome to Hierarchy</h2>
        <div className='accountsForm'>
          <RadioButtonGroup className='accountsStateGroup' name="AccountState" valueSelected={this.state.accountsState} onChange={(e, value) => {
            this.setState({accountsState: value}, () => { this.refs.form.forceValidate() })
          }}>
            <RadioButton className='accountsState' value="signIn" label="Sign In"/>
            <RadioButton className='accountsState' value="signUp" label="Sign Up"/>
            <RadioButton className='accountsState' value="password" label="Forgot Password" />
          </RadioButtonGroup>
          <div className='accountsFields'>
            <div>
              <TextField ref='email' type="email" floatingLabelText="Email" />
            </div>
            {this.state.accountsState == 'password' ? '' :
              <div>
                <TextField ref='password' type="password" floatingLabelText="Password" />
              </div>
            }
            {this.state.accountsState == 'signUp' ?
              <div>
                <TextField ref='confirmPassword' type="password" floatingLabelText="Confirm Password" />
              </div>
            : ''}
          </div>
        </div>
        <RaisedButton ref='submit' style={{maxWidth: '400px', width: "100%", marginTop: "2vh"}} label="Submit"/>
        <div style={{color: "rgb(244, 67, 54)"}} >{this.state.serverError ? this.state.serverError : ''}</div>
        <div style={{color: "rgb(0, 188, 212)"}} >{this.state.serverResponse ? this.state.serverResponse : ''}</div>
	    </div>
    </Form>);
  }

  errorText(type) {
    switch (type) {
      case 'email':
        if (this.state.invalidEmail) return 'Not a valid email'
        break;
      case 'password':
        if (this.state.invalidPassword) return 'Passwords should be at least 8 characters long'
        break;
      case 'confirmPassword':
        if (this.state.invalidConfirmPassword) return 'Passwords do not match'
        break;
      default: return ''
    }
  }

  submit(data) {
    let {email, password} = data
    switch (this.state.accountsState) {
      case 'signIn':
        Meteor.loginWithPassword(email, password, (e) => {
          if (e) this.setState({serverError: e.reason})
          else this.setState({serverError: false})
        })
        break;
      case 'signUp':
        Accounts.createUser({email, password}, (e) => {
          if (e) this.setState({serverError: e.reason})
          else this.setState({serverError: false})
        })
        break;
      case 'password':
        Accounts.forgotPassword({email: email}, (e, r) => {
          if (e) this.setState({serverError: e.reason})
          else {
            this.setState({serverError: false})
            this.setState({serverResponse: 'Email Sent'})
          }
        })
        break;
      default: return ''
    }
  }
}
