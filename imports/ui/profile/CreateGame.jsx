import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

import AddModal from '../AddModal';

import { Games } from '../../api/collections.jsx';

export default class CreateGame extends Component {

  render() {
    return(
	   	<AddModal ref='addModal' title="Create Game" validate={this.validate} save={this.onSaveAdd.bind(this)}>
        <TextField ref='name' fullWidth={true} floatingLabelText="Name" floatingLabelFixed={true} />
        <TextField ref='cover' fullWidth={true} floatingLabelText="Cover Url" floatingLabelFixed={true} />
      </AddModal>
    );
  }

  validate(game) {
    return game.name
  }

  onSaveAdd(game) {
    let {name, cover} = game
    Games.insert({name, cover, gm: Meteor.userId()})
  }

  open() {
    this.refs['addModal'].onOpen()
  }
}
