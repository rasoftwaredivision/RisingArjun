import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';
import { getEntities as getQuestions } from 'app/entities/question-my-suffix/question-my-suffix.reducer';
import { ITestresultMySuffix } from 'app/shared/model/testresult-my-suffix.model';
import { getEntities as getTestresults } from 'app/entities/testresult-my-suffix/testresult-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './answersheet-my-suffix.reducer';
import { IAnswersheetMySuffix } from 'app/shared/model/answersheet-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAnswersheetMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAnswersheetMySuffixUpdateState {
  isNew: boolean;
  idsquestion: any[];
  testresultId: string;
}

export class AnswersheetMySuffixUpdate extends React.Component<IAnswersheetMySuffixUpdateProps, IAnswersheetMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsquestion: [],
      testresultId: '0',
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

    this.props.getQuestions();
    this.props.getTestresults();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { answersheetEntity } = this.props;
      const entity = {
        ...answersheetEntity,
        ...values,
        questions: mapIdList(values.questions)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/answersheet-my-suffix');
  };

  render() {
    const { answersheetEntity, questions, testresults, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.answersheet.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.answersheet.home.createOrEditLabel">Create or edit a Answersheet</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : answersheetEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="answersheet-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="answersheet-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="answerLabel" for="answersheet-my-suffix-answer">
                    <Translate contentKey="risingarjunApp.answersheet.answer">Answer</Translate>
                  </Label>
                  <AvInput
                    id="answersheet-my-suffix-answer"
                    type="select"
                    className="form-control"
                    name="answer"
                    value={(!isNew && answersheetEntity.answer) || 'A'}
                  >
                    <option value="A">{translate('risingarjunApp.Answeroption.A')}</option>
                    <option value="B">{translate('risingarjunApp.Answeroption.B')}</option>
                    <option value="C">{translate('risingarjunApp.Answeroption.C')}</option>
                    <option value="D">{translate('risingarjunApp.Answeroption.D')}</option>
                    <option value="A_B">{translate('risingarjunApp.Answeroption.A_B')}</option>
                    <option value="A_C">{translate('risingarjunApp.Answeroption.A_C')}</option>
                    <option value="A_D">{translate('risingarjunApp.Answeroption.A_D')}</option>
                    <option value="B_C">{translate('risingarjunApp.Answeroption.B_C')}</option>
                    <option value="B_D">{translate('risingarjunApp.Answeroption.B_D')}</option>
                    <option value="C_D">{translate('risingarjunApp.Answeroption.C_D')}</option>
                    <option value="A_B_C">{translate('risingarjunApp.Answeroption.A_B_C')}</option>
                    <option value="A_B_D">{translate('risingarjunApp.Answeroption.A_B_D')}</option>
                    <option value="A_C_D">{translate('risingarjunApp.Answeroption.A_C_D')}</option>
                    <option value="B_C_D">{translate('risingarjunApp.Answeroption.B_C_D')}</option>
                    <option value="A_B_C_D">{translate('risingarjunApp.Answeroption.A_B_C_D')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="marksLabel" for="answersheet-my-suffix-marks">
                    <Translate contentKey="risingarjunApp.answersheet.marks">Marks</Translate>
                  </Label>
                  <AvField
                    id="answersheet-my-suffix-marks"
                    type="string"
                    className="form-control"
                    name="marks"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="answersheet-my-suffix-status">
                    <Translate contentKey="risingarjunApp.answersheet.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="answersheet-my-suffix-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && answersheetEntity.status) || 'DRAFT'}
                  >
                    <option value="DRAFT">{translate('risingarjunApp.Answerstatus.DRAFT')}</option>
                    <option value="FINAL">{translate('risingarjunApp.Answerstatus.FINAL')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="answersheet-my-suffix-question">
                    <Translate contentKey="risingarjunApp.answersheet.question">Question</Translate>
                  </Label>
                  <AvInput
                    id="answersheet-my-suffix-question"
                    type="select"
                    multiple
                    className="form-control"
                    name="questions"
                    value={answersheetEntity.questions && answersheetEntity.questions.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {questions
                      ? questions.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.question}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/answersheet-my-suffix" replace color="info">
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
  questions: storeState.question.entities,
  testresults: storeState.testresult.entities,
  answersheetEntity: storeState.answersheet.entity,
  loading: storeState.answersheet.loading,
  updating: storeState.answersheet.updating,
  updateSuccess: storeState.answersheet.updateSuccess
});

const mapDispatchToProps = {
  getQuestions,
  getTestresults,
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
)(AnswersheetMySuffixUpdate);
