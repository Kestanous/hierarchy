import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Characters } from '../../api/collections.jsx';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import GamesCard from './GamesCard';



class GamesView extends Component {
  render() {
    return(
	   	<div  className="gameCardView" >
        {this.props.games.map((game) => {
          return <GamesCard key={game._id} user={this.props.user} game={game} characters={this.props.characters.filter((c) => c.gameId == game._id )} />
        })}
	    </div>
    );
  }
}

//meteorize the class
export default createContainer(() => {
  return {
    characters: Characters.find().fetch()
  };
}, GamesView);
