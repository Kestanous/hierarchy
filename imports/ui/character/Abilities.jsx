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
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import SaveButton from './SaveButton';
import AddModal from '../AddModal';
import Form from '../Form';


import { Characters } from '../../api/collections.jsx';
import log, {roll} from '../../api/log.jsx';


export default class Abilities extends Component {
  constructor(props) {
		super(props)
		this.state = {
      edit: false,
      toSave: props.character.abilities
    }
	}

  getHeader() {
    return(<div className='abilitiesHeader'>
      Abilities
      <SaveButton active={this.state.edit} onClick={this.onEditToggle.bind(this)} />
      {this.state.edit ?
        <IconButton onClick={() => {this.refs['addModal'].onOpen()}} style={{padding: 0, width: '30px', height: '30px'}}>
          <ContentAdd />
        </IconButton>
        : <div />
      }
    </div>)
  }

  getEditForm(ability) {
    return (<div>
      <div className='abilityNameRow'>
        <TextField ref='name' style={{width: "75%"}} floatingLabelText="Name" floatingLabelFixed={true}/>
        <SelectField ref='stat' style={{width: "25%", height: '72px'}}>
          {this.props.character.stats.map((stat, i) => {
            return <MenuItem key={i} value={stat.name} primaryText={stat.name} />
          })}
        </SelectField>
      </div>
      <TextField ref='text' floatingLabelText="Description" floatingLabelFixed={true} multiLine={true} fullWidth={true}/>
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
                <Form values={ability} index={i} update={this.onEditUpdate.bind(this)}>
                  {this.getEditForm(ability)}
                </Form>
              </Paper> )
          })}
          <AddModal defaults={{stat: this.props.character.stats[0].name}} ref="addModal" title="Add Ability"
          validate={this.validate} save={this.onSaveAdd.bind(this)}> {this.getEditForm()} </AddModal>
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

  validate(ability) {
    return ability.name && ability.stat
  }

  onSaveAdd(ability) {
    let toSave = this.state.toSave
    toSave.push(ability)
    this.setState({toSave})
  }

  onEditUpdate(data, index) {
    let toSave = this.state.toSave
    toSave[index] = data
    this.setState({toSave})
  }
  onEditToggle() {
    if (this.state.edit) {
      Characters.update({_id: this.props.character._id}, {$set: {abilities: this.state.toSave}})
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
