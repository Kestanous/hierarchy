import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Form from './Form';

export default class AddModal extends Component {
  constructor(props) {
		super(props)
		this.state = {
      open: false,
      toSave: props.defaults || {}
    }
	}
	render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.onClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.disabled()}
        onTouchTap={this.onSave.bind(this)}
      />
    ]

    return (
      <Dialog className="addModal" title={this.props.title} actions={actions} modal={false}
        open={this.state.open} onRequestClose={this.onClose.bind(this)} >
          <Form values={this.props.defaults || {}} className="addModalContent" update={this.onEditUpdate.bind(this)}>
            {this.props.children}
          </Form>
      </Dialog>
    )
  }

  onOpen() {
    this.setState({open: true})
  }

  onClose() {
    this.setState({open: false})
  }

  onSave() {
    this.props.save(this.state.toSave)
    this.onClose()
  }

  disabled() {
    if (this.props.validate) {
      return !this.props.validate(this.state.toSave)
    }
  }

  onEditUpdate(toSave) {
    this.setState({toSave})
  }
}
