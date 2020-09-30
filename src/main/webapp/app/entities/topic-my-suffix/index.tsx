import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TopicMySuffix from './topic-my-suffix';
import TopicMySuffixDetail from './topic-my-suffix-detail';
import TopicMySuffixUpdate from './topic-my-suffix-update';
import TopicMySuffixDeleteDialog from './topic-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TopicMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TopicMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TopicMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={TopicMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TopicMySuffixDeleteDialog} />
  </>
);

export default Routes;
