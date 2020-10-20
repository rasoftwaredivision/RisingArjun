import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserdetailMySuffix from './userdetail-my-suffix';
import UserpreferenceMySuffix from './userpreference-my-suffix';
import CourseMySuffix from './course-my-suffix';
import StudentMySuffix from './student-my-suffix';
import SubjectMySuffix from './subject-my-suffix';
import AcademicsessionMySuffix from './academicsession-my-suffix';
import StudentsubjectMySuffix from './studentsubject-my-suffix';
import SubjectbasefeeMySuffix from './subjectbasefee-my-suffix';
import DiscountMySuffix from './discount-my-suffix';
import ScholarshipMySuffix from './scholarship-my-suffix';
import StudentfeeMySuffix from './studentfee-my-suffix';
import EmployeeMySuffix from './employee-my-suffix';
import CenterMySuffix from './center-my-suffix';
import CenterheadMySuffix from './centerhead-my-suffix';
import TeacherMySuffix from './teacher-my-suffix';
import TeachershareMySuffix from './teachershare-my-suffix';
import SalarypaymentMySuffix from './salarypayment-my-suffix';
import ExpenseMySuffix from './expense-my-suffix';
import FundamentaldetailMySuffix from './fundamentaldetail-my-suffix';
import QuestionMySuffix from './question-my-suffix';
import EnterpriseMySuffix from './enterprise-my-suffix';
import EnterprisesettingsMySuffix from './enterprisesettings-my-suffix';
import TopicMySuffix from './topic-my-suffix';
import TestpaperMySuffix from './testpaper-my-suffix';
import AnswersheetMySuffix from './answersheet-my-suffix';
import TestresultMySuffix from './testresult-my-suffix';
import TestimonialMySuffix from './testimonial-my-suffix';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/userdetail-my-suffix`} component={UserdetailMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/userpreference-my-suffix`} component={UserpreferenceMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/course-my-suffix`} component={CourseMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/student-my-suffix`} component={StudentMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/subject-my-suffix`} component={SubjectMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/academicsession-my-suffix`} component={AcademicsessionMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/studentsubject-my-suffix`} component={StudentsubjectMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/subjectbasefee-my-suffix`} component={SubjectbasefeeMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/discount-my-suffix`} component={DiscountMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/scholarship-my-suffix`} component={ScholarshipMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/studentfee-my-suffix`} component={StudentfeeMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/employee-my-suffix`} component={EmployeeMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/center-my-suffix`} component={CenterMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/centerhead-my-suffix`} component={CenterheadMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/teacher-my-suffix`} component={TeacherMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/teachershare-my-suffix`} component={TeachershareMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/salarypayment-my-suffix`} component={SalarypaymentMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/expense-my-suffix`} component={ExpenseMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/fundamentaldetail-my-suffix`} component={FundamentaldetailMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/question-my-suffix`} component={QuestionMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/enterprise-my-suffix`} component={EnterpriseMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/enterprisesettings-my-suffix`} component={EnterprisesettingsMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/topic-my-suffix`} component={TopicMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/testpaper-my-suffix`} component={TestpaperMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/answersheet-my-suffix`} component={AnswersheetMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/testresult-my-suffix`} component={TestresultMySuffix} />
      <ErrorBoundaryRoute path={`${match.url}/testimonial-my-suffix`} component={TestimonialMySuffix} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
