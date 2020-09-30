import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './testpaper-my-suffix.reducer';
import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITestpaperMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TestpaperMySuffixDetail extends React.Component<ITestpaperMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { testpaperEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingarjunApp.testpaper.detail.title">Testpaper</Translate> [<b>{testpaperEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="maxMarks">
                <Translate contentKey="risingarjunApp.testpaper.maxMarks">Max Marks</Translate>
              </span>
            </dt>
            <dd>{testpaperEntity.maxMarks}</dd>
            <dt>
              <span id="durationMins">
                <Translate contentKey="risingarjunApp.testpaper.durationMins">Duration Mins</Translate>
              </span>
            </dt>
            <dd>{testpaperEntity.durationMins}</dd>
            <dt>
              <span id="level">
                <Translate contentKey="risingarjunApp.testpaper.level">Level</Translate>
              </span>
            </dt>
            <dd>{testpaperEntity.level}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.testpaper.enterprise">Enterprise</Translate>
            </dt>
            <dd>{testpaperEntity.enterpriseEnterprisename ? testpaperEntity.enterpriseEnterprisename : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.testpaper.course">Course</Translate>
            </dt>
            <dd>{testpaperEntity.courseCourse ? testpaperEntity.courseCourse : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.testpaper.subject">Subject</Translate>
            </dt>
            <dd>{testpaperEntity.subjectSubjectTitle ? testpaperEntity.subjectSubjectTitle : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.testpaper.topic">Topic</Translate>
            </dt>
            <dd>
              {testpaperEntity.topics
                ? testpaperEntity.topics.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.topicTitle}</a>
                      {i === testpaperEntity.topics.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/testpaper-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/testpaper-my-suffix/${testpaperEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ testpaper }: IRootState) => ({
  testpaperEntity: testpaper.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestpaperMySuffixDetail);
