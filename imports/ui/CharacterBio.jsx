import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class CharacterBio extends Component {
  render() {
    return(
	    <Card>
		    <CardHeader
		      title={this.props.character.name}
		      subtitle="??"
		      actAsExpander={true}
		      showExpandableButton={true}
		      avatar={this.props.character.avatar}
		    />
		    <CardText expandable={true}>{this.props.character.bio || 'No Bio'}</CardText>
		    <CardActions expandable={true}>
		      <FlatButton label="Edit" />
		    </CardActions>
		  </Card>
    );
  }
}
