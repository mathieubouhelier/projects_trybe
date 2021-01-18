import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const { player: { score, assertions, name }, urlGravatar } = useSelector((state) => state.login);
  return (
    <div>
      <img src={urlGravatar} alt="gravatarPicture" data-testid="header-profile-picture" />
      <p data-testid="header-player-name">{name}</p>
      <p data-testid="header-score">{score}</p>
      <p>{assertions}</p>
    </div>
  );
};

export default Header;
