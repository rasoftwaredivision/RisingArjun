import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import {
  openFile,
  byteSize,
  Translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './question-my-suffix.reducer';
import { IQuestionMySuffix } from 'app/shared/model/question-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IQuestionMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IQuestionMySuffixState = IPaginationBaseState;

export class QuestionMySuffix extends React.Component<IQuestionMySuffixProps, IQuestionMySuffixState> {
  state: IQuestionMySuffixState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { questionList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="question-my-suffix-heading">
          <Translate contentKey="risingarjunApp.question.home.title">Questions</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingarjunApp.question.home.createLabel">Create new Question</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {questionList && questionList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('question')}>
                    <Translate contentKey="risingarjunApp.question.question">Question</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('questionDiagram')}>
                    <Translate contentKey="risingarjunApp.question.questionDiagram">Question Diagram</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('optionA')}>
                    <Translate contentKey="risingarjunApp.question.optionA">Option A</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('optionB')}>
                    <Translate contentKey="risingarjunApp.question.optionB">Option B</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('optionC')}>
                    <Translate contentKey="risingarjunApp.question.optionC">Option C</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('optionD')}>
                    <Translate contentKey="risingarjunApp.question.optionD">Option D</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('multiChoice')}>
                    <Translate contentKey="risingarjunApp.question.multiChoice">Multi Choice</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('answer')}>
                    <Translate contentKey="risingarjunApp.question.answer">Answer</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('maxMarks')}>
                    <Translate contentKey="risingarjunApp.question.maxMarks">Max Marks</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('negativeMarks')}>
                    <Translate contentKey="risingarjunApp.question.negativeMarks">Negative Marks</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('durationMins')}>
                    <Translate contentKey="risingarjunApp.question.durationMins">Duration Mins</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('level')}>
                    <Translate contentKey="risingarjunApp.question.level">Level</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('solution')}>
                    <Translate contentKey="risingarjunApp.question.solution">Solution</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ansDiagram')}>
                    <Translate contentKey="risingarjunApp.question.ansDiagram">Ans Diagram</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('video')}>
                    <Translate contentKey="risingarjunApp.question.video">Video</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('status')}>
                    <Translate contentKey="risingarjunApp.question.status">Status</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.question.enterprise">Enterprise</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.question.course">Course</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.question.subject">Subject</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.question.topic">Topic</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.question.writer">Writer</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.question.approver">Approver</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {questionList.map((question, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${question.id}`} color="link" size="sm">
                        {question.id}
                      </Button>
                    </td>
                    <td>{question.question}</td>
                    <td>
                      {question.questionDiagram ? (
                        <div>
                          <a onClick={openFile(question.questionDiagramContentType, question.questionDiagram)}>
                            <img
                              src={`data:${question.questionDiagramContentType};base64,${question.questionDiagram}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {question.questionDiagramContentType}, {byteSize(question.questionDiagram)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{question.optionA}</td>
                    <td>{question.optionB}</td>
                    <td>{question.optionC}</td>
                    <td>{question.optionD}</td>
                    <td>{question.multiChoice ? 'true' : 'false'}</td>
                    <td>
                      <Translate contentKey={`risingarjunApp.Answeroption.${question.answer}`} />
                    </td>
                    <td>{question.maxMarks}</td>
                    <td>{question.negativeMarks}</td>
                    <td>{question.durationMins}</td>
                    <td>
                      <Translate contentKey={`risingarjunApp.Questionlevel.${question.level}`} />
                    </td>
                    <td>{question.solution}</td>
                    <td>
                      {question.ansDiagram ? (
                        <div>
                          <a onClick={openFile(question.ansDiagramContentType, question.ansDiagram)}>
                            <img
                              src={`data:${question.ansDiagramContentType};base64,${question.ansDiagram}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                          <span>
                            {question.ansDiagramContentType}, {byteSize(question.ansDiagram)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{question.video}</td>
                    <td>
                      <Translate contentKey={`risingarjunApp.Questionstatus.${question.status}`} />
                    </td>
                    <td>
                      {question.enterpriseEnterprisename ? (
                        <Link to={`enterprise-my-suffix/${question.enterpriseId}`}>{question.enterpriseEnterprisename}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {question.courseCourse ? <Link to={`course-my-suffix/${question.courseId}`}>{question.courseCourse}</Link> : ''}
                    </td>
                    <td>
                      {question.subjectSubjectTitle ? (
                        <Link to={`subject-my-suffix/${question.subjectId}`}>{question.subjectSubjectTitle}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {question.topicTopicTitle ? <Link to={`topic-my-suffix/${question.topicId}`}>{question.topicTopicTitle}</Link> : ''}
                    </td>
                    <td>
                      {question.writerEmployeeId ? (
                        <Link to={`employee-my-suffix/${question.writerId}`}>{question.writerEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {question.approverEmployeeId ? (
                        <Link to={`employee-my-suffix/${question.approverId}`}>{question.approverEmployeeId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${question.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${question.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${question.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="risingarjunApp.question.home.notFound">No Questions found</Translate>
            </div>
          )}
        </div>
        <div className={questionList && questionList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ question }: IRootState) => ({
  questionList: question.entities,
  totalItems: question.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionMySuffix);
