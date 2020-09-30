import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './testpaper-my-suffix.reducer';
import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITestpaperMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class TestpaperMySuffix extends React.Component<ITestpaperMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { testpaperList, match } = this.props;
    return (
      <div>
        <h2 id="testpaper-my-suffix-heading">
          <Translate contentKey="risingarjunApp.testpaper.home.title">Testpapers</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingarjunApp.testpaper.home.createLabel">Create new Testpaper</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {testpaperList && testpaperList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.testpaper.maxMarks">Max Marks</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.testpaper.durationMins">Duration Mins</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.testpaper.level">Level</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.testpaper.enterprise">Enterprise</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.testpaper.course">Course</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.testpaper.subject">Subject</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.testpaper.topic">Topic</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {testpaperList.map((testpaper, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${testpaper.id}`} color="link" size="sm">
                        {testpaper.id}
                      </Button>
                    </td>
                    <td>{testpaper.maxMarks}</td>
                    <td>{testpaper.durationMins}</td>
                    <td>
                      <Translate contentKey={`risingarjunApp.Questionlevel.${testpaper.level}`} />
                    </td>
                    <td>
                      {testpaper.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${testpaper.enterpriseId}`}>{testpaper.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {testpaper.courseCourse ? <Link to={`course-my-suffix/${testpaper.courseId}`}>{testpaper.courseCourse}</Link> : ''}
                    </td>
                    <td>
                      {testpaper.subjectSubjectTitle ? (
                        <Link to={`subject-my-suffix/${testpaper.subjectId}`}>{testpaper.subjectSubjectTitle}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {testpaper.topics
                        ? testpaper.topics.map((val, j) => (
                            <span key={j}>
                              <Link to={`topic-my-suffix/${val.id}`}>{val.topicTitle}</Link>
                              {j === testpaper.topics.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${testpaper.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${testpaper.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${testpaper.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingarjunApp.testpaper.home.notFound">No Testpapers found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ testpaper }: IRootState) => ({
  testpaperList: testpaper.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestpaperMySuffix);
