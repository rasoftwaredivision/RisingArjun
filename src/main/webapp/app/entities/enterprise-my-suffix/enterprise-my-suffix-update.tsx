import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITestpaperMySuffix } from 'app/shared/model/testpaper-my-suffix.model';
import { getEntities as getTestpapers } from 'app/entities/testpaper-my-suffix/testpaper-my-suffix.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './enterprise-my-suffix.reducer';
import { IEnterpriseMySuffix } from 'app/shared/model/enterprise-my-suffix.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEnterpriseMySuffixUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEnterpriseMySuffixUpdateState {
  isNew: boolean;
  testpaperId: string;
}

export class EnterpriseMySuffixUpdate extends React.Component<IEnterpriseMySuffixUpdateProps, IEnterpriseMySuffixUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      testpaperId: '0',
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

    this.props.getTestpapers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { enterpriseEntity } = this.props;
      const entity = {
        ...enterpriseEntity,
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
    this.props.history.push('/entity/enterprise-my-suffix');
  };

  render() {
    const { enterpriseEntity, testpapers, loading, updating } = this.props;
    const { isNew } = this.state;

    const { logo, logoContentType } = enterpriseEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="risingarjunApp.enterprise.home.createOrEditLabel">
              <Translate contentKey="risingarjunApp.enterprise.home.createOrEditLabel">Create or edit a Enterprise</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : enterpriseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="enterprise-my-suffix-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="enterprise-my-suffix-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="abbrevationLabel" for="enterprise-my-suffix-abbrevation">
                    <Translate contentKey="risingarjunApp.enterprise.abbrevation">Abbrevation</Translate>
                  </Label>
                  <AvField
                    id="enterprise-my-suffix-abbrevation"
                    type="text"
                    name="abbrevation"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) },
                      maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="enterprisenameLabel" for="enterprise-my-suffix-enterprisename">
                    <Translate contentKey="risingarjunApp.enterprise.enterprisename">Enterprisename</Translate>
                  </Label>
                  <AvField
                    id="enterprise-my-suffix-enterprisename"
                    type="text"
                    name="enterprisename"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) },
                      maxLength: { value: 64, errorMessage: translate('entity.validation.maxlength', { max: 64 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="natureofbusinessLabel" for="enterprise-my-suffix-natureofbusiness">
                    <Translate contentKey="risingarjunApp.enterprise.natureofbusiness">Natureofbusiness</Translate>
                  </Label>
                  <AvInput
                    id="enterprise-my-suffix-natureofbusiness"
                    type="select"
                    className="form-control"
                    name="natureofbusiness"
                    value={(!isNew && enterpriseEntity.natureofbusiness) || 'COACHING'}
                  >
                    <option value="COACHING">{translate('risingarjunApp.Natureofbusiness.COACHING')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="logoLabel" for="logo">
                      <Translate contentKey="risingarjunApp.enterprise.logo">Logo</Translate>
                    </Label>
                    <br />
                    {logo ? (
                      <div>
                        <a onClick={openFile(logoContentType, logo)}>
                          <img src={`data:${logoContentType};base64,${logo}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {logoContentType}, {byteSize(logo)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('logo')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_logo" type="file" onChange={this.onBlobChange(true, 'logo')} accept="image/*" />
                    <AvInput type="hidden" name="logo" value={logo} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label id="punchlineLabel" for="enterprise-my-suffix-punchline">
                    <Translate contentKey="risingarjunApp.enterprise.punchline">Punchline</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-punchline" type="text" name="punchline" />
                </AvGroup>
                <AvGroup>
                  <Label id="missionLabel" for="enterprise-my-suffix-mission">
                    <Translate contentKey="risingarjunApp.enterprise.mission">Mission</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-mission" type="text" name="mission" />
                </AvGroup>
                <AvGroup>
                  <Label id="visionLabel" for="enterprise-my-suffix-vision">
                    <Translate contentKey="risingarjunApp.enterprise.vision">Vision</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-vision" type="text" name="vision" />
                </AvGroup>
                <AvGroup>
                  <Label id="principlesLabel" for="enterprise-my-suffix-principles">
                    <Translate contentKey="risingarjunApp.enterprise.principles">Principles</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-principles" type="text" name="principles" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="enterprise-my-suffix-email">
                    <Translate contentKey="risingarjunApp.enterprise.email">Email</Translate>
                  </Label>
                  <AvField
                    id="enterprise-my-suffix-email"
                    type="text"
                    name="email"
                    validate={{
                      pattern: {
                        value: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$',
                        errorMessage: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' })
                      }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="mobileLabel" for="enterprise-my-suffix-mobile">
                    <Translate contentKey="risingarjunApp.enterprise.mobile">Mobile</Translate>
                  </Label>
                  <AvField
                    id="enterprise-my-suffix-mobile"
                    type="text"
                    name="mobile"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="landlineLabel" for="enterprise-my-suffix-landline">
                    <Translate contentKey="risingarjunApp.enterprise.landline">Landline</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-landline" type="text" name="landline" />
                </AvGroup>
                <AvGroup>
                  <Label id="faxLabel" for="enterprise-my-suffix-fax">
                    <Translate contentKey="risingarjunApp.enterprise.fax">Fax</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-fax" type="text" name="fax" />
                </AvGroup>
                <AvGroup>
                  <Label id="plotNoLabel" for="enterprise-my-suffix-plotNo">
                    <Translate contentKey="risingarjunApp.enterprise.plotNo">Plot No</Translate>
                  </Label>
                  <AvField
                    id="enterprise-my-suffix-plotNo"
                    type="text"
                    name="plotNo"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="streetLabel" for="enterprise-my-suffix-street">
                    <Translate contentKey="risingarjunApp.enterprise.street">Street</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-street" type="text" name="street" />
                </AvGroup>
                <AvGroup>
                  <Label id="cityLabel" for="enterprise-my-suffix-city">
                    <Translate contentKey="risingarjunApp.enterprise.city">City</Translate>
                  </Label>
                  <AvInput
                    id="enterprise-my-suffix-city"
                    type="select"
                    className="form-control"
                    name="city"
                    value={(!isNew && enterpriseEntity.city) || 'DEHRADUN'}
                  >
                    <option value="DEHRADUN">{translate('risingarjunApp.City.DEHRADUN')}</option>
                    <option value="DELHI">{translate('risingarjunApp.City.DELHI')}</option>
                    <option value="GURGAON">{translate('risingarjunApp.City.GURGAON')}</option>
                    <option value="LONI">{translate('risingarjunApp.City.LONI')}</option>
                    <option value="TEHRI">{translate('risingarjunApp.City.TEHRI')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="stateLabel" for="enterprise-my-suffix-state">
                    <Translate contentKey="risingarjunApp.enterprise.state">State</Translate>
                  </Label>
                  <AvInput
                    id="enterprise-my-suffix-state"
                    type="select"
                    className="form-control"
                    name="state"
                    value={(!isNew && enterpriseEntity.state) || 'DELHI'}
                  >
                    <option value="DELHI">{translate('risingarjunApp.State.DELHI')}</option>
                    <option value="HARYANA">{translate('risingarjunApp.State.HARYANA')}</option>
                    <option value="MADHYAPRADESH">{translate('risingarjunApp.State.MADHYAPRADESH')}</option>
                    <option value="UTTRAKHAND">{translate('risingarjunApp.State.UTTRAKHAND')}</option>
                    <option value="UTTARPRADESH">{translate('risingarjunApp.State.UTTARPRADESH')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="countryLabel" for="enterprise-my-suffix-country">
                    <Translate contentKey="risingarjunApp.enterprise.country">Country</Translate>
                  </Label>
                  <AvInput
                    id="enterprise-my-suffix-country"
                    type="select"
                    className="form-control"
                    name="country"
                    value={(!isNew && enterpriseEntity.country) || 'INDIA'}
                  >
                    <option value="INDIA">{translate('risingarjunApp.Country.INDIA')}</option>
                    <option value="AUSTRALIA">{translate('risingarjunApp.Country.AUSTRALIA')}</option>
                    <option value="USA">{translate('risingarjunApp.Country.USA')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="pincodeLabel" for="enterprise-my-suffix-pincode">
                    <Translate contentKey="risingarjunApp.enterprise.pincode">Pincode</Translate>
                  </Label>
                  <AvField id="enterprise-my-suffix-pincode" type="string" className="form-control" name="pincode" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/enterprise-my-suffix" replace color="info">
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
  testpapers: storeState.testpaper.entities,
  enterpriseEntity: storeState.enterprise.entity,
  loading: storeState.enterprise.loading,
  updating: storeState.enterprise.updating,
  updateSuccess: storeState.enterprise.updateSuccess
});

const mapDispatchToProps = {
  getTestpapers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterpriseMySuffixUpdate);
