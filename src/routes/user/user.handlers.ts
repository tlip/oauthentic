import passport from 'passport';
import bcrypt from 'bcrypt';
import signale from 'signale';

import db from '../../db';
import { User } from 'src/db/entity/User.entity';

export const info = [
  passport.authenticate('bearer', { session: false }),
  (req: any, res: any) => {
    res.json({
      user_id: req.user.id,
      name: req.user.name,
      scope: req.authInfo.scope,
    });
  },
];

export const register = async (req: any, res: any) => {

  const { username, password } = req.body;
  const passwordMatch = (password || '').match(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    );
    
  let existingUser: User | undefined;
  let [statusCode, message] = [200, 'User created!'];
  
  try {
    existingUser = await db.Users.findByUsername(username);
  } catch (error) {
    [statusCode, message] = [500, 'Something went wrong registering user'];
  }
  
  if (existingUser) {
    [statusCode, message] = [409, 'Username already exists'];
  } else if (passwordMatch === null) {
    [statusCode, message] = [418, 'Password doesn\'t meet requirements'];
  }

  if (statusCode === 200) {
    try{
      const hash = await bcrypt.hash(password, 10);
      await db.Users.save(username, hash);
    } catch (error) {
      [statusCode, message] = [500, 'Something went wrong registering user'];
      signale.error(error);
    }
  }

  res
    .status(statusCode)
    .json({ message });

};

