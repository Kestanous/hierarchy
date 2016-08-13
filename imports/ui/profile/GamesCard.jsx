import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Characters, Games } from '../../api/collections.jsx';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ImageLoader from 'react-imageloader';

export default class GamesCard extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let {game, characters} = this.props;
    return (<Card expanded={this.state.expanded} className="gameCardCard noselect" zDepth={this.state.hovered ? 5 : 1}
              onMouseOver={() => { this.setState({ hovered:true }) } }
              onMouseOut={() => { this.setState({ hovered:false }) } } >
            <CardMedia style={{width: '400px', height: '225px'}} onClick={this.toggleExpand.bind(this)}  overlay={<CardTitle title={game.name} subtitle={game.gmName} />} >
              <ImageLoader imgProps={{style: {width: '400px', height: '225px'}}} src={game.cover || '/avatar.jpg'}>
                <img style={{width: '400px', height: '225px'}} src={'/avatar.jpg'} />
              </ImageLoader>
            </CardMedia>
            <CardText expandable={true}>
              <RaisedButton onTouchTap={this.leaveGame.bind(this, game)} label="leaveGame" fullWidth={true} />
              <div className="quickSelect">
                <FlatButton onTouchTap={this.handleOpenMenu.bind(this)} label="characters" />
                <IconMenu iconButtonElement={<IconButton onTouchTap={this.handleOpenMenu.bind(this)}><HardwareKeyboardArrowDown /></IconButton>}
                  open={this.state.openMenu}
                  onRequestChange={this.handleOnRequestChange.bind(this)}>

                  {characters.map((character) => {
                  return (
                    <MenuItem key={character._id} value={character._id} primaryText={character.name} onTouchTap={this.linkToCharacters.bind(this,character._id)}/>
                    )
                })}
                </IconMenu>
              </div>
            </CardText>
          </Card>)

  }
  toggleExpand() {
    let {user, game, characters} = this.props
    if (game.gm == user._id) {
      browserHistory.push(`/games/${game._id}`)
    } else if (characters.length == 1) {
      this.linkToCharacters(characters[0]._id)
    } else {
      this.setState({expanded: !this.state.expanded})
    }
  }
  handleOpenMenu() {
    this.setState({openMenu:true})
  }

  handleOnRequestChange() {
    this.setState({openMenu:false})
  }

  linkToCharacters(value) {
    browserHistory.push(`/characters/${value}`)
  }
  leaveGame(game) {
    let leave = confirm(`Leave ${game.name}?`)
    if (leave) {
      Games.update(game._id, {
        $pull: {players: Meteor.userId()}
      })
    }
  }
}
