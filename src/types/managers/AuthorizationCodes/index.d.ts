import { AuthorizationCode } from '../../../db/entity/AuthorizationCodes.entity';

export as namespace AuthorizationCodes;
export = AuthorizationCodes;

export declare class AuthorizationCodes {

  public save(
    code  : string,    clientId: string,    redirectUri: string,
    userId: string,    username: string
  ) : Promise<AuthorizationCodes.ReturnValue>;

  public findByCode(code: string)
    : Promise<AuthorizationCodes.ReturnValue>;

  public find(authorizationCodeObj: { [field: string]: string})
    : Promise<AuthorizationCodes.ReturnValue>;

  public findByRedirectUri(redirectUri: string)
    : Promise<AuthorizationCodes.ReturnValue>;

}

declare namespace AuthorizationCodes {
  type ReturnValue = undefined | AuthorizationCode | Error;
}
