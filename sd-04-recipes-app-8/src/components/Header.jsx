import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { changeVisibility } from '../actions/index';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import './Header.css';

const Header = ({ changeIsVisible, title }) => (
  <header className="header-foods-drinks">
    <Link to="/perfil">
      <img src={profileIcon} alt="Profile Icon" data-testid="profile-top-btn" />
    </Link>
    <h3 data-testid="page-title">{title}</h3>
    <input type="image" onClick={() => changeIsVisible()}
   src={searchIcon} alt="Search Icon" data-testid="search-top-btn" />
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  changeIsVisible: () => dispatch(changeVisibility()),
});

Header.propTypes = {
  changeIsVisible: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
