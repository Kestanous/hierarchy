import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Layout from '../imports/ui/Layout.jsx';
import Profile from '../imports/ui/Profile.jsx';
import Character from '../imports/ui/Character.jsx';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Profile} />
        <Route path="/character/:characterId" component={Character} />
      </Route>
    </Router>
  ), document.getElementById('render-target'));
});
