import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './topic-my-suffix.reducer';
import { ITopicMySuffix } from 'app/shared/model/topic-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITopicMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class TopicMySuffix extends React.Component<ITopicMySuffixProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { topicList, match } = this.props;
    return (
      <div>
        <h2 id="topic-my-suffix-heading">
          <Translate contentKey="risingarjunApp.topic.home.title">Topics</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingarjunApp.topic.home.createLabel">Create new Topic</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {topicList && topicList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.topic.topicId">Topic Id</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.topic.topicTitle">Topic Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.topic.course">Course</Translate>
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.topic.subject">Subject</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {topicList.map((topic, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${topic.id}`} color="link" size="sm">
                        {topic.id}
                      </Button>
                    </td>
                    <td>{topic.topicId}</td>
                    <td>{topic.topicTitle}</td>
                    <td>{topic.courseCourse ? <Link to={`course-my-suffix/${topic.courseId}`}>{topic.courseCourse}</Link> : ''}</td>
                    <td>
                      {topic.subjectSubjectTitle ? (
                        <Link to={`subject-my-suffix/${topic.subjectId}`}>{topic.subjectSubjectTitle}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${topic.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${topic.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${topic.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingarjunApp.topic.home.notFound">No Topics found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ topic }: IRootState) => ({
  topicList: topic.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicMySuffix);
