import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionDone from 'material-ui/svg-icons/action/done';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import SaveButton from './SaveButton';
import { Characters } from '../api/collections.jsx';
import log, {roll} from '../api/log.jsx';


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
          {this.state.toEdit.map((ability, i) => {
            return(
              <Paper key={i} className="abilityEdit">
                <div>
                  <TextField value={ability.name} style={{width: "75%"}} floatingLabelText="Name" floatingLabelFixed={true}
                  onChange={(event) => {
                    let toEdit = this.state.toEdit
                    toEdit[i].name = event.target.value
                    this.setState({toEdit})
                  }}/>
                  <SelectField value={ability.stat} style={{width: "25%"}} onChange={(event, key, payload) => {
                    let toEdit = this.state.toEdit
                    toEdit[i].stat = payload
                    this.setState({toEdit})
                  }}>
                    {this.props.character.stats.map((stat, ii) => {
                      return <MenuItem key={ii} value={stat.name} primaryText={stat.name} />
                    })}
                  </SelectField>
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
  			<List className="scroll-view noselect">
          <Subheader>{this.getHeader()}</Subheader>
          {this.props.character.abilities.map((ability, i) => {
            return( <ListItem key={i} primaryText={`${ability.name} (${ability.stat})`} secondaryText={ability.text} onClick={this.onLog.bind(this, ability)} /> )
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
  onLog(ability) {
    let character = this.props.character, statValue = 0, stat = this.props.character.stats.find((s) => s.name == ability.stat)
    if (stat) statValue = stat.value
    log(`${character.name} uses ${ability.name} and rolls a ${roll(1 + statValue)} `)
  }
}
