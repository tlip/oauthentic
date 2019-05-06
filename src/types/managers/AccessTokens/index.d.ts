import { AccessToken } from '../../../db/entity/AccessToken.entity';

export as namespace AccessTokens;
export = AccessTokens;

export declare class AccessTokens {

  public save(token: string, userId: string | null, clientId: string)
    : Promise<AccessTokens.ReturnValue>;

  public find(token: string)
    : Promise<AccessTokens.ReturnValue>;

  public findByClientIdAndUserId(clientId: string, userId: string)
    : Promise<AccessTokens.ReturnValue>;

}

declare namespace AccessTokens {
  type ReturnValue = undefined | AccessToken;
}
