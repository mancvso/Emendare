import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Layout, PrivateRoute, Providers } from '../../components'
import * as Pages from '../4_pages'
import { routes } from '../../config'
import { capitalize } from 'lodash'

export const Router = () => (
  <BrowserRouter>
    <Providers>
      <Layout>
        <Switch>
          {routes.map(route => {
            // Resolve Default Path
            route.path =
              typeof route.path === 'string' ? route.path : route.path()

            // Resolve Page Component
            route.component = (Pages as any)[capitalize(route.name) + 'Page']

            // Then return the Route
            return route.private ? (
              <PrivateRoute key={route.path} {...route} />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                component={route.component}
              />
            )
          })}
          <Route component={Pages.ErrorPage} />
        </Switch>
      </Layout>
    </Providers>
  </BrowserRouter>
)
