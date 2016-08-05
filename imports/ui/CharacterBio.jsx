import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';


import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CharacterBio extends Component {
  render() {
    return(
	    <Card>
		    <CardHeader
		      title="Willow Iruka"
		      subtitle="Noxx Liona"
		      actAsExpander={true}
		      showExpandableButton={true}
		      avatar="/avatar.jpg"
		    />
		    <CardText expandable={true}>
		      Willow grew up in a fishing community with her twin brother Jace. From the time she could crawl she found herself getting into trouble, having an innate urge to explore. With her brother also loving to do so, they managed to both have adventures together. Willow always felt that she was close to Jace, she felt that no one understood her more than him. She continually looked to him for help when people were around, as she was shy around them and he was always good at talking. Willow found herself drawn to the surface, she couldn’t resist the open sky and gusts of wind. She was also loved the thrill of possible danger, though in a controlled situation. Once of her favorite activities was cliff diving however she was extremely careful about it, and would never take unnecessary risks. Along with the fresh air Willow found herself drawn to the various animals she found. She always finds herself connecting to them, especially those that she feels are in need. Much of her childhood was spent trying to sneak ‘pets’ into the house. As she looks back on her early childhood Willow finds it to be full of many fond memories. While she never had a particularly strong attachment to the village itself, she loves it for the time she spent there. Thinking of her parents she feels as if she was closer to her dad than her mother, though she loves them both, and part of her wanted to be more like her mom but she feels as if her mother didn’t understand her and didn’t always appreciate her. Despite this she misses them both terribly. 
		    </CardText>
		    <CardActions expandable={true}>
		      <FlatButton label="Edit" />
		    </CardActions>
		  </Card>
    );
  }
}

//meteorize the class
export default createContainer(() => {
  return {};
}, CharacterBio);
