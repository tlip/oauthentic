
import { PassportStatic } from 'passport';
import signale from 'signale';

import * as strategies from './strategies';
import { User } from './../../db/entity/User.entity';
import db from '../../db';


const StrategyInjection = (passport: PassportStatic) => {

  passport.use(strategies.LocalStrategy);

  passport.serializeUser((user: User, done: Function) =>  done(null, user.id));
  passport.deserializeUser<User, string>(
    async (id: string, done: Function) => {

      let user: User | undefined;
      
      try {
        user = await db.Users.findById(id);
      } catch (error) {
        signale.error('[PassportDeserializeError :: Fetching User]');
        return done(error);
      }

      return done(null, user);

    }
  );

  passport.use(strategies.BasicStrategy);
  passport.use(strategies.ClientPasswordStrategy);
  passport.use(strategies.BearerStrategy);

};

export default StrategyInjection;
