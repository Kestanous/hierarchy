import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import TextField from 'material-ui/TextField';

export default class CharacterBio extends Component {

	constructor() {
		super()
		this.state = {edit: false}
	}

	getTitle() {
		let title = this.props.character.name
		if (this.state.edit) {
			title = (
				<div>
					<TextField value={this.props.character.name}
                  floatingLabelText="Character Name" floatingLabelFixed={true}/>
        </div>
			)
		}
		return title
	}

	getSubtitle() {
		return "??"
	}

	getBioEdit() {
		return (
			<div>
				<TextField value={this.props.character.bio}
                  floatingLabelText="Character Bio" floatingLabelFixed={true} multiLine={true} rows={2}/>
      </div>
		)
	}

  render() {
  	 return(
    	<Card>
		    <CardHeader
		      title={this.getTitle()}
		      subtitle={this.getSubtitle()}
		      actAsExpander={!this.state.edit}
		      showExpandableButton={!this.state.edit}
		      avatar={this.props.character.avatar}
		    />
		    <CardText expandable={true}>
		    	{this.state.edit ? this.getBioEdit() : this.props.character.bio || 'No Bio' }
		    </CardText>
		    <CardActions expandable={true}>
		      <FlatButton label={this.state.edit ? "Save" : "Edit"} onClick={this.onEditToggle.bind(this)} />
		    </CardActions>
	  	</Card>
  	);
  }

	onEditToggle() {
		this.setState({edit: !this.state.edit})
	}
}
