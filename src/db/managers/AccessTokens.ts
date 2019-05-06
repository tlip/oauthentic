import { getRepository } from 'typeorm';
import signale from 'signale';

import { AccessToken } from '../entity/AccessToken.entity';

class AccessTokens {

  static save = async (token: string, userId: string | null, clientId: string)
  : Promise<AccessTokens.ReturnValue> => {
    const accessToken = new AccessToken();
    //@ts-ignore
    accessToken.userId = userId;
    accessToken.token = token;
    accessToken.clientId = clientId;
    try {
      return getRepository(AccessToken).save(accessToken);
    } catch (error) {
      signale.error('[AccessTokensOperationError :: save]');
      throw error;
    }
  }

  static find = async (token: string): Promise<AccessTokens.ReturnValue> => {
    try {
      return getRepository(AccessToken).findOne({ token });
    } catch (error) { 
      signale.error('[AccessTokensOperationError :: find]');
      throw error;
    }
  }

  static findByClientIdAndUserId = async (clientId: string, userId: string)
  : Promise<AccessTokens.ReturnValue> => {
    try {
      return getRepository(AccessToken).findOne({ clientId, userId });
    } catch (error) {
      signale.error('[AccessTokensOperationError :: findByClientIdAndUserId]');
      throw error;
    }
  }

  static revoke = async (userId: string, clientId: string) => {

    try {
      const repository = getRepository(AccessToken);
      const accessToken = await repository.findOne({ clientId, userId });
      if (accessToken) { await repository.remove(accessToken); }
      return accessToken;
    } catch (error) {
      signale.error('[AccessTokensOperationError :: revoke]');
      throw error;
    }

  }

}

export default AccessTokens;
