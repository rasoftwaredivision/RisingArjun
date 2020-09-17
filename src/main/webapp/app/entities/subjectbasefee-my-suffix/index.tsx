import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubjectbasefeeMySuffix from './subjectbasefee-my-suffix';
import SubjectbasefeeMySuffixDetail from './subjectbasefee-my-suffix-detail';
import SubjectbasefeeMySuffixUpdate from './subjectbasefee-my-suffix-update';
import SubjectbasefeeMySuffixDeleteDialog from './subjectbasefee-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubjectbasefeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubjectbasefeeMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubjectbasefeeMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubjectbasefeeMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={SubjectbasefeeMySuffixDeleteDialog} />
  </>
);

export default Routes;
