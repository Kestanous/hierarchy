import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { Characters } from '../api/collections.jsx';

export default class CharacterBio extends Component {

	constructor(props) {
		super(props)
		this.state = {
      edit: false,
      editName: props.character.name,
      editBio: props.character.bio
    }
	}

	getTitle() {
		let title = this.props.character.name
		if (this.state.edit) {
			title = <TextField value={this.state.editName} floatingLabelText="Character Name" floatingLabelFixed={true} onChange={(event) => {
        this.setState({editName: event.target.value})
      }}/>
		}
		return title
	}

	getSubtitle() {
		return "??"
	}

	getBioEdit() {
		return <TextField value={this.state.editBio} floatingLabelText="Character Bio"
      floatingLabelFixed={true} multiLine={true} onChange={(event) => {
        this.setState({editBio: event.target.value})
      }}/>
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
    if (this.state.edit) {
      let name = this.state.editName, bio = this.state.editBio
      Characters.update({_id: this.props.character._id}, {$set: {name, bio}})
    } else {
      this.setState({
        editName: this.props.character.name,
        editBio: this.props.character.bio
      })
    }
		this.setState({edit: !this.state.edit})
	}
}
