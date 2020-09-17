import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './subjectbasefee-my-suffix.reducer';
import { ISubjectbasefeeMySuffix } from 'app/shared/model/subjectbasefee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubjectbasefeeMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class SubjectbasefeeMySuffix extends React.Component<ISubjectbasefeeMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { subjectbasefeeList, match } = this.props;
    return (
      <div>
        <h2 id="subjectbasefee-my-suffix-heading">
          <Translate contentKey="risingarjunApp.subjectbasefee.home.title">Subjectbasefees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingarjunApp.subjectbasefee.home.createLabel">Create new Subjectbasefee</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {subjectbasefeeList && subjectbasefeeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.subjectbasefee.baseFee">Base Fee</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.subjectbasefee.course">Course</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.subjectbasefee.enterprise">Enterprise</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.subjectbasefee.session">Session</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {subjectbasefeeList.map((subjectbasefee, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${subjectbasefee.id}`} color="link" size="sm">
                        {subjectbasefee.id}
                      </Button>
                    </td>
                    <td>{subjectbasefee.baseFee}</td>
                    <td>
                      {subjectbasefee.courseCourse ? (
                        <Link to={`course-my-suffix/${subjectbasefee.courseId}`}>{subjectbasefee.courseCourse}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {subjectbasefee.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${subjectbasefee.enterpriseId}`}>{subjectbasefee.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {subjectbasefee.sessionAcadSession ? (
                        <Link to={`academicsession-my-suffix/${subjectbasefee.sessionId}`}>{subjectbasefee.sessionAcadSession}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${subjectbasefee.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subjectbasefee.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${subjectbasefee.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="risingarjunApp.subjectbasefee.home.notFound">No Subjectbasefees found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ subjectbasefee }: IRootState) => ({
  subjectbasefeeList: subjectbasefee.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectbasefeeMySuffix);
