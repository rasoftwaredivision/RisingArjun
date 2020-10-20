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
    {/* userdetail, userpreference,subjectbasefee, discount, scholarship, testpaper, answersheet & testresult be visible to all users */}
    <MenuItem icon="asterisk" to="/entity/userdetail-my-suffix">
      <Translate contentKey="global.menu.entities.userdetailMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/userpreference-my-suffix">
      <Translate contentKey="global.menu.entities.userpreferenceMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/subjectbasefee-my-suffix">
      <Translate contentKey="global.menu.entities.subjectbasefeeMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/discount-my-suffix">
      <Translate contentKey="global.menu.entities.discountMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/scholarship-my-suffix">
      <Translate contentKey="global.menu.entities.scholarshipMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/testpaper-my-suffix">
      <Translate contentKey="global.menu.entities.testpaperMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/answersheet-my-suffix">
      <Translate contentKey="global.menu.entities.answersheetMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/testresult-my-suffix">
      <Translate contentKey="global.menu.entities.testresultMySuffix" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/testimonial-my-suffix">
      <Translate contentKey="global.menu.entities.testimonialMySuffix" />
    </MenuItem>
    {/* student, studentsubject,studentfee  can be viewed by all except user */}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.accountant || props.student) && (
      <MenuItem icon="asterisk" to="/entity/student-my-suffix">
        <Translate contentKey="global.menu.entities.studentMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.accountant || props.student) && (
      <MenuItem icon="asterisk" to="/entity/studentsubject-my-suffix">
        <Translate contentKey="global.menu.entities.studentsubjectMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.accountant || props.student) && (
      <MenuItem icon="asterisk" to="/entity/studentfee-my-suffix">
        <Translate contentKey="global.menu.entities.studentfeeMySuffix" />
      </MenuItem>
    )}

    {/* employee, salarypayment, teacher, teachershare  can be viewed by all except user & student */}
    {(props.admin ||
      props.enterpriseadmin ||
      props.centerhead ||
      props.accountant ||
      props.manager ||
      props.teacher ||
      props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/employee-my-suffix">
        <Translate contentKey="global.menu.entities.employeeMySuffix" />
      </MenuItem>
    )}
    {(props.admin ||
      props.enterpriseadmin ||
      props.centerhead ||
      props.accountant ||
      props.manager ||
      props.teacher ||
      props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/salarypayment-my-suffix">
        <Translate contentKey="global.menu.entities.salarypaymentMySuffix" />
      </MenuItem>
    )}
    {(props.admin ||
      props.enterpriseadmin ||
      props.centerhead ||
      props.accountant ||
      props.manager ||
      props.teacher ||
      props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/teacher-my-suffix">
        <Translate contentKey="global.menu.entities.teacherMySuffix" />
      </MenuItem>
    )}
    {(props.admin ||
      props.enterpriseadmin ||
      props.centerhead ||
      props.accountant ||
      props.manager ||
      props.teacher ||
      props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/teachershare-my-suffix">
        <Translate contentKey="global.menu.entities.teachershareMySuffix" />
      </MenuItem>
    )}

    {/* expense, can be viewed by admin, enterpriseadmin, centerhead, accountant & manager */}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.accountant || props.manager) && (
      <MenuItem icon="asterisk" to="/entity/expense-my-suffix">
        <Translate contentKey="global.menu.entities.expenseMySuffix" />
      </MenuItem>
    )}

    {/* topic, fundamentaldetail,question can be viewed by admin, enterpriseadmin,  centerhead, manager, teacher & counsellor */}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.manager || props.teacher || props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/topic-my-suffix">
        <Translate contentKey="global.menu.entities.topicMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.manager || props.teacher || props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/fundamentaldetail-my-suffix">
        <Translate contentKey="global.menu.entities.fundamentaldetailMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.manager || props.teacher || props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/question-my-suffix">
        <Translate contentKey="global.menu.entities.questionMySuffix" />
      </MenuItem>
    )}

    {/* center, centerhead, course, subject accessible to admin, enterpriseadmin,  centerhead, manager & counsellor */}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.manager || props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/center-my-suffix">
        <Translate contentKey="global.menu.entities.centerMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.manager || props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/centerhead-my-suffix">
        <Translate contentKey="global.menu.entities.centerheadMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.manager || props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/course-my-suffix">
        <Translate contentKey="global.menu.entities.courseMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin || props.centerhead || props.manager || props.counsellor) && (
      <MenuItem icon="asterisk" to="/entity/subject-my-suffix">
        <Translate contentKey="global.menu.entities.subjectMySuffix" />
      </MenuItem>
    )}

    {/* enterprise, enterprisesettings, academicsession accessible to  admin & enterpriseadmin */}
    {(props.admin || props.enterpriseadmin) && (
      <MenuItem icon="asterisk" to="/entity/enterprise-my-suffix">
        <Translate contentKey="global.menu.entities.enterpriseMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin) && (
      <MenuItem icon="asterisk" to="/entity/enterprisesettings-my-suffix">
        <Translate contentKey="global.menu.entities.enterprisesettingsMySuffix" />
      </MenuItem>
    )}
    {(props.admin || props.enterpriseadmin) && (
      <MenuItem icon="asterisk" to="/entity/academicsession-my-suffix">
        <Translate contentKey="global.menu.entities.academicsessionMySuffix" />
      </MenuItem>
    )}
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
