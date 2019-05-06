import passport from 'passport';
import bcrypt from 'bcrypt';
import signale from 'signale';

import db from '../../db';


export const login = passport.authenticate('local', {
  successReturnToOrRedirect: process.env.SUCCESS_REDIRECT,
  failureRedirect: process.env.FAIL_REDIRECT,
});

export const loginForm = (reqe: any, res: any) => res.status(200).end(`
  <html>
  <body>
    <form action="/auth/login" method="post">
      <div>
        <label>Username:</label>
        <input type="text" name="username" /><br/>
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" />
      </div>
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </body>
  </html>
`);

export const logout = (req: any, res: any) => {
  req.logout();
};
