import crypto from 'crypto';
import signale from 'signale';

import db from '../db';

const issueTokens = async (userId: string | null, clientId: string, done: Function) => {

  const atoken = crypto.randomBytes(128).toString('hex');
  const rToken = crypto.randomBytes(128).toString('hex');

  try {
    await db.AccessTokens.save(atoken, userId, clientId);
  } catch (error) {
    signale.error('[IssueTokensError :: issueTokens :: accessToken]');
    throw error;
  }
  
  try {
    await db.RefreshTokens.save(rToken, userId, clientId);
  } catch (error) {
    signale.error('[IssueTokensError :: issueTokens :: refeshToken]');
    throw error;
  }

  return done(null, atoken, rToken, { expires: 3600 });

};

export default issueTokens;
