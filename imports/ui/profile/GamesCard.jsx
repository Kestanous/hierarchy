import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Characters } from '../../api/collections.jsx';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';


export default class GamesCard extends Component {

  constructor() {
    super() 
    this.state = {}
  }

  render() {

    let {game,characters} = this.props

    return (<Card className="gameCardCard">
            <CardMedia overlay={<CardTitle title={game.name} subtitle="DM Name" />} >
              <img src="avatar.jpg" />
            </CardMedia>
            <CardText expandable={true}> {game.description} </CardText>
            <CardText className="quickSelect">
              <FlatButton onTouchTap={this.handleOpenMenu.bind(this)} label="characters" />
              <IconMenu iconButtonElement={<IconButton onTouchTap={this.handleOpenMenu.bind(this)}><HardwareKeyboardArrowDown /></IconButton>}
                open={this.state.openMenu}
                onRequestChange={this.handleOnRequestChange.bind(this)}>
              
                {characters.map((character) => {
                return (
                  <MenuItem key={character._id} value={character._id} primaryText={character.name} onTouchTap={this.linkTo.bind(this,character._id)}/>
                  )
              })}
              </IconMenu>
              
            </CardText>
          </Card>)
    
  }
  handleOpenMenu() {
    this.setState({openMenu:true})
  }

  handleOnRequestChange() {
    this.setState({openMenu:false})
  }

  linkTo(value) {
    browserHistory.push(`/characters/${value}`)
  }
}


