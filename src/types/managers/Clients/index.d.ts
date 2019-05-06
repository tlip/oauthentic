import { Client } from '../../../db/entity/Client.entity';

export as namespace Clients;
export = Clients;

declare class Clients {

  public findByClientId(clientId: string): Promise<Clients.ReturnValue>;

  public findById(id: string): Promise<Clients.ReturnValue>;

}

declare namespace Clients {
  type ReturnValue = undefined | Client;
}