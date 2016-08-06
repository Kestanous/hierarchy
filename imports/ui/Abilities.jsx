import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDone from 'material-ui/svg-icons/action/done';
import SaveButton from './SaveButton';

import TextField from 'material-ui/TextField';



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
              <div key={i} className="abilityEdit">
                <TextField value={ability.name}
                  floatingLabelText="Name" floatingLabelFixed={true}/>
                <TextField value={ability.text}
                  floatingLabelText="Description" floatingLabelFixed={true} multiLine={true} rows={2}/>
              </div> )
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
    this.setState({edit: !this.state.edit})
  }
}
