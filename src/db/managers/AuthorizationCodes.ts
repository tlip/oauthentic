import { getRepository } from 'typeorm';
import signale from 'signale';

import { AuthorizationCode } from '../entity/AuthorizationCode.entity';

class AuthorizationCodes {

  static save = async (
    code  : string,    clientId: string,    redirectUri: string,
    userId: string,    username: string
  ): Promise<AuthorizationCodes.ReturnValue> => {
    const authorizationCode = new AuthorizationCode();
    authorizationCode.code = code;  
    authorizationCode.clientId = clientId;
    authorizationCode.redirectUri = redirectUri;
    authorizationCode.userId = userId;
    authorizationCode.username = username;
    try {
      return await getRepository(AuthorizationCode).save(authorizationCode);
    } catch (error) {
      signale.error('[AuthorizationCodesOperationError :: save]');
      throw error;
    }
  }

  static findByCode = async (code: string): Promise<AuthorizationCodes.ReturnValue> => {
    try {
      return await getRepository(AuthorizationCode).findOne({ code });
    } catch (error) {
      signale.error('[AuthorizationCodesOperationError :: findByCode]');
      throw error;
    }
  }

  static find = async (authorizationCodeObj: { [field: string]: string})
  : Promise<AuthorizationCodes.ReturnValue> => {
    try {
      return await getRepository(AuthorizationCode).findOne(authorizationCodeObj);
    } catch (error) {
      signale.error('[AuthorizationCodesOperationError :: find]');
      throw error;
    }
  }

  static findByRedirectUri = async (redirectUri: string)
  : Promise<AuthorizationCodes.ReturnValue> => {
    try {
      return await getRepository(AuthorizationCode).findOne({ redirectUri });
    } catch (error) {
      signale.error('[AuthorizationCodesOperationError :: findByRedirectUri]');
      throw error;
    }
  }

}

export default AuthorizationCodes;
