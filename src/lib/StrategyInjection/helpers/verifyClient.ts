import signale from 'signale';

import db from '../../../db';
import { Client } from 'src/db/entity/Client.entity';

const verifyClient = async (clientId: string, clientSecret: string, done: Function) => {
  
  let client: Client | undefined;

  try {
    client = await db.Clients.findByClientId(clientId);
  } catch (error) {
    signale.error('[VerifyClientError :: Fetching Client]');
    return done(error);
  }

  if (!client || client.clientSecret !== clientSecret) {
    return done(null, false);
  }

  return done(null, client);

};

export default verifyClient;
