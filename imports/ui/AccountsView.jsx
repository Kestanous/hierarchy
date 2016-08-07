import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

//ui
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';


//components
import ChatLog from './ChatLog';
import CharacterBio from './character/CharacterBio';
import Stats from './character/Stats';
import Abilities from './character/Abilities';
import Items from './character/Items';

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
    return(
	   	<div className='accounts'>
        <h2>Welcome to Hierarchy</h2>
        <div className='accountsForm'>
          <RadioButtonGroup className='accountsStateGroup' name="AccountState" valueSelected={this.state.accountsState} onChange={(e, value) => {
            this.setState({accountsState: value})
          }}>
            <RadioButton className='accountsState' value="signIn" label="Sign In"/>
            <RadioButton className='accountsState' value="signUp" label="Sign Up"/>
            <RadioButton className='accountsState' value="password" label="Forgot Password" />
          </RadioButtonGroup>
          <div className='accountsFields'>
            <div>
              <TextField type="email" floatingLabelText="Email" errorText={this.errorText('email')}
                value={this.state.email} onChange={this.updateEmail.bind(this)}/>
            </div>
            {this.state.accountsState == 'password' ? '' :
              <div>
                <TextField type="password" floatingLabelText="Password" errorText={this.errorText('password')}
                  value={this.state.password} onChange={this.updatePassword.bind(this)}/>
              </div>
            }
            {this.state.accountsState == 'signUp' ?
              <div>
                <TextField type="password" floatingLabelText="Confirm Password" value={this.state.confirmPassword}
                  errorText={this.errorText('confirmPassword')} onChange={this.updateConfirmPassword.bind(this)}/>
              </div>
            : ''}
          </div>
        </div>
        <RaisedButton onClick={this.submit.bind(this)} style={{maxWidth: '400px', width: "100%", marginTop: "2vh"}}
          label="Submit" disabled={ this.submitDisabled() }/>
        <div style={{color: "rgb(244, 67, 54)"}} >{this.state.serverError ? this.state.serverError : ''}</div>
        <div style={{color: "rgb(0, 188, 212)"}} >{this.state.serverResponse ? this.state.serverResponse : ''}</div>
	    </div>
    );
  }
  submitDisabled() {
    switch (this.state.accountsState) {
      case 'signIn': return this.state.invalidEmail || this.state.invalidPassword
      case 'signUp': return this.state.invalidEmail || this.state.invalidPassword || this.state.invalidConfirmPassword
      case 'password': return this.state.invalidEmail
      default: return false
    }
  }
  updateEmail(e) {
    this.setState({email: e.target.value, invalidEmail: !emailRegex.test(e.target.value)})
  }

  updatePassword(e) {
    this.setState({
      password: e.target.value,
      invalidPassword: !passwordRegex.test(e.target.value),
      invalidConfirmPassword: this.state.confirmPassword != e.target.value})
  }

  updateConfirmPassword(e) {
    this.setState({confirmPassword: e.target.value, invalidConfirmPassword: this.state.password != e.target.value})
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

  submit(e) {
    e.preventDefault()
    switch (this.state.accountsState) {
      case 'signIn':
        Meteor.loginWithPassword(this.state.email, this.state.password, (e) => {
          if (e) this.setState({serverError: e.reason})
          else this.setState({serverError: false})
        })
        break;
      case 'signUp':
        const {email, password} = this.state
        Accounts.createUser({email, password}, (e) => {
          if (e) this.setState({serverError: e.reason})
          else this.setState({serverError: false})
        })
        break;
      case 'password':
        Meteor.call('userForgotPassword', this.state.email, (e, r) => {
          if (e) this.setState({serverError: e.reason})
          else {
            this.setState({serverError: false})
            if (r) this.setState({serverResponse: r})
          }
        })
        break;
      default: return ''
    }
  }
}

const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passwordRegex = /^.{8,}$/
