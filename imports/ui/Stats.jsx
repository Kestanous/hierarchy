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

import { Characters } from '../api/collections.jsx';


export default class Stats extends Component {
	constructor(props) {
		super(props)
		this.state = {
      edit: false,
      toEdit: props.character.stats
    }
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
  		Stats
    	<SaveButton active={this.state.edit} onClick={this.onEditToggle.bind(this)} />
		</div>)
  }

	render() {
		if (this.state.edit) {
	    return (
		    <div>
			    <h2>{this.getHeader()}</h2>
			    {this.state.toEdit.map((stat, i) => {
						return (
			      	<div key={i}>
                <TextField key={i} value={stat.value} floatingLabelText={stat.name} floatingLabelFixed={true} fullWidth={true}
                  onChange={(event) => {
                    let toEdit = this.state.toEdit
                    toEdit[i].value = event.target.value
                    this.setState({toEdit})
                  }}
                  />
			      	</div>
			      )
			    })}
			  </div>
	    );
		} else {
			return (
				<List className='noselect'>
			    <Subheader>{this.getHeader()}</Subheader>
		    	{this.props.character.stats.map((stat, i) => {
		    		return <ListItem key={i} primaryText={stat.name} rightIcon={this.getBadge(stat.value)} />
		    	})}
		    </List>
			)
		}
  }

  onEditToggle() {
    if (this.state.edit) {
      let stats = []
      for (stat of this.state.toEdit) {
        let sanitizedStat = stat
        sanitizedStat.value = parseInt(sanitizedStat.value) || 0
        stats.push(sanitizedStat)
      }
      Characters.update({_id: this.props.character._id}, {$set: {stats}})
    } else {
      this.setState({toEdit: this.props.character.stats})
    }
  	this.setState({edit: !this.state.edit})
  }

}
