import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { getEntities as getCourses } from 'app/entities/course-my-suffix/course-my-suffix.reducer';
import { ISubjectMySuffix } from 'app/shared/model/subject-my-suffix.model';
import { getEntities as getSubjects } from 'app/entities/subject-my-suffix/subject-my-suffix.reducer';
import { ITopicMySuffix } from 'app/shared/model/topic-my-suffix.model';
import { getEntities as getTopics } from 'app/entities/topic-my-suffix/topic-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
import { getEntities as getEmployees } from 'app/entities/employee-my-suffix/employee-my-suffix.reducer';
import { IFundamentaldetailMySuffix } from 'app/shared/model/fundamentaldetail-my-suffix.model';
import { getEntities as getFundamentaldetails } from 'app/entities/fundamentaldetail-my-suffix/fundamentaldetail-my-suffix.reducer';
import { IAnswersheetMySuffix } from 'app/shared/model/answersheet-my-suffix.model';
import { getEntities as getAnswersheets } from 'app/entities/answersheet-my-suffix/answersheet-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './question-my-suffix.reducer';
import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IQuestionMySuffixUpdateState {
  isNew: boolean;
  idsfundamental: any[];
  enterpriseId: string;
  courseId: string;
  subjectId: string;
  topicId: string;
  writerId: string;
  approverId: string;
  answersheetId: string;
}

