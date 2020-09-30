import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './answersheet-my-suffix.reducer';
import { IAnswersheetMySuffix } from 'app/shared/model/answersheet-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnswersheetMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AnswersheetMySuffixDetail extends React.Component<IAnswersheetMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { answersheetEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingarjunApp.answersheet.detail.title">Answersheet</Translate> [<b>{answersheetEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="answer">
                <Translate contentKey="risingarjunApp.answersheet.answer">Answer</Translate>
              </span>
            </dt>
            <dd>{answersheetEntity.answer}</dd>
            <dt>
              <span id="marks">
                <Translate contentKey="risingarjunApp.answersheet.marks">Marks</Translate>
              </span>
            </dt>
            <dd>{answersheetEntity.marks}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.answersheet.testResultId">Test Result Id</Translate>
            </dt>
            <dd>{answersheetEntity.testResultIdId ? answersheetEntity.testResultIdId : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.answersheet.question">Question</Translate>
            </dt>
            <dd>
              {answersheetEntity.questions
                ? answersheetEntity.questions.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.question}</a>
                      {i === answersheetEntity.questions.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/answersheet-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/answersheet-my-suffix/${answersheetEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ answersheet }: IRootState) => ({
  answersheetEntity: answersheet.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswersheetMySuffixDetail);
