import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
import { getEntities as getEnterprises } from 'app/entities/enterprise-my-suffix/enterprise-my-suffix.reducer';
import { ICenterheadMySuffix } from 'app/shared/model/centerhead-my-suffix.model';
import { getEntities as getCenterheads } from 'app/entities/centerhead-my-suffix/centerhead-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, reset } from './center-my-suffix.reducer';
import { ICenterMySuffix } from 'app/shared/model/center-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICenterMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICenterMySuffixUpdateState {
  isNew: boolean;
  enterpriseId: string;
  centerheadId: string;
}

export class CenterMySuffixUpdate extends React.Component<ICenterMySuffixUpdateProps, ICenterMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      enterpriseId: '0',
      centerheadId: '0',
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

    this.props.getEnterprises();
    this.props.getCenterheads();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { centerEntity } = this.props;
      const entity = {
        ...centerEntity,
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
    this.props.history.push('/entity/center-my-suffix');
  };

  render() {
    const { centerEntity, enterprises, centerheads, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.center.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.center.home.createOrEditLabel">Create or edit a Center</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : centerEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="center-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="center-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="centerCodeLabel" for="center-my-suffix-centerCode">
                    <Translate contentKey="risingarjunApp.center.centerCode">Center Code</Translate>
                  </Label>
                  <AvField
                    id="center-my-suffix-centerCode"
                    type="text"
                    name="centerCode"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="centerTitleLabel" for="center-my-suffix-centerTitle">
                    <Translate contentKey="risingarjunApp.center.centerTitle">Center Title</Translate>
                  </Label>
                  <AvField
                    id="center-my-suffix-centerTitle"
                    type="text"
                    name="centerTitle"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="streetLabel" for="center-my-suffix-street">
                    <Translate contentKey="risingarjunApp.center.street">Street</Translate>
                  </Label>
                  <AvField id="center-my-suffix-street" type="text" name="street" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="center-my-suffix-city">
                    <Translate contentKey="risingarjunApp.center.city">City</Translate>
                  </Label>
                  <AvInput
                    id="center-my-suffix-city"
                    type="select"
                    className="form-control"
                    name="city"
                    value={(!isNew && centerEntity.city) || 'DEHRADUN'}
                  >
                    <option value="DEHRADUN">{translate('risingarjunApp.City.DEHRADUN')}</option>
                    <option value="DELHI">{translate('risingarjunApp.City.DELHI')}</option>
                    <option value="GURGAON">{translate('risingarjunApp.City.GURGAON')}</option>
                    <option value="LONI">{translate('risingarjunApp.City.LONI')}</option>
                    <option value="TEHRI">{translate('risingarjunApp.City.TEHRI')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="stateLabel" for="center-my-suffix-state">
                    <Translate contentKey="risingarjunApp.center.state">State</Translate>
                  </Label>
                  <AvInput
                    id="center-my-suffix-state"
                    type="select"
                    className="form-control"
                    name="state"
                    value={(!isNew && centerEntity.state) || 'DELHI'}
                  >
                    <option value="DELHI">{translate('risingarjunApp.State.DELHI')}</option>
                    <option value="HARYANA">{translate('risingarjunApp.State.HARYANA')}</option>
                    <option value="MADHYAPRADESH">{translate('risingarjunApp.State.MADHYAPRADESH')}</option>
                    <option value="UTTRAKHAND">{translate('risingarjunApp.State.UTTRAKHAND')}</option>
                    <option value="UTTARPRADESH">{translate('risingarjunApp.State.UTTARPRADESH')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="center-my-suffix-country">
                    <Translate contentKey="risingarjunApp.center.country">Country</Translate>
                  </Label>
                  <AvInput
                    id="center-my-suffix-country"
                    type="select"
                    className="form-control"
                    name="country"
                    value={(!isNew && centerEntity.country) || 'INDIA'}
                  >
                    <option value="INDIA">{translate('risingarjunApp.Country.INDIA')}</option>
                    <option value="AUSTRALIA">{translate('risingarjunApp.Country.AUSTRALIA')}</option>
                    <option value="USA">{translate('risingarjunApp.Country.USA')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="pincodeLabel" for="center-my-suffix-pincode">
                    <Translate contentKey="risingarjunApp.center.pincode">Pincode</Translate>
                  </Label>
                  <AvField id="center-my-suffix-pincode" type="string" className="form-control" name="pincode" />
                </AvGroup>
                <AvGroup>
                  <Label for="center-my-suffix-enterprise">
                    <Translate contentKey="risingarjunApp.center.enterprise">Enterprise</Translate>
                  </Label>
                  <AvInput id="center-my-suffix-enterprise" type="select" className="form-control" name="enterpriseId">
                    <option value="" key="0" />
                    {enterprises
                      ? enterprises.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.enterprisename}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/center-my-suffix" replace color="info">
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
  enterprises: storeState.enterprise.entities,
  centerheads: storeState.centerhead.entities,
  centerEntity: storeState.center.entity,
  loading: storeState.center.loading,
  updating: storeState.center.updating,
  updateSuccess: storeState.center.updateSuccess
});

const mapDispatchToProps = {
  getEnterprises,
  getCenterheads,
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
)(CenterMySuffixUpdate);
