import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './subjectbasefee-my-suffix.reducer';
import { ISubjectbasefeeMySuffix } from 'app/shared/model/subjectbasefee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISubjectbasefeeMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SubjectbasefeeMySuffixDetail extends React.Component<ISubjectbasefeeMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { subjectbasefeeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingarjunApp.subjectbasefee.detail.title">Subjectbasefee</Translate> [<b>{subjectbasefeeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="baseFee">
                <Translate contentKey="risingarjunApp.subjectbasefee.baseFee">Base Fee</Translate>
              </span>
            </dt>
            <dd>{subjectbasefeeEntity.baseFee}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.subjectbasefee.course">Course</Translate>
            </dt>
            <dd>{subjectbasefeeEntity.courseCourse ? subjectbasefeeEntity.courseCourse : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.subjectbasefee.enterprise">Enterprise</Translate>
            </dt>
            <dd>{subjectbasefeeEntity.enterpriseEnterprisename ? subjectbasefeeEntity.enterpriseEnterprisename : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.subjectbasefee.session">Session</Translate>
            </dt>
            <dd>{subjectbasefeeEntity.sessionAcadSession ? subjectbasefeeEntity.sessionAcadSession : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/subjectbasefee-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/subjectbasefee-my-suffix/${subjectbasefeeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ subjectbasefee }: IRootState) => ({
  subjectbasefeeEntity: subjectbasefee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubjectbasefeeMySuffixDetail);
