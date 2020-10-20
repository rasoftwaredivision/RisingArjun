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
import { getEntity, updateEntity, createEntity, reset } from './testimonial-my-suffix.reducer';
import { ITestimonialMySuffix } from 'app/shared/model/testimonial-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITestimonialMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITestimonialMySuffixUpdateState {
  isNew: boolean;
  studentId: string;
}

export class TestimonialMySuffixUpdate extends React.Component<ITestimonialMySuffixUpdateProps, ITestimonialMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      studentId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { testimonialEntity } = this.props;
      const entity = {
        ...testimonialEntity,
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
    this.props.history.push('/entity/testimonial-my-suffix');
  };

  render() {
    const { testimonialEntity, students, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.testimonial.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.testimonial.home.createOrEditLabel">Create or edit a Testimonial</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : testimonialEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="testimonial-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="testimonial-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="remarksLabel" for="testimonial-my-suffix-remarks">
                    <Translate contentKey="risingarjunApp.testimonial.remarks">Remarks</Translate>
                  </Label>
                  <AvField id="testimonial-my-suffix-remarks" type="text" name="remarks" />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="testimonial-my-suffix-date">
                    <Translate contentKey="risingarjunApp.testimonial.date">Date</Translate>
                  </Label>
                  <AvField id="testimonial-my-suffix-date" type="date" className="form-control" name="date" />
                </AvGroup>
                <AvGroup>
                  <Label id="ratingLabel" for="testimonial-my-suffix-rating">
                    <Translate contentKey="risingarjunApp.testimonial.rating">Rating</Translate>
                  </Label>
                  <AvField id="testimonial-my-suffix-rating" type="string" className="form-control" name="rating" />
                </AvGroup>
                <AvGroup>
                  <Label for="testimonial-my-suffix-student">
                    <Translate contentKey="risingarjunApp.testimonial.student">Student</Translate>
                  </Label>
                  <AvInput id="testimonial-my-suffix-student" type="select" className="form-control" name="studentId">
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
                <Button tag={Link} id="cancel-save" to="/entity/testimonial-my-suffix" replace color="info">
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
  testimonialEntity: storeState.testimonial.entity,
  loading: storeState.testimonial.loading,
  updating: storeState.testimonial.updating,
  updateSuccess: storeState.testimonial.updateSuccess
});

const mapDispatchToProps = {
  getStudents,
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
)(TestimonialMySuffixUpdate);
