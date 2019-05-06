import { Strategy as LocalStrategy } from 'passport-local';
import signale from 'signale';

import { User } from 'src/db/entity/User.entity';
import db from '../../../db';

export default new LocalStrategy(
  async (username, password, done) => {

    let user: User | undefined;
    let passwordValid: boolean;

    try {
      user = await db.Users.findByUsername(username);
      if (!user) { return done(null, false); }
    } catch (error) {
      signale.error('[LocalStrategyError :: Fetching User]');
      return done(error);
    }

    try {
      passwordValid = await db.Users.comparePassword(username, password);
      if (!passwordValid) { return done(null, false); }
    } catch (error) {
      signale.error('[LocalStrategyError :: Comparing Password]');
      return done(error);
    }

    return done(null, user);

  }
);
