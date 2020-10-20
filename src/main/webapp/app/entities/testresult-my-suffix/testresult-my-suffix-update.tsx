import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStudentMySuffix } from 'app/shared/model/student-my-suffix.model';
import { getEntities as getStudents } from 'app/entities/student-my-suffix/student-my-suffix.reducer';
import { IAnswersheetMySuffix } from 'app/shared/model/answersheet-my-suffix.model';
import { getEntities as getAnswersheets } from 'app/entities/answersheet-my-suffix/answersheet-my-suffix.reducer';
import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';
import { getEntities as getTestpapers } from 'app/entities/testpaper-my-suffix/testpaper-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './testresult-my-suffix.reducer';
import { ITestresultMySuffix } from 'app/shared/model/testresult-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITestresultMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITestresultMySuffixUpdateState {
  isNew: boolean;
  idsanswersheet: any[];
  studentId: string;
  testpaperId: string;
}

export class TestresultMySuffixUpdate extends React.Component<ITestresultMySuffixUpdateProps, ITestresultMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsanswersheet: [],
      studentId: '0',
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

    this.props.getStudents();
    this.props.getAnswersheets();
    this.props.getTestpapers();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { testresultEntity } = this.props;
      const entity = {
        ...testresultEntity,
        ...values,
        answersheets: mapIdList(values.answersheets)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/testresult-my-suffix');
  };

  render() {
    const { testresultEntity, students, answersheets, testpapers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.testresult.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.testresult.home.createOrEditLabel">Create or edit a Testresult</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : testresultEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="testresult-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="testresult-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="positiveMarksLabel" for="testresult-my-suffix-positiveMarks">
                    <Translate contentKey="risingarjunApp.testresult.positiveMarks">Positive Marks</Translate>
                  </Label>
                  <AvField
                    id="testresult-my-suffix-positiveMarks"
                    type="string"
                    className="form-control"
                    name="positiveMarks"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="negativeMarksLabel" for="testresult-my-suffix-negativeMarks">
                    <Translate contentKey="risingarjunApp.testresult.negativeMarks">Negative Marks</Translate>
                  </Label>
                  <AvField
                    id="testresult-my-suffix-negativeMarks"
                    type="string"
                    className="form-control"
                    name="negativeMarks"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="scoreLabel" for="testresult-my-suffix-score">
                    <Translate contentKey="risingarjunApp.testresult.score">Score</Translate>
                  </Label>
                  <AvField
                    id="testresult-my-suffix-score"
                    type="string"
                    className="form-control"
                    name="score"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="timeTakenLabel" for="testresult-my-suffix-timeTaken">
                    <Translate contentKey="risingarjunApp.testresult.timeTaken">Time Taken</Translate>
                  </Label>
                  <AvField
                    id="testresult-my-suffix-timeTaken"
                    type="string"
                    className="form-control"
                    name="timeTaken"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="testresult-my-suffix-date">
                    <Translate contentKey="risingarjunApp.testresult.date">Date</Translate>
                  </Label>
                  <AvField
                    id="testresult-my-suffix-date"
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="testresult-my-suffix-student">
                    <Translate contentKey="risingarjunApp.testresult.student">Student</Translate>
                  </Label>
                  <AvInput id="testresult-my-suffix-student" type="select" className="form-control" name="studentId">
                    <option value="" key="0" />
                    {students
                      ? students.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.studentRegId}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="testresult-my-suffix-answersheet">
                    <Translate contentKey="risingarjunApp.testresult.answersheet">Answersheet</Translate>
                  </Label>
                  <AvInput
                    id="testresult-my-suffix-answersheet"
                    type="select"
                    multiple
                    className="form-control"
                    name="answersheets"
                    value={testresultEntity.answersheets && testresultEntity.answersheets.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {answersheets
                      ? answersheets.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/testresult-my-suffix" replace color="info">
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
  students: storeState.student.entities,
  answersheets: storeState.answersheet.entities,
  testpapers: storeState.testpaper.entities,
  testresultEntity: storeState.testresult.entity,
  loading: storeState.testresult.loading,
  updating: storeState.testresult.updating,
  updateSuccess: storeState.testresult.updateSuccess
});

const mapDispatchToProps = {
  getStudents,
  getAnswersheets,
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
)(TestresultMySuffixUpdate);
