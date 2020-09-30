import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TestresultMySuffix from './testresult-my-suffix';
import TestresultMySuffixDetail from './testresult-my-suffix-detail';
import TestresultMySuffixUpdate from './testresult-my-suffix-update';
import TestresultMySuffixDeleteDialog from './testresult-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TestresultMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TestresultMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TestresultMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={TestresultMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TestresultMySuffixDeleteDialog} />
  </>
);

export default Routes;
