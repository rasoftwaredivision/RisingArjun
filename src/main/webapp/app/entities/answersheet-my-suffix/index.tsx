import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AnswersheetMySuffix from './answersheet-my-suffix';
import AnswersheetMySuffixDetail from './answersheet-my-suffix-detail';
import AnswersheetMySuffixUpdate from './answersheet-my-suffix-update';
import AnswersheetMySuffixDeleteDialog from './answersheet-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AnswersheetMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AnswersheetMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AnswersheetMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={AnswersheetMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AnswersheetMySuffixDeleteDialog} />
  </>
);

export default Routes;
