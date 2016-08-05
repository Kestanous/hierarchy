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

import TextField from 'material-ui/TextField';

class Stats extends Component {
	render() {
    return(

    <List>
    	{this.getItem('Max Health', 16, true)}
    	{this.getItem('Current Health', 4, true)}
    <Divider />
    <Subheader>Stats</Subheader>
    	{this.getItem('Strength', -1)}
    	{this.getItem('Agility', 0)}
    	{this.getItem('Intelligence', 0)}
    	{this.getItem('Spirit', 1)}
    	{this.getItem('Vigor', 0)}
    <Divider />
    <Subheader>Items</Subheader>
      {this.getItem('Gold', 50)}
    	{this.getItem('Rope', 2)}
    	{this.getItem('Staff', 0)}
    	{this.getItem('Orc Hide', 1)}
    	{this.getItem('Rotten Fish', 4)}
    </List>

    )
  }
  getItem(name, num, primary) {
  	return <ListItem primaryText={name} rightIcon={this.getBadge(num, primary)} />
  }
  getBadge(text, primary) {
  	if (text) {
  		if (primary) {
  			return <Badge badgeContent={text} primary={true} />
  		} else {
  			return <Badge badgeContent={text} secondary={true} />
  		}
  	} else return <div />
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, Stats);