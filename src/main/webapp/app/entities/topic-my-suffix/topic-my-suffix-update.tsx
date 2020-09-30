import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { getEntities as getCourses } from 'app/entities/course-my-suffix/course-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { getEntities as getSubjects } from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';
import { getEntities as getTestpapers } from 'app/entities/testpaper-my-suffix/testpaper-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './topic-my-suffix.reducer';
import { ITopicMySuffix } from 'app/shared/model/topic-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITopicMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITopicMySuffixUpdateState {
  isNew: boolean;
  courseId: string;
  subjectId: string;
  testpaperId: string;
}

export class TopicMySuffixUpdate extends React.Component<ITopicMySuffixUpdateProps, ITopicMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '0',
      subjectId: '0',
      testpaperId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCourses();
    this.props.getSubjects();
    this.props.getTestpapers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { topicEntity } = this.props;
      const entity = {
        ...topicEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/topic-my-suffix');
  };

  render() {
    const { topicEntity, courses, subjects, testpapers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.topic.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.topic.home.createOrEditLabel">Create or edit a Topic</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : topicEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="topic-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="topic-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="topicIdLabel" for="topic-my-suffix-topicId">
                    <Translate contentKey="risingarjunApp.topic.topicId">Topic Id</Translate>
                  </Label>
                  <AvField
                    id="topic-my-suffix-topicId"
                    type="text"
                    name="topicId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="topicTitleLabel" for="topic-my-suffix-topicTitle">
                    <Translate contentKey="risingarjunApp.topic.topicTitle">Topic Title</Translate>
                  </Label>
                  <AvField id="topic-my-suffix-topicTitle" type="text" name="topicTitle" />
                </AvGroup>
                <AvGroup>
                  <Label for="topic-my-suffix-course">
                    <Translate contentKey="risingarjunApp.topic.course">Course</Translate>
                  </Label>
                  <AvInput id="topic-my-suffix-course" type="select" className="form-control" name="courseId">
                    <option value="" key="0" />
                    {courses
                      ? courses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.course}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="topic-my-suffix-subject">
                    <Translate contentKey="risingarjunApp.topic.subject">Subject</Translate>
                  </Label>
                  <AvInput id="topic-my-suffix-subject" type="select" className="form-control" name="subjectId">
                    <option value="" key="0" />
                    {subjects
                      ? subjects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.subjectTitle}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/topic-my-suffix" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  courses: storeState.course.entities,
  subjects: storeState.subject.entities,
  testpapers: storeState.testpaper.entities,
  topicEntity: storeState.topic.entity,
  loading: storeState.topic.loading,
  updating: storeState.topic.updating,
  updateSuccess: storeState.topic.updateSuccess
});

const mapDispatchToProps = {
  getCourses,
  getSubjects,
  getTestpapers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicMySuffixUpdate);
