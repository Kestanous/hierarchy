import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//api
import { Characters, Games } from '../api/collections.jsx';

//components
import ChatLog from './ChatLog';
import General from './game/General';
import Players from './game/Players';

//ui
import {Tabs, Tab} from 'material-ui/Tabs';

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {game, players, invited, ready} = this.props
    if (!ready) return <div>Loading...</div>
    if (!game) return <div>Ether you dont have GM access to this game or it no longer exists</div>

    return (<div >
      <Tabs className='gameTabs'>
        <Tab label="General">
          <General game={game} />
        </Tab>
        <Tab label="Players">
          <Players players={players} invited={invited} game={game} />
        </Tab>
      </Tabs>
      <div className='chatLog'>
        <ChatLog gameId={game._id} />
      </div>
    </div>)
  }
}

//meteorize the class
export default createContainer((route) => {
  let gameSub = Meteor.subscribe('game', route.params.gameId)

  let game = Games.findOne({_id: route.params.gameId}), players = [], invited = []
  if (game) {
    players = Meteor.users.find({_id: {$in: game.players}}).map((player) => {
      return {
        _id: player._id,
        email: (player.emails && player.emails[0].address) || 'Unknown',
        username: (player.profile && player.profile.username) || 'Player',
        status: player.status.online ? "Online" : "Offline"
      }
    })
    invited = Meteor.users.find({_id: {$in: game.invited}}).map((player) => {
      let email = (player.emails && player.emails[0]) || {}, status = 'Not joined Hierarchy'
      if (email.verified) status = 'Invite Pending'
      return {
        _id: player._id,
        email: email.address || 'Unknown',
        username: (player.profile && player.profile.username) || 'Player',
        status: status
      }
    })
  }
  return {game, players, invited, ready: gameSub.ready()};
}, Game);
