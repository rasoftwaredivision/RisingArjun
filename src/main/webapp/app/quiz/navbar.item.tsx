import React from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';

const QuizNav = props => (
  <NavItem>
    <NavLink tag={Link} to="/quiz" className="d-flex align-items-center">
      <FontAwesomeIcon icon="cube" />
      <span>Quiz</span>
    </NavLink>
  </NavItem>
);

export default QuizNav;
