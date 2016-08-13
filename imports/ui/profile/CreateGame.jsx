import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

import AddModal from '../AddModal';
import Forms from '../helpers/Forms';


import { Games } from '../../api/collections.jsx';

export default class CreateGame extends Component {

  render() {
    return(
	   	<AddModal ref='addModal' title="Create Game" validate={this.validate} save={this.onSaveAdd.bind(this)}>
        {Forms.GameGeneral({maxHeight: '50vh'})}
      </AddModal>
    );
  }

  validate(game) {
    return game.name
  }

  onSaveAdd(game) {
    let {name, description} = game
    let cover = null
    if (game.cover && game.cover.length) cover = game.cover
    Games.insert({name, cover, description, gm: Meteor.userId(), invited: [], players: []})
  }

  open() {
    this.refs['addModal'].onOpen()
  }
}
