import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class PlayerInfo extends Component {

render() {
	return(
			<Card className="user">
		    <CardHeader
		      title="Player Name"
		      subtitle="Player/GM"
		      avatar="avatar.jpg"
		    />
		    <CardText>
		      This could be a short personal bio or perhaps where e-mails and passwords can be edited
		    </CardText>
		    <CardActions>
		      <FlatButton label="Create Game" />
		      <FlatButton label="Join Game" />
		    </CardActions>
		  </Card>
  	)
  }
}
