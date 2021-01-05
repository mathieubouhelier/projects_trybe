import { MD5 } from 'crypto-js';

const GRAVATAR_API = 'https://www.gravatar.com/avatar/';

const cryptEmail = (email) =>
  (email ? `${GRAVATAR_API}${MD5(email.trim().toLowerCase()).toString()}` : GRAVATAR_API);

export default cryptEmail;
