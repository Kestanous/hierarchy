import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';
import { Characters } from '../../api/collections.jsx';

import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

class GamesView extends Component {
  render() {
    return(
	   	<div>
        {this.props.games.map((game) => {
          return (<Card key={game._id}>
            <CardHeader title={game.name} actAsExpander={true} showExpandableButton={true}/>
            <CardText expandable={true}> {game.description} </CardText>
            <CardText>
            <List>
              {this.props.characters.filter((c) => c.gameId == game._id ).map((character) => {
                return (
                <Link key={character._id} 
                      to={`/characters/${character._id}`}>
                  <ListItem 
                      primaryText={character.name} />
                </Link>
                  )
              })}
            </List>
            </CardText>
          </Card>)
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
