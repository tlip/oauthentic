import { getRepository } from 'typeorm';
import signale from 'signale';

import { Client } from '../entity/Client.entity';

class Clients {

  static save = async(name: string, clientId: string, clientSecret: string) => {
    const client = new Client();
    client.name = name;
    client.clientId = clientId;
    client.clientSecret = clientSecret;
    client.isTrusted = false;
    try {
      return getRepository(Client).save(client);
    } catch (error) {
      signale.error('[ClientsOperationError :: save]');
      throw error;
    }
  }

  static findByClientId = async (clientId: string): Promise<Clients.ReturnValue> => {
    try {
      return getRepository(Client).findOne({ clientId });
    } catch (error) {
      signale.error('[ClientsOperationError :: findByClientId]');
      throw error;
    }
  }

  static findByName = async (name: string): Promise<Clients.ReturnValue> => {
    try {
      return getRepository(Client).findOne({ name });
    } catch (error) {
      signale.error('[ClientsOperationError :: findByName]');
      throw error;
    }
  }

  static findById = async (id: string): Promise<Clients.ReturnValue> => {
    try {
      return getRepository(Client).findOne({ id });
    } catch (error) {
      signale.error('[ClientsOperationError :: findById]');
      throw error;
    }
  }

}

export default Clients;
