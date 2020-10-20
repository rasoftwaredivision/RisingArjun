import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './testresult-my-suffix.reducer';
import { ITestresultMySuffix } from 'app/shared/model/testresult-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITestresultMySuffixDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TestresultMySuffixDetail extends React.Component<ITestresultMySuffixDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { testresultEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="risingarjunApp.testresult.detail.title">Testresult</Translate> [<b>{testresultEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="positiveMarks">
                <Translate contentKey="risingarjunApp.testresult.positiveMarks">Positive Marks</Translate>
              </span>
            </dt>
            <dd>{testresultEntity.positiveMarks}</dd>
            <dt>
              <span id="negativeMarks">
                <Translate contentKey="risingarjunApp.testresult.negativeMarks">Negative Marks</Translate>
              </span>
            </dt>
            <dd>{testresultEntity.negativeMarks}</dd>
            <dt>
              <span id="score">
                <Translate contentKey="risingarjunApp.testresult.score">Score</Translate>
              </span>
            </dt>
            <dd>{testresultEntity.score}</dd>
            <dt>
              <span id="timeTaken">
                <Translate contentKey="risingarjunApp.testresult.timeTaken">Time Taken</Translate>
              </span>
            </dt>
            <dd>{testresultEntity.timeTaken}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="risingarjunApp.testresult.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={testresultEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="risingarjunApp.testresult.student">Student</Translate>
            </dt>
            <dd>{testresultEntity.studentStudentRegId ? testresultEntity.studentStudentRegId : ''}</dd>
            <dt>
              <Translate contentKey="risingarjunApp.testresult.answersheet">Answersheet</Translate>
            </dt>
            <dd>
              {testresultEntity.answersheets
                ? testresultEntity.answersheets.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === testresultEntity.answersheets.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/testresult-my-suffix" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/testresult-my-suffix/${testresultEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ testresult }: IRootState) => ({
  testresultEntity: testresult.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestresultMySuffixDetail);
