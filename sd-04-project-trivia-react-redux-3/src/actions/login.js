import cryptEmail from '../services/cryptoGravatarAPI';

export const LOG_INTO = 'LOG_INTO';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';

export const logInto = (login) => ({
  type: LOG_INTO,
  name: login.name,
  urlGravatar: cryptEmail(login.emailGravatar),
  emailGravatar: login.emailGravatar,
});

export const updatePlayer = (data) => ({
  type: UPDATE_PLAYER,
  score: data,
});
