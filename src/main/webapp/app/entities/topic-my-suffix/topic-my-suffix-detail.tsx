import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './topic-my-suffix.reducer';
import { ITopicMySuffix } from 'app/shared/model/topic-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITopicMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TopicMySuffixDetail extends React.Component<ITopicMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { topicEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingarjunApp.topic.detail.title">Topic</Translate> [<b>{topicEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="topicId">
                <Translate contentKey="risingarjunApp.topic.topicId">Topic Id</Translate>
              </span>
            </dt>
            <dd>{topicEntity.topicId}</dd>
            <dt>
              <span id="topicTitle">
                <Translate contentKey="risingarjunApp.topic.topicTitle">Topic Title</Translate>
              </span>
            </dt>
            <dd>{topicEntity.topicTitle}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.topic.course">Course</Translate>
            </dt>
            <dd>{topicEntity.courseCourse ? topicEntity.courseCourse : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.topic.subject">Subject</Translate>
            </dt>
            <dd>{topicEntity.subjectSubjectTitle ? topicEntity.subjectSubjectTitle : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/topic-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/topic-my-suffix/${topicEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ topic }: IRootState) => ({
  topicEntity: topic.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicMySuffixDetail);
