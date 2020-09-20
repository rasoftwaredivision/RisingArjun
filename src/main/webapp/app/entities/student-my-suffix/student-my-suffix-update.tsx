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
                  <Label id="schoolLabel" for="student-my-suffix-school">
                    <Translate contentKey="risingarjunApp.student.school">School</Translate>
                  </Label>
                  <AvInput
                    id="student-my-suffix-school"
                    type="select"
                    className="form-control"
                    name="school"
                    value={(!isNew && studentEntity.school) || 'NONE'}
                  >
                    <option value="NONE">{translate('risingarjunApp.School.NONE')}</option>
                    <option value="OTHER">{translate('risingarjunApp.School.OTHER')}</option>
                    <option value="PRIVATE">{translate('risingarjunApp.School.PRIVATE')}</option>
                    <option value="OPEN_SCHOOL">{translate('risingarjunApp.School.OPEN_SCHOOL')}</option>
                    <option value="ADITYA_ARMY_PUBLIC_SCHOOL">{translate('risingarjunApp.School.ADITYA_ARMY_PUBLIC_SCHOOL')}</option>
                    <option value="AJANTA_PUBLIC_SCHOOL">{translate('risingarjunApp.School.AJANTA_PUBLIC_SCHOOL')}</option>
                    <option value="ALPINE_CONVENT_SCHOOL_GURGAON">
                      {translate('risingarjunApp.School.ALPINE_CONVENT_SCHOOL_GURGAON')}
                    </option>
                    <option value="AMBIENCE_PUBLIC_SCHOOLS">{translate('risingarjunApp.School.AMBIENCE_PUBLIC_SCHOOLS')}</option>
                    <option value="AMERICAN_MONTESSORI_PUBLIC_SCHOOL">
                      {translate('risingarjunApp.School.AMERICAN_MONTESSORI_PUBLIC_SCHOOL')}
                    </option>
                    <option value="AMITY_INTERNATIONAL_SCHOOL">{translate('risingarjunApp.School.AMITY_INTERNATIONAL_SCHOOL')}</option>
                    <option value="ARAVALI_PUBLIC_SCHOOL">{translate('risingarjunApp.School.ARAVALI_PUBLIC_SCHOOL')}</option>
                    <option value="ASCENT_PUBLIC_SCHOOL">{translate('risingarjunApp.School.ASCENT_PUBLIC_SCHOOL')}</option>
                    <option value="ASIAN_PUBLIC_SCHOOL">{translate('risingarjunApp.School.ASIAN_PUBLIC_SCHOOL')}</option>
                    <option value="BASANT_VALLEY_PUBLIC_SCHOOL">{translate('risingarjunApp.School.BASANT_VALLEY_PUBLIC_SCHOOL')}</option>
                    <option value="BHARTI_INTERNATIONAL_CONVENT_SCHOOL">
                      {translate('risingarjunApp.School.BHARTI_INTERNATIONAL_CONVENT_SCHOOL')}
                    </option>
                    <option value="BLUE_BELLS_PUBLIC_SCHOOL">{translate('risingarjunApp.School.BLUE_BELLS_PUBLIC_SCHOOL')}</option>
                    <option value="CHIRANJIV_BHARTI_SCHOOL">{translate('risingarjunApp.School.CHIRANJIV_BHARTI_SCHOOL')}</option>
                    <option value="COLONELS_CENTRAL_ACADEMY">{translate('risingarjunApp.School.COLONELS_CENTRAL_ACADEMY')}</option>
                    <option value="COLONELS_PUBLIC_SCHOOL">{translate('risingarjunApp.School.COLONELS_PUBLIC_SCHOOL')}</option>
                    <option value="DAV_PUBLIC_SCHOOL">{translate('risingarjunApp.School.DAV_PUBLIC_SCHOOL')}</option>
                    <option value="DELHI_PUBLIC_SCHOOL_MARUTI_KUNJ">
                      {translate('risingarjunApp.School.DELHI_PUBLIC_SCHOOL_MARUTI_KUNJ')}
                    </option>
                    <option value="DELHI_PUBLIC_SCHOOL_SECTOR_45">
                      {translate('risingarjunApp.School.DELHI_PUBLIC_SCHOOL_SECTOR_45')}
                    </option>
                    <option value="DELHI_PUBLIC_SCHOOL_SUSHANT_LOK">
                      {translate('risingarjunApp.School.DELHI_PUBLIC_SCHOOL_SUSHANT_LOK')}
                    </option>
                    <option value="DEV_SAMAJ_VIDYA_NIKETAN">{translate('risingarjunApp.School.DEV_SAMAJ_VIDYA_NIKETAN')}</option>
                    <option value="DPS_MEWAT_MODEL_SCHOOL">{translate('risingarjunApp.School.DPS_MEWAT_MODEL_SCHOOL')}</option>
                    <option value="DRONA_PUBLIC_SCHOOL">{translate('risingarjunApp.School.DRONA_PUBLIC_SCHOOL')}</option>
                    <option value="GD_GOENKA_WORLD_SCHOOL">{translate('risingarjunApp.School.GD_GOENKA_WORLD_SCHOOL')}</option>
                    <option value="GEMS_INTERNATIONAL_SCHOOL">{translate('risingarjunApp.School.GEMS_INTERNATIONAL_SCHOOL')}</option>
                    <option value="GREEN_DALE_PUBLIC_SCHOOL">{translate('risingarjunApp.School.GREEN_DALE_PUBLIC_SCHOOL')}</option>
                    <option value="GREENWOOD_PUBLIC_SCHOOL">{translate('risingarjunApp.School.GREENWOOD_PUBLIC_SCHOOL')}</option>
                    <option value="GURGAON_VALLEY_SCHOOL">{translate('risingarjunApp.School.GURGAON_VALLEY_SCHOOL')}</option>
                    <option value="GURUGRAM_PUBLIC_SCHOOL">{translate('risingarjunApp.School.GURUGRAM_PUBLIC_SCHOOL')}</option>
                    <option value="GYAN_DEEP_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.GYAN_DEEP_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="GYAN_DEVI_PUBLIC_SCHOOL">{translate('risingarjunApp.School.GYAN_DEVI_PUBLIC_SCHOOL')}</option>
                    <option value="HERITAGE_XPERIENTIAL_LEARNING_SCHOOL">
                      {translate('risingarjunApp.School.HERITAGE_XPERIENTIAL_LEARNING_SCHOOL')}
                    </option>
                    <option value="INDUS_WORLD_SCHOOL">{translate('risingarjunApp.School.INDUS_WORLD_SCHOOL')}</option>
                    <option value="J_J_SCHOOL_OF_EDUCATION">{translate('risingarjunApp.School.J_J_SCHOOL_OF_EDUCATION')}</option>
                    <option value="JHANKAR_HIGH_SCHOOL">{translate('risingarjunApp.School.JHANKAR_HIGH_SCHOOL')}</option>
                    <option value="KINDER_VALLEY_INTERNATIONAL_SCHOOL">
                      {translate('risingarjunApp.School.KINDER_VALLEY_INTERNATIONAL_SCHOOL')}
                    </option>
                    <option value="KULDEEP_SINGH_MEMORIAL_PUBLIC_SCHOOL">
                      {translate('risingarjunApp.School.KULDEEP_SINGH_MEMORIAL_PUBLIC_SCHOOL')}
                    </option>
                    <option value="LADY_FLORENCE_PUBLIC_SCHOOL">{translate('risingarjunApp.School.LADY_FLORENCE_PUBLIC_SCHOOL')}</option>
                    <option value="LAXMI_INTERNATIONAL_SCHOOL">{translate('risingarjunApp.School.LAXMI_INTERNATIONAL_SCHOOL')}</option>
                    <option value="LIONS_PUBLIC_SCHOOL">{translate('risingarjunApp.School.LIONS_PUBLIC_SCHOOL')}</option>
                    <option value="LORD_JESUS_PUBLIC_SCHOOL">{translate('risingarjunApp.School.LORD_JESUS_PUBLIC_SCHOOL')}</option>
                    <option value="LORD_KRISHNA_INTERNATIONAL_SCHOOL">
                      {translate('risingarjunApp.School.LORD_KRISHNA_INTERNATIONAL_SCHOOL')}
                    </option>
                    <option value="MADE_EASY_SCHOOL">{translate('risingarjunApp.School.MADE_EASY_SCHOOL')}</option>
                    <option value="MAHARISHI_VIDYA_MANDIR_PUBLIC_SCHOOL">
                      {translate('risingarjunApp.School.MAHARISHI_VIDYA_MANDIR_PUBLIC_SCHOOL')}
                    </option>
                    <option value="MANAV_RACHNA_INTERNATIONAL_SCHOOL">
                      {translate('risingarjunApp.School.MANAV_RACHNA_INTERNATIONAL_SCHOOL')}
                    </option>
                    <option value="MARU_MAL_BOYS_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.MARU_MAL_BOYS_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="MEENAKSHI_PUBLIC_SCHOOL">{translate('risingarjunApp.School.MEENAKSHI_PUBLIC_SCHOOL')}</option>
                    <option value="MEWAT_MODEL_SCHOOL">{translate('risingarjunApp.School.MEWAT_MODEL_SCHOOL')}</option>
                    <option value="MEWAT_MODEL_SCHOOL_NAGINA">{translate('risingarjunApp.School.MEWAT_MODEL_SCHOOL_NAGINA')}</option>
                    <option value="OUR_LADY_OF_FATIMA_CONVENT_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.OUR_LADY_OF_FATIMA_CONVENT_SECONDARY_SCHOOL')}
                    </option>
                    <option value="PATHWAYS_WORLD_SCHOOL">{translate('risingarjunApp.School.PATHWAYS_WORLD_SCHOOL')}</option>
                    <option value="POLE_STAR_PUBLIC_SCHOOL">{translate('risingarjunApp.School.POLE_STAR_PUBLIC_SCHOOL')}</option>
                    <option value="PRESIDIUM_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.PRESIDIUM_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="RABINDRANATH_WORLD_SCHOOL">{translate('risingarjunApp.School.RABINDRANATH_WORLD_SCHOOL')}</option>
                    <option value="RAJENDRA_PUBLIC_SCHOOL">{translate('risingarjunApp.School.RAJENDRA_PUBLIC_SCHOOL')}</option>
                    <option value="RAJMALA_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.RAJMALA_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="RAO_LAL_SINGH_PUBLIC_SCHOOL">{translate('risingarjunApp.School.RAO_LAL_SINGH_PUBLIC_SCHOOL')}</option>
                    <option value="RED_ROSES_PUBLIC_SCHOOL">{translate('risingarjunApp.School.RED_ROSES_PUBLIC_SCHOOL')}</option>
                    <option value="RIDGE_VALLEY_SCHOOL">{translate('risingarjunApp.School.RIDGE_VALLEY_SCHOOL')}</option>
                    <option value="RISHI_PUBLIC_SCHOOL">{translate('risingarjunApp.School.RISHI_PUBLIC_SCHOOL')}</option>
                    <option value="ROCKFORD_CONVENT_HIGH_SCHOOL">{translate('risingarjunApp.School.ROCKFORD_CONVENT_HIGH_SCHOOL')}</option>
                    <option value="ROTARY_PUBLIC_SCHOOL">{translate('risingarjunApp.School.ROTARY_PUBLIC_SCHOOL')}</option>
                    <option value="ROYAL_PUBLIC_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.ROYAL_PUBLIC_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="RYAN_INTERNATIONAL_SCHOOL">{translate('risingarjunApp.School.RYAN_INTERNATIONAL_SCHOOL')}</option>
                    <option value="S_D_ADARSH_VIDYALAYA">{translate('risingarjunApp.School.S_D_ADARSH_VIDYALAYA')}</option>
                    <option value="SALWAN_MONTESSORI_SCHOOL">{translate('risingarjunApp.School.SALWAN_MONTESSORI_SCHOOL')}</option>
                    <option value="SALWAN_PUBLIC_SCHOOL">{translate('risingarjunApp.School.SALWAN_PUBLIC_SCHOOL')}</option>
                    <option value="SAVITRI_DEVI_VIDYA_NIKETAN">{translate('risingarjunApp.School.SAVITRI_DEVI_VIDYA_NIKETAN')}</option>
                    <option value="SCOTTISH_HIGH_INTERNATIONAL_SCHOOL">
                      {translate('risingarjunApp.School.SCOTTISH_HIGH_INTERNATIONAL_SCHOOL')}
                    </option>
                    <option value="SCR_GLOBAL_SCHOOL">{translate('risingarjunApp.School.SCR_GLOBAL_SCHOOL')}</option>
                    <option value="SCR_MODEL_SCHOOL">{translate('risingarjunApp.School.SCR_MODEL_SCHOOL')}</option>
                    <option value="SCR_PUBLIC_SCHOOL">{translate('risingarjunApp.School.SCR_PUBLIC_SCHOOL')}</option>
                    <option value="SD_MEMORIAL_HIGH_SCHOOL">{translate('risingarjunApp.School.SD_MEMORIAL_HIGH_SCHOOL')}</option>
                    <option value="SHALOM_HILLS_INTERNATIONAL_SCHOOL">
                      {translate('risingarjunApp.School.SHALOM_HILLS_INTERNATIONAL_SCHOOL')}
                    </option>
                    <option value="SHANTI_NIKETAN_PUBLIC_SCHOOL">{translate('risingarjunApp.School.SHANTI_NIKETAN_PUBLIC_SCHOOL')}</option>
                    <option value="SHARDA_INTERNATIONAL_SCHOOL">{translate('risingarjunApp.School.SHARDA_INTERNATIONAL_SCHOOL')}</option>
                    <option value="SHEMFORD_FUTURISTIC_ACADEMY_GURUGRAM">
                      {translate('risingarjunApp.School.SHEMFORD_FUTURISTIC_ACADEMY_GURUGRAM')}
                    </option>
                    <option value="SHERWOOD_CONVENT_SCHOOL">{translate('risingarjunApp.School.SHERWOOD_CONVENT_SCHOOL')}</option>
                    <option value="SHIKSHA_BHARTI_PUBLIC_SCHOOL">{translate('risingarjunApp.School.SHIKSHA_BHARTI_PUBLIC_SCHOOL')}</option>
                    <option value="SHIKSHANTAR">{translate('risingarjunApp.School.SHIKSHANTAR')}</option>
                    <option value="SHIV_NADAR_SCHOOL">{translate('risingarjunApp.School.SHIV_NADAR_SCHOOL')}</option>
                    <option value="SHIV_PUBLIC_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.SHIV_PUBLIC_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="SHRI_SN_SIDHESHWAR_SR_SEC_PUBLIC_SCHOOL">
                      {translate('risingarjunApp.School.SHRI_SN_SIDHESHWAR_SR_SEC_PUBLIC_SCHOOL')}
                    </option>
                    <option value="SRI_SHIV_CHAITANYA_ACADEMY_SCHOOL">
                      {translate('risingarjunApp.School.SRI_SHIV_CHAITANYA_ACADEMY_SCHOOL')}
                    </option>
                    <option value="ST_ANGELS_SCHOOL">{translate('risingarjunApp.School.ST_ANGELS_SCHOOL')}</option>
                    <option value="ST_CRISPINS_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.ST_CRISPINS_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="ST_MICHAELS_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.ST_MICHAELS_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="ST_PBN_PUBLIC_SCHOOL">{translate('risingarjunApp.School.ST_PBN_PUBLIC_SCHOOL')}</option>
                    <option value="ST_SOLDIER_PUBLIC_SCHOOL">{translate('risingarjunApp.School.ST_SOLDIER_PUBLIC_SCHOOL')}</option>
                    <option value="STAREX_INTERNATIONAL_SCHOOL">{translate('risingarjunApp.School.STAREX_INTERNATIONAL_SCHOOL')}</option>
                    <option value="SUMMER_FIELDS_SCHOOL">{translate('risingarjunApp.School.SUMMER_FIELDS_SCHOOL')}</option>
                    <option value="SUNCITY_WORLD_SCHOOL">{translate('risingarjunApp.School.SUNCITY_WORLD_SCHOOL')}</option>
                    <option value="TAGORE_INTERNATIONAL_SCHOOL">{translate('risingarjunApp.School.TAGORE_INTERNATIONAL_SCHOOL')}</option>
                    <option value="THE_ARDEE_SCHOOL">{translate('risingarjunApp.School.THE_ARDEE_SCHOOL')}</option>
                    <option value="THE_PINE_CREST_SCHOOL">{translate('risingarjunApp.School.THE_PINE_CREST_SCHOOL')}</option>
                    <option value="THE_SHRI_RAM_SCHOOL_ARAVALI">{translate('risingarjunApp.School.THE_SHRI_RAM_SCHOOL_ARAVALI')}</option>
                    <option value="THE_SYLVAN_TRAILS_SCHOOL">{translate('risingarjunApp.School.THE_SYLVAN_TRAILS_SCHOOL')}</option>
                    <option value="UNIVERSIOL_PUBLIC_SCHOOL">{translate('risingarjunApp.School.UNIVERSIOL_PUBLIC_SCHOOL')}</option>
                    <option value="US_SCHOOL">{translate('risingarjunApp.School.US_SCHOOL')}</option>
                    <option value="VEGA_SCHOOLS">{translate('risingarjunApp.School.VEGA_SCHOOLS')}</option>
                    <option value="VIBGYOR_GROUP_OF_SCHOOLS">{translate('risingarjunApp.School.VIBGYOR_GROUP_OF_SCHOOLS')}</option>
                    <option value="VIDYA_BHAWAN_PUBLIC_SENIOR_SECONDARY_SCHOOL">
                      {translate('risingarjunApp.School.VIDYA_BHAWAN_PUBLIC_SENIOR_SECONDARY_SCHOOL')}
                    </option>
                    <option value="VIVEKANAND_ACADEMY">{translate('risingarjunApp.School.VIVEKANAND_ACADEMY')}</option>
                    <option value="WEST_ACADEMY">{translate('risingarjunApp.School.WEST_ACADEMY')}</option>
                  </AvInput>
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
