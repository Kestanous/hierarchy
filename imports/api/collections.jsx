import { Mongo } from 'meteor/mongo';

export const Games = new Mongo.Collection('games');
export const Characters = new Mongo.Collection('characters');
export const RollLogs = new Mongo.Collection('roll_logs');
