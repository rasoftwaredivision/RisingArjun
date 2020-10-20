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
import { getEntities } from './employee-my-suffix.reducer';
import { IEmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEmployeeMySuffixProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IEmployeeMySuffixState = IPaginationBaseState;

export class EmployeeMySuffix extends React.Component<IEmployeeMySuffixProps, IEmployeeMySuffixState> {
  state: IEmployeeMySuffixState = {
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
    const { employeeList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="employee-my-suffix-heading">
          <Translate contentKey="risingarjunApp.employee.home.title">Employees</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="risingarjunApp.employee.home.createLabel">Create new Employee</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {employeeList && employeeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('employeeId')}>
                    <Translate contentKey="risingarjunApp.employee.employeeId">Employee Id</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('jobNature')}>
                    <Translate contentKey="risingarjunApp.employee.jobNature">Job Nature</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('bgc')}>
                    <Translate contentKey="risingarjunApp.employee.bgc">Bgc</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('resume')}>
                    <Translate contentKey="risingarjunApp.employee.resume">Resume</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('pan')}>
                    <Translate contentKey="risingarjunApp.employee.pan">Pan</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('accountNo')}>
                    <Translate contentKey="risingarjunApp.employee.accountNo">Account No</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('bank')}>
                    <Translate contentKey="risingarjunApp.employee.bank">Bank</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ifsc')}>
                    <Translate contentKey="risingarjunApp.employee.ifsc">Ifsc</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="risingarjunApp.employee.user">User</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${employee.id}`} color="link" size="sm">
                        {employee.id}
                      </Button>
                    </td>
                    <td>{employee.employeeId}</td>
                    <td>
                      <Translate contentKey={`risingarjunApp.Jobnature.${employee.jobNature}`} />
                    </td>
                    <td>{employee.bgc ? 'true' : 'false'}</td>
                    <td>
                      {employee.resume ? (
                        <div>
                          <a onClick={openFile(employee.resumeContentType, employee.resume)}>
                            <img src={`data:${employee.resumeContentType};base64,${employee.resume}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {employee.resumeContentType}, {byteSize(employee.resume)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{employee.pan}</td>
                    <td>{employee.accountNo}</td>
                    <td>{employee.bank}</td>
                    <td>{employee.ifsc}</td>
                    <td>{employee.userLogin ? employee.userLogin : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${employee.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${employee.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${employee.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="risingarjunApp.employee.home.notFound">No Employees found</Translate>
            </div>
          )}
        </div>
        <div className={employeeList && employeeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeList: employee.entities,
  totalItems: employee.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeMySuffix);
