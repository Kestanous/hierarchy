import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionBuild from 'material-ui/svg-icons/action/build';



export default class Abilities extends Component {
  constructor() {
		super()
		this.state = {edit: false}
	}

  getHeader() {
    return(<div>
      Abilities
      <IconButton onClick={this.onEditToggle.bind(this)} iconStyle={{width: 16, height: 16}}
        style={{ width: 24, height: 24, padding: 0, }}>
        <ActionBuild />
      </IconButton>
    </div>)
  }

	render() {
    if (this.state.edit) {
      return(<div>
        <h2>{this.getHeader()}</h2>
      </div>)
    } else {
      return(
  			<List className="scroll-view">
          <Subheader>{this.getHeader()}</Subheader>
          {this.getAbilities().map((ability, i) => {
            return( <ListItem key={i} primaryText={ability.name} secondaryText={ability.text} /> )
          })}
       	</List>
      )
    }
  }
  getAbilities() {
    if (!this.props.character.abilities) return []
  	return this.props.character.abilities
  }
  onEditToggle() {
    this.setState({edit: !this.state.edit})
  }
}
