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
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';

import SaveButton from './SaveButton';
import { Characters } from '../api/collections.jsx';

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
  	return(<div className='itemHeader'>
  		Items
    	<SaveButton active={this.state.edit} onClick={this.onEditToggle.bind(this)} />
      {this.state.edit ? 
        <IconButton style={{padding: 0, width: '30px', height: '30px'}}>
          <ContentAdd />
        </IconButton>
      : <div /> }
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
                <TextField value={stat.name} style={{width: '75%'}}
                  floatingLabelText="Name" floatingLabelFixed={true}
                  onChange={(event) => {
                    let toEdit = this.state.toEdit
                    toEdit[i].name = event.target.value
                    this.setState({toEdit})
                  }}/>
                <TextField value={stat.value} style={{width: '25%'}}
                  floatingLabelText="Amount" floatingLabelFixed={true}
                  onChange={(event) => {
                    let toEdit = this.state.toEdit
                    toEdit[i].value = event.target.value
                    this.setState({toEdit})
                  }}/>
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
		    		return <ListItem key={i} disabled={true} primaryText={stat.name} rightIcon={this.getBadge(stat.value)} />
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
    if (this.state.edit) {
      let items = []
      for (item of this.state.toEdit) {
        let sanitized = item
        sanitized.value = parseInt(sanitized.value) || 0
        if (sanitized.value < 1) sanitized.value = 0
        items.push(sanitized)
      }
      Characters.update({_id: this.props.character._id}, {$set: {items}})
    } else {
      this.setState({toEdit: this.props.character.items})
    }
    this.setState({edit: !this.state.edit})
  }


}
