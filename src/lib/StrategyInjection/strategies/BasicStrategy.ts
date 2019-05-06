import { BasicStrategy } from 'passport-http';

import verifyClient from '../helpers/verifyClient';

export default new BasicStrategy(verifyClient);
