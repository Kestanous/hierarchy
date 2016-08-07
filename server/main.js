import { Meteor } from 'meteor/meteor';
import { Games, Characters, Logs } from '../imports/api/collections.jsx';
import methods from '../imports/api/methods.jsx';

Meteor.methods(methods)

Logs.after.insert(function (userId, doc) {
  let cursor = Logs.find({}, {skip: 100, sort: {createdAt: -1}, fields: {_id: 1}, disableOplog: true})
  cursor.forEach((l) => {
    Logs.remove(l)
  })
});

Meteor.startup(() => {
  if (!Characters.find().count()) {
    gameId = Games.insert({
      name: 'FFC',
      description: `todo`
    })
    Characters.insert({
      gameId,
      name: 'willow',
      avatar: '/avatar.jpg',
      stats: [
        {name: "Strength", value: -2},
        {name: "Agility", value: -1},
        {name: "Vigor", value: 0},
        {name: "Spirit", value: 1},
        {name: "Logic", value: 2},
        {name: "Charisma", value: 0},
        {name: "Perception", value: 0}
      ],
      items: [
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
