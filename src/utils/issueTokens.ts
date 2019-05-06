import crypto from 'crypto';
import signale from 'signale';

import { User } from '../db/entity/User.entity';
import { AccessToken } from '../db/entity/AccessToken.entity';
import { RefreshToken } from '../db/entity/RefreshToken.entity';
import db from '../db';

const issueTokens = async (userId: string | null, clientId: string, done: Function) => {

  let accessToken: AccessToken | undefined;
  let refreshToken: RefreshToken | undefined;

  const atoken = crypto.randomBytes(128).toString('hex');
  const rToken = crypto.randomBytes(128).toString('hex');

  try {
    accessToken = await db.AccessTokens.save(atoken, userId, clientId);
    if (!accessToken) { return done(null, false); }
  } catch (error) {
    signale.error('[IssueTokensError :: issueTokens :: accessToken]');
    throw error;
  }
  
  try {
    refreshToken = await db.RefreshTokens.save(rToken, userId, clientId);
    if (!refreshToken) { return done(null, false); }
  } catch (error) {
    signale.error('[IssueTokensError :: issueTokens :: refeshToken]');
    throw error;
  }

  return done(null, atoken, rToken);

};

export default issueTokens;
