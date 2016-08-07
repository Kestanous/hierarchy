import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Layout from '../imports/ui/Layout.jsx';
import Character from '../imports/ui/Character.jsx';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Character} />
      </Route>
    </Router>
  ), document.getElementById('render-target'));
});
