import { Games, Characters, Logs } from './collections.jsx';

Meteor.publish('profile', function () {
  if (!this.userId) return []
  let games = Games.find({ $or: [
    {gm: this.userId},
    {invited: this.userId},
    {players: this.userId}
  ]}), characters = Characters.find({userId: this.userId}, {fields: {gameId: 1, name: 1}})
  return [games, characters]
})

Meteor.publish('character', function (characterId) {
  if (!this.userId || !characterId) return []
  let characterFind = Characters.find({_id: characterId, userId: this.userId}, {limit: 1})

  if (characterFind.count()) {
    let character = characterFind.fetch()[0]
    , game = Games.find({ $or: [
      {gm: this.userId},
      {invited: this.userId},
      {players: this.userId}
    ], gameId: character.gameId}, {limit: 1})
    , logs = Logs.find({gameId: character.gameId})
    return [characterFind, game, logs]
  } else {
    return characterFind
  }
})

Meteor.publish('game', function (gameId) {
  if (!this.userId || !gameId) return []
  let gameFind = Games.find({_id: gameId, gm: this.userId}, {limit: 1})
  if (gameFind.count()) {
    let game = gameFind.fetch()[0]
    , users = Meteor.users.find({ $or: [
      {_id: {$in: game.players || []} },
      {_id: {$in: game.invited || []} }
    ]}, {fields: {profile: 1, 'emails': 1, status: 1}})
    , logs = Logs.find({gameId: gameId})
    return [gameFind, users, logs]

  } else {
    return gameFind
  }
})
