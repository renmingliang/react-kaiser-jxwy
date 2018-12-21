import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from './router-config';

const RouteConfig = (
  <Switch>
    {
      routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props => {
              return (<route.component {...props} route={route} />)
            }
          }
        />)
      )
    }
    <Redirect from="*" to="/" />
  </Switch>
)

export default RouteConfig;