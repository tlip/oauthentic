import passport from 'passport';
import login from 'connect-ensure-login';

import OauthServer from '../../lib/OauthServer';
import db from '../../db';
import { Client } from 'src/db/entity/Client.entity';

export const authorization = [
  login.ensureLoggedIn('/auth/login'),
  OauthServer.authorization(

    // Let's check that the client is authorized
    async (clientId: string, redirectUri: string, done: Function) => {

      let client: Client | undefined;

      try {
        client = await db.Clients.findByClientId(clientId);
      } catch (error) {
        throw done(error);
      }

      return done(null, client, redirectUri);

    },

    // If so, let's just auto-trust them
    async (client: any, user: any, scope, type, arec, done: Function) => {

      if (client.isTrusted) {
        return done(null, true);
      }

      try {
        const accessToken = await db.AccessTokens
          .findByClientIdAndUserId(user.id, client.clientId);
        if (!accessToken) { return done(null, false); }
      } catch (error) {
        return done(error);
      }

      return done(null, true);

    }
    
  ),

  // Send the 
  (req: any, res: any) => {
    res.end(`
      <html>
      <body>
        <div>
          <p>Hi ${req.user.name}!</p>
          <p><b>${req.oauth2.client.name}</b> is requesting access to your account.</p>
          <p>Do you approve?</p>
        
          <form action="/oauth2/authorize/decision" method="post">
            <input name="transaction_id" type="hidden" value="${req.oauth2.transactionID}" />
            <div>
              <input type="submit" value="Allow" id="allow" />
              <input type="submit" value="Deny" name="cancel" id="deny" />
            </div>
          </form>
      </body>
      </html>
    `);
  },
];


export const decision = [
  login.ensureLoggedIn('/auth/login'),
  OauthServer.decision(),
];


export const token = [
  passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
  OauthServer.token(),
  OauthServer.errorHandler(),
];
