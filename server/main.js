import { Meteor } from 'meteor/meteor';
import { Characters } from '../imports/api/collections.jsx';

Meteor.startup(() => {
  if (!Characters.find().count()) {
    Characters.insert({
      name: 'willow',
      stats: [],
      itmes: [],
      abilities: []
    })
  }
});
