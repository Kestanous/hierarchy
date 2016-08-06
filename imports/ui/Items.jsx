import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionDone from 'material-ui/svg-icons/action/done';
import Badge from 'material-ui/Badge';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import SaveButton from './SaveButton';

import TextField from 'material-ui/TextField';


export default class Items extends Component {
	constructor() {
		super()
		this.state = {edit: false}
	}

	 getBadge(text) {
  	if (text) {
  		if (text > 0) {
  			return <Badge badgeContent={text} secondary={true} />
  		} else {
  			return <Badge badgeContent={text} primary={true} />
  		}
  	} else return <div />
  }

  getHeader() {
  	return(<div>
  		Items
    	<SaveButton active={this.state.edit} onClick={this.onEditToggle.bind(this)} />
		</div>)
  }

	render() {
		if (this.state.edit) {
	    return (
		    <div>
			    <h2>{this.getHeader()}</h2>
			    {this.getItems().map((stat, i) => {
						return (
			      	<div key={i}>
                <TextField hintText="0" value={stat.name}
                  floatingLabelText="Name" floatingLabelFixed={true}/>
                <TextField hintText="0" value={stat.value}
                  floatingLabelText="Amount" floatingLabelFixed={true}/>
			      	</div>
			      )
			    })}
			  </div>
	    );
		} else {
			return (
				<List>
			    <Subheader>{this.getHeader()}</Subheader>
		    	{this.getItems().map((stat, i) => {
		    		return <ListItem key={i} primaryText={stat.name} rightIcon={this.getBadge(stat.value)} />
		    	})}
		    </List>
			)
		}
  }

  getItems() {
  	if (!this.props.character.items) return []
  	return this.props.character.items
  }

  onEditToggle() {
  	this.setState({edit: !this.state.edit})
  }


}