export class QuestionMySuffixUpdate extends React.Component<IQuestionMySuffixUpdateProps, IQuestionMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsfundamental: [],
      enterpriseId: '0',
      courseId: '0',
      subjectId: '0',
      topicId: '0',
      writerId: '0',
      approverId: '0',
      answersheetId: '0',
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

    this.props.getEnterprises();
    this.props.getCourses();
    this.props.getSubjects();
    this.props.getTopics();
    this.props.getEmployees();
    this.props.getFundamentaldetails();
    this.props.getAnswersheets();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { questionEntity } = this.props;
      const entity = {
        ...questionEntity,
        ...values,
        fundamentals: mapIdList(values.fundamentals)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/question-my-suffix');
  };

  render() {
    const {
      questionEntity,
      enterprises,
      courses,
      subjects,
      topics,
      employees,
      fundamentaldetails,
      answersheets,
      loading,
      updating
    } = this.props;
    const { isNew } = this.state;

    const { question, questionDiagram, questionDiagramContentType, ansDiagram, ansDiagramContentType } = questionEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.question.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.question.home.createOrEditLabel">Create or edit a Question</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : questionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="question-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="question-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="questionLabel" for="question-my-suffix-question">
                    <Translate contentKey="risingarjunApp.question.question">Question</Translate>
                  </Label>
                  <AvInput
                    id="question-my-suffix-question"
                    type="textarea"
                    name="question"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="questionDiagramLabel" for="questionDiagram">
                      <Translate contentKey="risingarjunApp.question.questionDiagram">Question Diagram</Translate>
                    </Label>
                    <br />
                    {questionDiagram ? (
                      <div>
                        <a onClick={openFile(questionDiagramContentType, questionDiagram)}>
                          <img src={`data:${questionDiagramContentType};base64,${questionDiagram}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {questionDiagramContentType}, {byteSize(questionDiagram)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('questionDiagram')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_questionDiagram" type="file" onChange={this.onBlobChange(true, 'questionDiagram')} accept="image/*" />
                    <AvInput type="hidden" name="questionDiagram" value={questionDiagram} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="option1Label" for="question-my-suffix-option1">
                    <Translate contentKey="risingarjunApp.question.option1">Option 1</Translate>
                  </Label>
                  <AvField id="question-my-suffix-option1" type="text" name="option1" />
                </AvGroup>
                <AvGroup>
                  <Label id="option2Label" for="question-my-suffix-option2">
                    <Translate contentKey="risingarjunApp.question.option2">Option 2</Translate>
                  </Label>
                  <AvField id="question-my-suffix-option2" type="text" name="option2" />
                </AvGroup>
                <AvGroup>
                  <Label id="option3Label" for="question-my-suffix-option3">
                    <Translate contentKey="risingarjunApp.question.option3">Option 3</Translate>
                  </Label>
                  <AvField id="question-my-suffix-option3" type="text" name="option3" />
                </AvGroup>
                <AvGroup>
                  <Label id="option4Label" for="question-my-suffix-option4">
                    <Translate contentKey="risingarjunApp.question.option4">Option 4</Translate>
                  </Label>
                  <AvField id="question-my-suffix-option4" type="text" name="option4" />
                </AvGroup>
                <AvGroup>
                  <Label id="multiChoiceLabel" check>
                    <AvInput id="question-my-suffix-multiChoice" type="checkbox" className="form-control" name="multiChoice" />
                    <Translate contentKey="risingarjunApp.question.multiChoice">Multi Choice</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="answerLabel" for="question-my-suffix-answer">
                    <Translate contentKey="risingarjunApp.question.answer">Answer</Translate>
                  </Label>
                  <AvField
                    id="question-my-suffix-answer"
                    type="text"
                    name="answer"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="maxMarksLabel" for="question-my-suffix-maxMarks">
                    <Translate contentKey="risingarjunApp.question.maxMarks">Max Marks</Translate>
                  </Label>
                  <AvField
                    id="question-my-suffix-maxMarks"
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
                  <Label id="negativeMarksLabel" for="question-my-suffix-negativeMarks">
                    <Translate contentKey="risingarjunApp.question.negativeMarks">Negative Marks</Translate>
                  </Label>
                  <AvField id="question-my-suffix-negativeMarks" type="string" className="form-control" name="negativeMarks" />
                </AvGroup>
                <AvGroup>
                  <Label id="durationMinsLabel" for="question-my-suffix-durationMins">
                    <Translate contentKey="risingarjunApp.question.durationMins">Duration Mins</Translate>
                  </Label>
                  <AvField
                    id="question-my-suffix-durationMins"
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
                  <Label id="levelLabel" for="question-my-suffix-level">
                    <Translate contentKey="risingarjunApp.question.level">Level</Translate>
                  </Label>
                  <AvInput
                    id="question-my-suffix-level"
                    type="select"
                    className="form-control"
                    name="level"
                    value={(!isNew && questionEntity.level) || 'BEGINNERS'}
                  >
                    <option value="BEGINNERS">{translate('risingarjunApp.Questionlevel.BEGINNERS')}</option>
                    <option value="MODERATE">{translate('risingarjunApp.Questionlevel.MODERATE')}</option>
                    <option value="ADVANCE">{translate('risingarjunApp.Questionlevel.ADVANCE')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="solutionLabel" for="question-my-suffix-solution">
                    <Translate contentKey="risingarjunApp.question.solution">Solution</Translate>
                  </Label>
                  <AvField id="question-my-suffix-solution" type="text" name="solution" />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="ansDiagramLabel" for="ansDiagram">
                      <Translate contentKey="risingarjunApp.question.ansDiagram">Ans Diagram</Translate>
                    </Label>
                    <br />
                    {ansDiagram ? (
                      <div>
                        <a onClick={openFile(ansDiagramContentType, ansDiagram)}>
                          <img src={`data:${ansDiagramContentType};base64,${ansDiagram}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {ansDiagramContentType}, {byteSize(ansDiagram)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('ansDiagram')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_ansDiagram" type="file" onChange={this.onBlobChange(true, 'ansDiagram')} accept="image/*" />
                    <AvInput type="hidden" name="ansDiagram" value={ansDiagram} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="videoLabel" for="question-my-suffix-video">
                    <Translate contentKey="risingarjunApp.question.video">Video</Translate>
                  </Label>
                  <AvField id="question-my-suffix-video" type="text" name="video" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="question-my-suffix-status">
                    <Translate contentKey="risingarjunApp.question.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="question-my-suffix-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && questionEntity.status) || 'CREATED'}
                  >
                    <option value="CREATED">{translate('risingarjunApp.Questionstatus.CREATED')}</option>
                    <option value="REWRITE">{translate('risingarjunApp.Questionstatus.REWRITE')}</option>
                    <option value="APPROVED">{translate('risingarjunApp.Questionstatus.APPROVED')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="question-my-suffix-enterprise">
                    <Translate contentKey="risingarjunApp.question.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="question-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
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
                  <Label for="question-my-suffix-course">
                    <Translate contentKey="risingarjunApp.question.course">Course</Translate>
                  </Label>
                  <AvInput id="question-my-suffix-course" type="select" className="form-control" name="courseId">
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
                  <Label for="question-my-suffix-subject">
                    <Translate contentKey="risingarjunApp.question.subject">Subject</Translate>
                  </Label>
                  <AvInput id="question-my-suffix-subject" type="select" className="form-control" name="subjectId">
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
                  <Label for="question-my-suffix-topic">
                    <Translate contentKey="risingarjunApp.question.topic">Topic</Translate>
                  </Label>
                  <AvInput id="question-my-suffix-topic" type="select" className="form-control" name="topicId">
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
                <AvGroup>
                  <Label for="question-my-suffix-writer">
                    <Translate contentKey="risingarjunApp.question.writer">Writer</Translate>
                  </Label>
                  <AvInput id="question-my-suffix-writer" type="select" className="form-control" name="writerId">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.employeeId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="question-my-suffix-approver">
                    <Translate contentKey="risingarjunApp.question.approver">Approver</Translate>
                  </Label>
                  <AvInput id="question-my-suffix-approver" type="select" className="form-control" name="approverId">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.employeeId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="question-my-suffix-fundamental">
                    <Translate contentKey="risingarjunApp.question.fundamental">Fundamental</Translate>
                  </Label>
                  <AvInput
                    id="question-my-suffix-fundamental"
                    type="select"
                    multiple
                    className="form-control"
                    name="fundamentals"
                    value={questionEntity.fundamentals && questionEntity.fundamentals.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {fundamentaldetails
                      ? fundamentaldetails.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.details}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/question-my-suffix" replace color="info">
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
  enterprises: storeState.enterprise.entities,
  courses: storeState.course.entities,
  subjects: storeState.subject.entities,
  topics: storeState.topic.entities,
  employees: storeState.employee.entities,
  fundamentaldetails: storeState.fundamentaldetail.entities,
  answersheets: storeState.answersheet.entities,
  questionEntity: storeState.question.entity,
  loading: storeState.question.loading,
  updating: storeState.question.updating,
  updateSuccess: storeState.question.updateSuccess
});

const mapDispatchToProps = {
  getEnterprises,
  getCourses,
  getSubjects,
  getTopics,
  getEmployees,
  getFundamentaldetails,
  getAnswersheets,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionMySuffixUpdate);
