import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './testimonial-my-suffix.reducer';
import { ITestimonialMySuffix } from 'app/shared/model/testimonial-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITestimonialMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TestimonialMySuffixDetail extends React.Component<ITestimonialMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { testimonialEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingarjunApp.testimonial.detail.title">Testimonial</Translate> [<b>{testimonialEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="remarks">
                <Translate contentKey="risingarjunApp.testimonial.remarks">Remarks</Translate>
              </span>
            </dt>
            <dd>{testimonialEntity.remarks}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="risingarjunApp.testimonial.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={testimonialEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="rating">
                <Translate contentKey="risingarjunApp.testimonial.rating">Rating</Translate>
              </span>
            </dt>
            <dd>{testimonialEntity.rating}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.testimonial.student">Student</Translate>
            </dt>
            <dd>{testimonialEntity.studentStudentRegId ? testimonialEntity.studentStudentRegId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/testimonial-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/testimonial-my-suffix/${testimonialEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ testimonial }: IRootState) => ({
  testimonialEntity: testimonial.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestimonialMySuffixDetail);
