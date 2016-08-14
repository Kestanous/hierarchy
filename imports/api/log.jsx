import { Logs } from '../api/collections.jsx';

export default function log (options = {}) {
  let {actor, gameId, action, flavor, roll} = options
  if (actor, gameId, action, roll) {
    Logs.insert({
      actor, gameId, action, flavor, roll,
      createdAt: new Date()
    })
  }
}


export function roll (modifier = 0) {
  return Math.ceil((Math.random() * 10)) + modifier
}
