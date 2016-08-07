import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');
export const Characters = new Mongo.Collection('characters');
export const Logs = new Mongo.Collection('logs');
