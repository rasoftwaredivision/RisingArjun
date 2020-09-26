import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/userdetail-my-suffix">
        <Translate contentKey="global.menu.entities.userdetailMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/userpreference-my-suffix">
        <Translate contentKey="global.menu.entities.userpreferenceMySuffix" />
      </MenuItem>
    )}

    {(props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/course-my-suffix">
        <Translate contentKey="global.menu.entities.courseMySuffix" />
      </MenuItem>
    )}

    {(props.student || props.teacher || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/student-my-suffix">
        <Translate contentKey="global.menu.entities.studentMySuffix" />
      </MenuItem>
    )}

    {(props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/subject-my-suffix">
        <Translate contentKey="global.menu.entities.subjectMySuffix" />
      </MenuItem>
    )}

    {(props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/academicsession-my-suffix">
        <Translate contentKey="global.menu.entities.academicsessionMySuffix" />
      </MenuItem>
    )}

    {(props.student || props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/studentsubject-my-suffix">
        <Translate contentKey="global.menu.entities.studentsubjectMySuffix" />
      </MenuItem>
    )}

    {(props.student || props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/subjectbasefee-my-suffix">
        <Translate contentKey="global.menu.entities.subjectbasefeeMySuffix" />
      </MenuItem>
    )}

    {(props.student || props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/discount-my-suffix">
        <Translate contentKey="global.menu.entities.discountMySuffix" />
      </MenuItem>
    )}

    {(props.student || props.centerhead || props.teacher || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/scholarship-my-suffix">
        <Translate contentKey="global.menu.entities.scholarshipMySuffix" />
      </MenuItem>
    )}

    {(props.student || props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/studentfee-my-suffix">
        <Translate contentKey="global.menu.entities.studentfeeMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/employee-my-suffix">
        <Translate contentKey="global.menu.entities.employeeMySuffix" />
      </MenuItem>
    )}

    {(props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/center-my-suffix">
        <Translate contentKey="global.menu.entities.centerMySuffix" />
      </MenuItem>
    )}

    {(props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/centerhead-my-suffix">
        <Translate contentKey="global.menu.entities.centerheadMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/teacher-my-suffix">
        <Translate contentKey="global.menu.entities.teacherMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/teachershare-my-suffix">
        <Translate contentKey="global.menu.entities.teachershareMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/salarypayment-my-suffix">
        <Translate contentKey="global.menu.entities.salarypaymentMySuffix" />
      </MenuItem>
    )}

    {(props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/expense-my-suffix">
        <Translate contentKey="global.menu.entities.expenseMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/chapter-my-suffix">
        <Translate contentKey="global.menu.entities.chapterMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/fundamentaldetail-my-suffix">
        <Translate contentKey="global.menu.entities.fundamentaldetailMySuffix" />
      </MenuItem>
    )}

    {(props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/question-my-suffix">
        <Translate contentKey="global.menu.entities.questionMySuffix" />
      </MenuItem>
    )}

    {(props.student || props.teacher || props.centerhead || props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/studentscore-my-suffix">
        <Translate contentKey="global.menu.entities.studentscoreMySuffix" />
      </MenuItem>
    )}

    {(props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/enterprise-my-suffix">
        <Translate contentKey="global.menu.entities.enterpriseMySuffix" />
      </MenuItem>
    )}

    {(props.enterpriseadmin || props.admin) && (
      <MenuItem icon="asterisk" to="/entity/enterprisesettings-my-suffix">
        <Translate contentKey="global.menu.entities.enterprisesettingsMySuffix" />
      </MenuItem>
    )}

    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
