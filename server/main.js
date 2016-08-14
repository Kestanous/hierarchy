import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { Games, Characters, Logs } from '../imports/api/collections.jsx';
import methods from '../imports/api/methods.jsx';
import '../imports/api/publications.jsx';

Meteor.methods(methods)

Logs.after.insert(function (userId, doc) {
  let cursor = Logs.find({}, {skip: 100, sort: {createdAt: -1}, fields: {_id: 1}, disableOplog: true})
  cursor.forEach((l) => {
    Logs.remove(l)
  })
});
