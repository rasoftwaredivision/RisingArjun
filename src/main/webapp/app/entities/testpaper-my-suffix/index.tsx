import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TestpaperMySuffix from './testpaper-my-suffix';
import TestpaperMySuffixDetail from './testpaper-my-suffix-detail';
import TestpaperMySuffixUpdate from './testpaper-my-suffix-update';
import TestpaperMySuffixDeleteDialog from './testpaper-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TestpaperMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TestpaperMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TestpaperMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={TestpaperMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TestpaperMySuffixDeleteDialog} />
  </>
);

export default Routes;
