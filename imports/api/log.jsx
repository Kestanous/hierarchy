import { Logs } from '../api/collections.jsx';

export default function log (text) {
  Logs.insert({
    text,
    createdAt: new Date()
  })
}


export function roll (modifier) {
  return Math.ceil((Math.random() * 10)) + modifier
}
