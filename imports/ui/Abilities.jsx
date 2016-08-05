import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';


class Abilities extends Component {
	render() {
    return(

			<List className="scroll-view">
        <ListItem
          primaryText="Mind Scry"
          secondaryText="Caster attempts to scry the mind of a single target"
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
        <ListItem
          primaryText="Rediculous"
          secondaryText="This is a rediculous ability that takes a very long time to explain and has very many steps to it. It would take forever to fully explain this ability and all that it can do."
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
        <ListItem
          primaryText="Mind Crush"
          secondaryText="Caster attempts to crush the mind of a single target"
        />
     	</List>

    )
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, Abilities);