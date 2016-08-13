import React, { Component } from 'react';

//api
import { Games } from '../../api/collections.jsx';

//components
import Form from '../Form';
import Forms from '../helpers/Forms';
import FormValidators from '../helpers/FormValidators';


//ui
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

export default class Players extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {players, invited, game} = this.props
    return (<div>
      <Form styles={{display: 'flex', displayDirection: 'row', padding: '15px', alignItems: 'center'}}
        save={this.addPlayer.bind(this)} validators={FormValidators.GameAddPlayer}>
        {Forms.GameAddPlayer({flexGrow: 1})}
        <div>
          <RaisedButton ref='submit' primary={true} label="Invite Player" fullWidth={true} />
        </div>
      </Form>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
            <TableHeaderColumn>Remove Player From Game</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {players.map((player) => this.getRow(player) )}
          {invited.map((player) => this.getRow(player, true) )}
        </TableBody>
      </Table>
    </div>)
  }

  getRow(player, notJoined) {
    return (<TableRow key={player._id}>
      <TableRowColumn>{player.username}</TableRowColumn>
      <TableRowColumn>{player.status}</TableRowColumn>
      <TableRowColumn>
        <RaisedButton label={notJoined ? "Revoke Invite" : "Kick"} fullWidth={true} onClick={() => this.kickPlayer(player)} />
      </TableRowColumn>
    </TableRow>)
  }

  kickPlayer(player) {
    Meteor.call('kickPlayer', player._id, this.props.game._id, (e,r) => {
      if (e) alert(e.reason)
    })
  }
  addPlayer(player) {
    Meteor.call('addPlayer', player.email, this.props.game._id, (e,r) => {
      if (e) alert(e.reason)
    })
  }
}
