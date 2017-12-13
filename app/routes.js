/* eslint flowtype-errors/show-errors: 0 */
/* ===
Routes: manage routing in the app. For now, there's just one view so routing is not necessary.
Keeping the default routing to the counter just in case:
import CounterPage from './containers/CounterPage';<Route path="/counter" component={CounterPage} />
=== */

import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Main from './containers/Main';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={Main} />
    </Switch>
  </App>
);
