import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import profileIcon from '../images/profileIcon.svg';
import './ExploreHeader.css';

const ExploreHeader = ({ title }) => (
  <header className="header-explore">
    <Link to="/perfil">
      <img src={profileIcon} alt="Profile Icon" data-testid="profile-top-btn" />
    </Link>
    <h3 data-testid="page-title">{title}</h3>
  </header>
);

ExploreHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ExploreHeader;
