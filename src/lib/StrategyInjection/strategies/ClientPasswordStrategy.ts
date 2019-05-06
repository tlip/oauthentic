import { Strategy as ClientPasswordStrategy } from 'passport-oauth2-client-password';

import verifyClient from '../helpers/verifyClient';

export default new ClientPasswordStrategy(verifyClient);
