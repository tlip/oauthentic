import passport from 'passport';
import crypto from 'crypto';
import signale from 'signale';

import db from '../../db';
import { Client } from '../../db/entity/Client.Entity';

export const info = [
  passport.authenticate('bearer', { session: false }),
  (request: any, response: any) => {
    response.json({
      client_id: request.user.id,
      name: request.user.name,
      scope: request.authInfo.scope,
    });
  },
];

export const register = async (req: any, res: any) => {

  const { name } = req.body;
  const existingClient = await db.Clients.findByName(name);
  let client: Client;
  let data: { clientId?: string, clientSecret?: string } = {};

  let [statusCode, message] = [200, 'Client created!'];

  if (existingClient instanceof Error) {
    [statusCode, message] = [500, 'Something went wrong registering client'];
  } else if (existingClient) {
    [statusCode, message] = [409, 'Client name already exists'];
  }

  if (statusCode === 200) {
    try{
      const clientId = crypto.randomBytes(8).toString('hex');
      const clientSecret = crypto.randomBytes(16).toString('hex');
      const client = await db.Clients.save(name, clientId, clientSecret);
      if (!client || client instanceof Error) {
        [statusCode, message] = [500, 'Something went wrong registering client'];
      } else {
        Object.assign(data, { clientId, clientSecret });
      }

    } catch (error) {
      [statusCode, message] = [500, 'Something went wrong registering client'];
      signale.error(error);
    }
  }

  res
    .status(statusCode)
    .json(Object.assign({ message }, ...Object
        .entries(data)
        .map(([clientfield, clientData]) => ({
          [clientfield]: clientData,
        }))
    ));

};
