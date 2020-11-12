import './header.scss';

import React from 'react';
import Default from 'app/quiz/navbar.item';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { Home, Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEnterpriseadmin: boolean;
  isCenterhead: boolean;
  isAccountant: boolean;
  isManager: boolean;
  isTeacher: boolean;
  isCounsellor: boolean;
  isStudent: boolean;
  isUser: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    this.props.onLocaleChange(langKey);
  };

  renderDevRibbon = () =>
    this.props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${this.props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const {
      currentLocale,
      isAuthenticated,
      isAdmin,
      isEnterpriseadmin,
      isCenterhead,
      isAccountant,
      isManager,
      isCounsellor,
      isSwaggerEnabled,
      isInProduction
    } = this.props;

    /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

    return (
      <div id="app-header">
        {this.renderDevRibbon()}
        <LoadingBar className="loading-bar" />
        <Navbar dark expand="sm" fixed="top" className="jh-navbar">
          <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
          <Brand />
          <Collapse isOpen={this.state.menuOpen} navbar>
            <Nav id="header-tabs" className="ml-auto" navbar>
              <Home />
              <Default />
              {isAuthenticated && (
                <EntitiesMenu
                  admin={this.props.isAdmin}
                  enterpriseadmin={this.props.isEnterpriseadmin}
                  centerhead={this.props.isCenterhead}
                  accountant={this.props.isAccountant}
                  manager={this.props.isManager}
                  teacher={this.props.isTeacher}
                  counsellor={this.props.isCounsellor}
                  student={this.props.isStudent}
                  user={this.props.isUser}
                />
              )}
              {isAuthenticated && (isAdmin || isEnterpriseadmin || isCenterhead || isAccountant || isManager || isCounsellor) && (
                <AdminMenu showSwagger={isSwaggerEnabled} />
              )}
              <LocaleMenu currentLocale={currentLocale} onClick={this.handleLocaleChange} />
              <AccountMenu isAuthenticated={isAuthenticated} />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
