import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDone from 'material-ui/svg-icons/action/done';
import SaveButton from './SaveButton';

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { Characters } from '../api/collections.jsx';


export default class Abilities extends Component {
  constructor(props) {
		super(props)
		this.state = {
      edit: false,
      toEdit: props.character.abilities
    }
	}

  getHeader() {
    return(<div>
      Abilities
      <SaveButton active={this.state.edit} onClick={this.onEditToggle.bind(this)} />
    </div>)
  }

	render() {
    if (this.state.edit) {
      return(
        <div>
          <h2>{this.getHeader()}</h2>
          {this.props.character.abilities.map((ability, i) => {
            return(
              <Paper key={i} className="abilityEdit">
                <div>
                  <TextField value={ability.name} floatingLabelText="Name" floatingLabelFixed={true}
                  onChange={(event) => {
                    let toEdit = this.state.toEdit
                    toEdit[i].name = event.target.value
                    this.setState({toEdit})
                  }}/>
                </div>
                <div>
                  <TextField value={ability.text} floatingLabelText="Description"
                    floatingLabelFixed={true} multiLine={true} fullWidth={true}
                    onChange={(event) => {
                      let toEdit = this.state.toEdit
                      toEdit[i].text = event.target.value
                      this.setState({toEdit})
                    }}/>
                </div>
              </Paper> )
          })}
        </div>)
    } else {
      return(
  			<List className="scroll-view">
          <Subheader>{this.getHeader()}</Subheader>
          {this.props.character.abilities.map((ability, i) => {
            return( <ListItem key={i} primaryText={ability.name} secondaryText={ability.text} /> )
          })}
       	</List>
      )
    }
  }
  onEditToggle() {
    if (this.state.edit) {
      Characters.update({_id: this.props.character._id}, {$set: {abilities: this.state.toEdit}})
    } else {
      this.setState({toEdit: this.props.character.abilities})
    }
    this.setState({edit: !this.state.edit})
  }
}
