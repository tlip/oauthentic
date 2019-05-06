import { Strategy as BearerStrategy } from 'passport-http-bearer';
import signale from 'signale';

import { AccessToken } from '../../../db/entity/AccessToken.entity';
import { User } from '../../../db/entity/User.entity';
import { Client } from '../../../db/entity/Client.entity';
import db from '../../../db';

export default new BearerStrategy(
  async (token: string, done: Function) => {
    let accessToken: AccessToken | undefined;
    let user: User | undefined;
    let client: Client | undefined;

    try {
      accessToken = await db.AccessTokens.find(token);
      if (!accessToken) { return done(null, false); }
    } catch (error) {
      signale.error('[BearerStrategyError :: Fetching Token]');
      return done(error);
    }

    if (accessToken.userId) {

      try {
        user = await db.Users.findById(accessToken.userId);
        if (!user) { return done(null, false); }
      } catch (error) {
      signale.error('[BearerStrategyError :: Fetching User]');
        return done(error);
      }
      return done(null, user, { scope: '*' });

    }

    try {
      client = await db.Clients.findByClientId(accessToken.clientId);
      if (!client) { return done(null, false); }
    } catch (error) {
      signale.error('[BearerStrategyError :: Fetching Client]');
      return done(error);
    }
    return done(null, client, { scope: '*' });

  }
);
