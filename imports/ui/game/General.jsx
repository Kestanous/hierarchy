import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

//api
import { Games } from '../../api/collections.jsx';

//components
import Form from '../Form';
import Forms from '../helpers/Forms';
import FormValidators from '../helpers/FormValidators';

//ui
import RaisedButton from 'material-ui/RaisedButton';
import ImageLoader from 'react-imageloader';

export default class General extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {game} = this.props
    return (<div className='gameTabContent'>
      <div className='gameTabForm'>
        <Form values={game} save={this.save.bind(this)} validators={FormValidators.GameGeneral}>
          {Forms.GameGeneral()}
          <RaisedButton ref='submit' primary={true} label="Update" fullWidth={true} />
        </Form>
      </div>
      <ImageLoader imgProps={{style: {width: '400px', height: '225px'}}} src={game.cover || '/avatar.jpg'} >
        <img style={{width: '400px', height: '225px'}} src={'/avatar.jpg'} />
      </ImageLoader>
    </div>)
  }
  save(game) {
    let cover = null
    if (game.cover && game.cover.length) cover = game.cover
    Games.update(game._id, {$set: {name: game.name, cover: cover, description: game.description}})
  }
}
