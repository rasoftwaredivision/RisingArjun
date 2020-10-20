import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TestimonialMySuffix from './testimonial-my-suffix';
import TestimonialMySuffixDetail from './testimonial-my-suffix-detail';
import TestimonialMySuffixUpdate from './testimonial-my-suffix-update';
import TestimonialMySuffixDeleteDialog from './testimonial-my-suffix-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TestimonialMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TestimonialMySuffixUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TestimonialMySuffixDetail} />
      <ErrorBoundaryRoute path={match.url} component={TestimonialMySuffix} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TestimonialMySuffixDeleteDialog} />
  </>
);

export default Routes;
