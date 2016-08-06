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
import ActionBuild from 'material-ui/svg-icons/action/build';


import TextField from 'material-ui/TextField';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class Stats extends Component {
	constructor() {
		super()
		this.state = {edit: false}
	}

	 getBadge(text) {
  	if (text) {
  		if (text > 0) {
  			return <Badge badgeContent={text} primary={true} />
  		} else {
  			return <Badge badgeContent={text} secondary={true} />
  		}
  	} else return <div />
  }

  getHeader() {
  	return(<div>
  		Status
    	<IconButton onClick={this.onEditToggle.bind(this)} iconStyle={{width: 16, height: 16}} 
	    	style={{ width: 24, height: 24, padding: 0, }}>
	      <ActionBuild />
	    </IconButton>
		</div>)
  }

	render() {
		if (this.state.edit) {
	    return (
		    <div>
			    <h2>{this.getHeader()}</h2>
			    {this.getStats().map((stat, i) => {
						return (<TextField key={i} hintText="0" value={stat.value}
			      	floatingLabelText={stat.name} floatingLabelFixed={true}/>
			      	<div>
			      		
			      	</div>
			      	)
			    })}
			  </div>
	    );
		} else {
			return (
				<List>
			    <Subheader>{this.getHeader()}</Subheader>
		    	{this.getStats().map((stat, i) => {
		    		return <ListItem key={i} primaryText={stat.name} rightIcon={this.getBadge(stat.value)} />
		    	})}
		    </List>
			)
		}
  }
  
  getStats() {
  	// {this.getItem('Strength', -1)}
  	// {this.getItem('Agility', 0)}
  	// {this.getItem('Intelligence', 0)}
  	// {this.getItem('Spirit', 1)}
  	// {this.getItem('Vigor', 0)}
  	return [
  		{name: 'Strength', value: -1},
  	]
  }

  onEditToggle() {
  	this.setState({edit: !this.state.edit})
  }


}

//meteorize the class
export default createContainer(() => {
  return {};
}, Stats);