import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './studentsubject-my-suffix.reducer';
import { IStudentsubjectMySuffix } from 'app/shared/model/studentsubject-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStudentsubjectMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IStudentsubjectMySuffixState = IPaginationBaseState;

export class StudentsubjectMySuffix extends React.Component<IStudentsubjectMySuffixProps, IStudentsubjectMySuffixState> {
  state: IStudentsubjectMySuffixState = {
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
    const { studentsubjectList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="studentsubject-my-suffix-heading">
          <Translate contentKey="risingarjunApp.studentsubject.home.title">Studentsubjects</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingarjunApp.studentsubject.home.createLabel">Create new Studentsubject</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {studentsubjectList && studentsubjectList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('month')}>
                    <Translate contentKey="risingarjunApp.studentsubject.month">Month</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.studentsubject.registrationno">Registrationno</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.studentsubject.session">Session</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {studentsubjectList.map((studentsubject, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${studentsubject.id}`} color="link" size="sm">
                        {studentsubject.id}
                      </Button>
                    </td>
                    <td>
                      <Translate contentKey={`risingarjunApp.Month.${studentsubject.month}`} />
                    </td>
                    <td>
                      {studentsubject.registrationnoStudentRegId ? (
                        <Link to={`student-my-suffix/${studentsubject.registrationnoId}`}>{studentsubject.registrationnoStudentRegId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>
                      {studentsubject.sessionAcadSession ? (
                        <Link to={`academicsession-my-suffix/${studentsubject.sessionId}`}>{studentsubject.sessionAcadSession}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${studentsubject.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentsubject.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${studentsubject.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingarjunApp.studentsubject.home.notFound">No Studentsubjects found</Translate>
            </div>
          )}
        </div>
        <div className={studentsubjectList && studentsubjectList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ studentsubject }: IRootState) => ({
  studentsubjectList: studentsubject.entities,
  totalItems: studentsubject.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsubjectMySuffix);
