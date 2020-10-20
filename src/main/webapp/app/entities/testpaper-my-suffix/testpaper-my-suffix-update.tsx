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
import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { ITestresultMySuffix } from 'app/shared/model/testresult-my-suffix.model';
import { getEntities as getTestresults } from 'app/entities/testresult-my-suffix/testresult-my-suffix.reducer';
import { ITopicMySuffix } from 'app/shared/model/topic-my-suffix.model';
import { getEntities as getTopics } from 'app/entities/topic-my-suffix/topic-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './testpaper-my-suffix.reducer';
import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITestpaperMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITestpaperMySuffixUpdateState {
  isNew: boolean;
  idsenterprise: any[];
  idstestresult: any[];
  idstopic: any[];
  courseId: string;
  subjectId: string;
}

export class TestpaperMySuffixUpdate extends React.Component<ITestpaperMySuffixUpdateProps, ITestpaperMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsenterprise: [],
      idstestresult: [],
      idstopic: [],
      courseId: '0',
      subjectId: '0',
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
    this.props.getEnterprises();
    this.props.getTestresults();
    this.props.getTopics();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { testpaperEntity } = this.props;
      const entity = {
        ...testpaperEntity,
        ...values,
        enterprises: mapIdList(values.enterprises),
        testresults: mapIdList(values.testresults),
        topics: mapIdList(values.topics)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/testpaper-my-suffix');
  };

  render() {
    const { testpaperEntity, courses, subjects, enterprises, testresults, topics, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.testpaper.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.testpaper.home.createOrEditLabel">Create or edit a Testpaper</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : testpaperEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="testpaper-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="testpaper-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="maxMarksLabel" for="testpaper-my-suffix-maxMarks">
                    <Translate contentKey="risingarjunApp.testpaper.maxMarks">Max Marks</Translate>
                  </Label>
                  <AvField
                    id="testpaper-my-suffix-maxMarks"
                    type="string"
                    className="form-control"
                    name="maxMarks"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="durationMinsLabel" for="testpaper-my-suffix-durationMins">
                    <Translate contentKey="risingarjunApp.testpaper.durationMins">Duration Mins</Translate>
                  </Label>
                  <AvField
                    id="testpaper-my-suffix-durationMins"
                    type="string"
                    className="form-control"
                    name="durationMins"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="levelLabel" for="testpaper-my-suffix-level">
                    <Translate contentKey="risingarjunApp.testpaper.level">Level</Translate>
                  </Label>
                  <AvInput
                    id="testpaper-my-suffix-level"
                    type="select"
                    className="form-control"
                    name="level"
                    value={(!isNew && testpaperEntity.level) || 'BEGINNERS'}
                  >
                    <option value="BEGINNERS">{translate('risingarjunApp.Questionlevel.BEGINNERS')}</option>
                    <option value="MODERATE">{translate('risingarjunApp.Questionlevel.MODERATE')}</option>
                    <option value="ADVANCE">{translate('risingarjunApp.Questionlevel.ADVANCE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="testpaper-my-suffix-course">
                    <Translate contentKey="risingarjunApp.testpaper.course">Course</Translate>
                  </Label>
                  <AvInput id="testpaper-my-suffix-course" type="select" className="form-control" name="courseId">
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
                  <Label for="testpaper-my-suffix-subject">
                    <Translate contentKey="risingarjunApp.testpaper.subject">Subject</Translate>
                  </Label>
                  <AvInput id="testpaper-my-suffix-subject" type="select" className="form-control" name="subjectId">
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
                <AvGroup>
                  <Label for="testpaper-my-suffix-enterprise">
                    <Translate contentKey="risingarjunApp.testpaper.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput
                    id="testpaper-my-suffix-enterprise"
                    type="select"
                    multiple
                    className="form-control"
                    name="enterprises"
                    value={testpaperEntity.enterprises && testpaperEntity.enterprises.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {enterprises
                      ? enterprises.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.enterprisename}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="testpaper-my-suffix-testresult">
                    <Translate contentKey="risingarjunApp.testpaper.testresult">Testresult</Translate>
                  </Label>
                  <AvInput
                    id="testpaper-my-suffix-testresult"
                    type="select"
                    multiple
                    className="form-control"
                    name="testresults"
                    value={testpaperEntity.testresults && testpaperEntity.testresults.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {testresults
                      ? testresults.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="testpaper-my-suffix-topic">
                    <Translate contentKey="risingarjunApp.testpaper.topic">Topic</Translate>
                  </Label>
                  <AvInput
                    id="testpaper-my-suffix-topic"
                    type="select"
                    multiple
                    className="form-control"
                    name="topics"
                    value={testpaperEntity.topics && testpaperEntity.topics.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {topics
                      ? topics.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.topicTitle}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/testpaper-my-suffix" replace color="info">
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
  enterprises: storeState.enterprise.entities,
  testresults: storeState.testresult.entities,
  topics: storeState.topic.entities,
  testpaperEntity: storeState.testpaper.entity,
  loading: storeState.testpaper.loading,
  updating: storeState.testpaper.updating,
  updateSuccess: storeState.testpaper.updateSuccess
});

const mapDispatchToProps = {
  getCourses,
  getSubjects,
  getEnterprises,
  getTestresults,
  getTopics,
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
)(TestpaperMySuffixUpdate);
