import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ICourseMySuffix } from 'app/shared/model/course-my-suffix.model';
import { getEntities as getCourses } from 'app/entities/course-my-suffix/course-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './student-my-suffix.reducer';
import { IStudentMySuffix } from 'app/shared/model/student-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStudentMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStudentMySuffixUpdateState {
  isNew: boolean;
  idscourse: any[];
  userId: string;
}

export class StudentMySuffixUpdate extends React.Component<IStudentMySuffixUpdateProps, IStudentMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idscourse: [],
      userId: '0',
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

    this.props.getUsers();
    this.props.getCourses();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { studentEntity } = this.props;
      const entity = {
        ...studentEntity,
        ...values,
        courses: mapIdList(values.courses)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/student-my-suffix');
  };

  render() {
    const { studentEntity, users, courses, loading, updating } = this.props;
    const { isNew } = this.state;

    const { registrationForm, registrationFormContentType } = studentEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.student.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.student.home.createOrEditLabel">Create or edit a Student</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : studentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="student-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="student-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="studentRegIdLabel" for="student-my-suffix-studentRegId">
                    <Translate contentKey="risingarjunApp.student.studentRegId">Student Reg Id</Translate>
                  </Label>
                  <AvField
                    id="student-my-suffix-studentRegId"
                    type="text"
                    name="studentRegId"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="registrationFormLabel" for="registrationForm">
                      <Translate contentKey="risingarjunApp.student.registrationForm">Registration Form</Translate>
                    </Label>
                    <br />
                    {registrationForm ? (
                      <div>
                        <a onClick={openFile(registrationFormContentType, registrationForm)}>
                          <img src={`data:${registrationFormContentType};base64,${registrationForm}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {registrationFormContentType}, {byteSize(registrationForm)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('registrationForm')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_registrationForm" type="file" onChange={this.onBlobChange(true, 'registrationForm')} accept="image/*" />
                    <AvInput type="hidden" name="registrationForm" value={registrationForm} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="parentMobNo1Label" for="student-my-suffix-parentMobNo1">
                    <Translate contentKey="risingarjunApp.student.parentMobNo1">Parent Mob No 1</Translate>
                  </Label>
                  <AvField id="student-my-suffix-parentMobNo1" type="text" name="parentMobNo1" />
                </AvGroup>
                <AvGroup>
                  <Label id="parentMobNo2Label" for="student-my-suffix-parentMobNo2">
                    <Translate contentKey="risingarjunApp.student.parentMobNo2">Parent Mob No 2</Translate>
                  </Label>
                  <AvField id="student-my-suffix-parentMobNo2" type="text" name="parentMobNo2" />
                </AvGroup>
                <AvGroup>
                  <Label id="parentEmailIdLabel" for="student-my-suffix-parentEmailId">
                    <Translate contentKey="risingarjunApp.student.parentEmailId">Parent Email Id</Translate>
                  </Label>
                  <AvField id="student-my-suffix-parentEmailId" type="text" name="parentEmailId" />
                </AvGroup>
                <AvGroup>
                  <Label id="studentStatusLabel" for="student-my-suffix-studentStatus">
                    <Translate contentKey="risingarjunApp.student.studentStatus">Student Status</Translate>
                  </Label>
                  <AvInput
                    id="student-my-suffix-studentStatus"
                    type="select"
                    className="form-control"
                    name="studentStatus"
                    value={(!isNew && studentEntity.studentStatus) || 'GRADUATED'}
                  >
                    <option value="GRADUATED">{translate('risingarjunApp.Studentstatus.GRADUATED')}</option>
                    <option value="JOINED">{translate('risingarjunApp.Studentstatus.JOINED')}</option>
                    <option value="LEFT">{translate('risingarjunApp.Studentstatus.LEFT')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="leavingReasonLabel" for="student-my-suffix-leavingReason">
                    <Translate contentKey="risingarjunApp.student.leavingReason">Leaving Reason</Translate>
                  </Label>
                  <AvInput
                    id="student-my-suffix-leavingReason"
                    type="select"
                    className="form-control"
                    name="leavingReason"
                    value={(!isNew && studentEntity.leavingReason) || 'NA'}
                  >
                    <option value="NA">{translate('risingarjunApp.Leavingreason.NA')}</option>
                    <option value="DISTANCEFACTOR">{translate('risingarjunApp.Leavingreason.DISTANCEFACTOR')}</option>
                    <option value="UNHAPPYPHYSICS">{translate('risingarjunApp.Leavingreason.UNHAPPYPHYSICS')}</option>
                    <option value="UNHAPPYMATHS">{translate('risingarjunApp.Leavingreason.UNHAPPYMATHS')}</option>
                    <option value="UNHAPPYBIO">{translate('risingarjunApp.Leavingreason.UNHAPPYBIO')}</option>
                    <option value="UNHAPPYCHEMISTRY">{translate('risingarjunApp.Leavingreason.UNHAPPYCHEMISTRY')}</option>
                    <option value="UNHAPPYMANAGEMENT">{translate('risingarjunApp.Leavingreason.UNHAPPYMANAGEMENT')}</option>
                    <option value="HIGHFEES">{translate('risingarjunApp.Leavingreason.HIGHFEES')}</option>
                    <option value="CLASSESOVERLAP">{translate('risingarjunApp.Leavingreason.CLASSESOVERLAP')}</option>
                    <option value="COURSECOMPLETED">{translate('risingarjunApp.Leavingreason.COURSECOMPLETED')}</option>
                    <option value="BREAKEXAM">{translate('risingarjunApp.Leavingreason.BREAKEXAM')}</option>
                    <option value="BREAKHOLIDAY">{translate('risingarjunApp.Leavingreason.BREAKHOLIDAY')}</option>
                    <option value="PERSONALREASON">{translate('risingarjunApp.Leavingreason.PERSONALREASON')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="infoSourceLabel" for="student-my-suffix-infoSource">
                    <Translate contentKey="risingarjunApp.student.infoSource">Info Source</Translate>
                  </Label>
                  <AvInput
                    id="student-my-suffix-infoSource"
                    type="select"
                    className="form-control"
                    name="infoSource"
                    value={(!isNew && studentEntity.infoSource) || 'LOCATIONDIRECTLY'}
                  >
                    <option value="LOCATIONDIRECTLY">{translate('risingarjunApp.Infosource.LOCATIONDIRECTLY')}</option>
                    <option value="FRIENDS">{translate('risingarjunApp.Infosource.FRIENDS')}</option>
                    <option value="BANNER">{translate('risingarjunApp.Infosource.BANNER')}</option>
                    <option value="INTERNET">{translate('risingarjunApp.Infosource.INTERNET')}</option>
                    <option value="PAMPHLET">{translate('risingarjunApp.Infosource.PAMPHLET')}</option>
                    <option value="NEWSPAPER">{translate('risingarjunApp.Infosource.NEWSPAPER')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="student-my-suffix-user">
                    <Translate contentKey="risingarjunApp.student.user">User</Translate>
                  </Label>
                  <AvInput id="student-my-suffix-user" type="select" className="form-control" name="userId">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="student-my-suffix-course">
                    <Translate contentKey="risingarjunApp.student.course">Course</Translate>
                  </Label>
                  <AvInput
                    id="student-my-suffix-course"
                    type="select"
                    multiple
                    className="form-control"
                    name="courses"
                    value={studentEntity.courses && studentEntity.courses.map(e => e.id)}
                  >
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
                <Button tag={Link} id="cancel-save" to="/entity/student-my-suffix" replace color="info">
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
  users: storeState.userManagement.users,
  courses: storeState.course.entities,
  studentEntity: storeState.student.entity,
  loading: storeState.student.loading,
  updating: storeState.student.updating,
  updateSuccess: storeState.student.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getCourses,
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
)(StudentMySuffixUpdate);
