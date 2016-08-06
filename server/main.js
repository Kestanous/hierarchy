import { Meteor } from 'meteor/meteor';
import { Characters } from '../imports/api/collections.jsx';

Meteor.startup(() => {
  if (!Characters.find().count()) {
    Characters.insert({
      name: 'willow',
      stats: [
        {name: "Strength", value: -2},
        {name: "Agility", value: -1},
        {name: "Vigor", value: 0},
        {name: "Spirit", value: 1},
        {name: "Logic", value: 2},
        {name: "Charisma", value: 0},
        {name: "Perception", value: 0}
      ],
      itmes: [
        {name: "Gold", value: 50},
        {name: "Scrolls", value: 1},
        {name: "Fans", value: 40},
      ],
      abilities: [
        {name: "Mind Crush", text: "I kinda forgot what you put here :P"},
      ]
    })
  }
});
