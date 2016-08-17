import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Characters } from '../../api/collections.jsx';

import Form from '../Form';


import TextField from 'material-ui/TextField';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class CreateCharacter extends Component {
  constructor(props) {
    super(props)
    this.STATS = ['Strength', 'Agility', 'Vigor', 'Spirit', 'Logic', 'Charisma', 'Perception']
    let stats = {}
    this.STATS.forEach((stat) => { stats[stat] = 0 })
    this.state = {
      open: false,
      stepIndex: 0,
      character: {
        gameId: this.props.games[0]._id,
        userId: Meteor.userId(),
        stats,
        abilities: [],
        items: []
      },
    }
  }

  getStep() {
    switch (this.state.stepIndex) {
      case 0:
        let games = this.props.games.filter((g) => g.gm != Meteor.userId() )
        return(<Form>
          <SelectField value={games[0]._id} ref='gameId' floatingLabelText="Game" floatingLabelFixed={true} >
            {games.map((game) => {
              return <MenuItem key={game._id} value={game._id} primaryText={game.name} />
            })}
          </SelectField>
          <TextField ref='name' floatingLabelText="Character Name" floatingLabelFixed={true} fullWidth={true} />
          <TextField ref='avatar' floatingLabelText="Avatar URL" floatingLabelFixed={true} fullWidth={true} />
          <TextField ref='bio' floatingLabelText="Character Bio" floatingLabelFixed={true} fullWidth={true}  multiLine={true} />
        </Form>)
      case 1:
        return (
          <Form>
            {this.STATS.map((stat, i) => {
              return <TextField key={i} ref={`stats.${stat}`} floatingLabelText={stat} floatingLabelFixed={true} fullWidth={true} />
            })}
          </Form>
        )
      default:
        return <div />
    }
  }

  disabled() {
    const character = this.state.character
    switch (this.state.stepIndex) {
      case 0:
        if (character.name && character.gameId) return false
        else return true
      case 1: return false
      default:
        return true
    }
  }

  render() {
    const actions = [ this.getBack(), this.getNext() ]
    return(
      <Dialog title={this.props.title} open={this.state.open} onRequestClose={this.onClose.bind(this)} actions={actions} modal={false}>
        <div>
          <Stepper activeStep={this.state.stepIndex}>
            <Step><StepLabel>General Info</StepLabel></Step>
            <Step><StepLabel>Assign Stats</StepLabel></Step>
          </Stepper>
        </div>
        <div className='CreateCharacterForm'>
          <Form values={this.state.character} update={(character) => { this.setState({character}) }} styles={{maxHeight: '50vh'}}>
            {this.getStep()}
          </Form>
        </div>

      </Dialog>
    );
  }

  getBack() {
    if (this.state.stepIndex == 0) {
      return <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.onClose.bind(this)}
      />
    } else {
      return <FlatButton
        label="Back"
        primary={true}
        onTouchTap={() => { this.setState({stepIndex: this.state.stepIndex - 1})} }
      />
    }
  }

  getNext() {
    if (this.state.stepIndex == 1) {
      return <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.onSave.bind(this)}
      />
    } else {
      return <FlatButton
        label="Next"
        primary={true}
        disabled={this.disabled()}
        onTouchTap={() => { this.setState({stepIndex: this.state.stepIndex+1}) }}
      />
    }
  }

  onClose() {
    this.setState({open: false})
  }

  onSave() {
    let character = this.state.character
    character.stats = Object.keys(character.stats).map((key) => {
      return {name: key, value: parseInt(character.stats[key]) || 0}
    })
    let id = Characters.insert(character)
    browserHistory.push(`/characters/${id}`)
  }

  open() {
    this.setState({open: true})
  }
}
