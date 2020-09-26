import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
const Footer = props => (
  <div className="footer">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4 offset-1 col-sm-2 text-white">
          <h5>Links</h5>
          <ul className="list-unstyled">
            <li>
              <NavLink tag={Link} to="/" className="d-flex align-items-center">
                Home
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col-7 col-sm-5 text-white">
          <h5>Our Address</h5>
          <address>
            Address placeholder
            <br />
            <i className="fa fa-phone fa-lg" />: phonenumber1
            <br />
            <i className="fa fa-fax fa-lg" />: phonenumber2
            <br />
            <i className="fa fa-envelope fa-lg" />: <a href="mailto:rasoftaredivision@gmail.com">email</a>
          </address>
        </div>
        <div className="col-12 col-sm-4 align-self-center">
          <div className="text-center">
            <a className="btn btn-social-icon btn-google" href="http://google.com/+">
              <i className="fa fa-google-plus" />
            </a>
            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id=">
              <i className="fa fa-facebook" />
            </a>
            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/">
              <i className="fa fa-linkedin" />
            </a>
            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/">
              <i className="fa fa-twitter" />
            </a>
            <a className="btn btn-social-icon btn-google" href="http://youtube.com/">
              <i className="fa fa-youtube" />
            </a>
            <a className="btn btn-social-icon" href="mailto:">
              <i className="fa fa-envelope-o" />
            </a>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto text-white">
          <p>Copyright: RASOFTWAREDIVISON</p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
