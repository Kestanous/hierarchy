import React, { Component } from 'react';
import AddModal from '../AddModal';
import TextField from 'material-ui/TextField';

export default class CreateCharacter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <AddModal ref='addModal' title="Create Character" validate={this.validate} save={this.onSaveAdd.bind(this)}>
      </AddModal>
    );
  }

  validate() {

  }

  onSaveAdd() {

  }

  open() {
    this.refs['addModal'].onOpen()
  }
}
