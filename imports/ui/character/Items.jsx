import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Random } from 'meteor/random'

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
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';


import SaveButton from './SaveButton';
import AddModal from '../AddModal';
import Form from '../Form';

import { Characters } from '../../api/collections.jsx';

export default class Items extends Component {
	constructor(props) {
		super(props)
		this.state = {
      edit: false,
      toSave: props.character.items
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
  	return(<div className='itemHeader'>
  		Items
    	<SaveButton active={this.state.edit} onClick={this.onEditToggle.bind(this)} />
      {this.state.edit ?
        <IconButton onClick={() => {this.refs['addModal'].onOpen()}} style={{padding: 0, width: '30px', height: '30px'}}>
          <ContentAdd />
        </IconButton>
      : <div /> }
		</div>)
  }

  getForm() {
    return (<div>
      <TextField ref='name' style={{width: '75%'}} floatingLabelText="Name" floatingLabelFixed={true}/>
      <TextField ref='value' style={{width: '25%'}} floatingLabelText="Amount" floatingLabelFixed={true}/>
    </div>)
  }

	render() {
		if (this.state.edit) {
	    return (
		    <div>
			    <h2>{this.getHeader()}</h2>
			    {this.state.toSave.map((item) => {
						return (<div key={item._id}  className="itemEdit">
              <FloatingActionButton onTouchTap={this.onRemoveItem.bind(this, item._id)} zDepth={0} className="abilityEditButton" mini={true} secondary={true}>
                <ContentRemove />
              </FloatingActionButton>
			      	<Form values={item} index={item._id} update={this.onEditUpdate.bind(this)}>
                {this.getForm()}
			      	</Form>
			      </div>)
			    })}
          <AddModal ref='addModal' title="Add Item" validate={this.validate} save={this.onSaveAdd.bind(this)}> {this.getForm()} </AddModal>
			  </div>
	    );
		} else {
			return (
				<List>
			    <Subheader>{this.getHeader()}</Subheader>
		    	{this.props.character.items.map((item) => {
		    		return <ListItem key={item._id} disabled={true} primaryText={item.name} rightIcon={this.getBadge(item.value)} />
		    	})}
		    </List>
			)
		}
  }

  validate(item) {
    return item.name
  }

  onSaveAdd(data) {
    data._id = Random.id()
    let toSave = this.state.toSave
    toSave.push(data)
    this.setState({toSave})
  }

  onRemoveItem(id) {
    let toSave = this.state.toSave, index = toSave.findIndex((a) => a._id == id)
    toSave.splice(index, 1);
    this.setState({toSave})
  }

  onEditUpdate(data, id) {
    let toSave = this.state.toSave, index = toSave.findIndex((a) => a._id == id)
    toSave[index] = data
    this.setState({toSave})
  }

  onEditToggle() {
    if (this.state.edit) {
      let items = []
      for (item of this.state.toSave) {
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
