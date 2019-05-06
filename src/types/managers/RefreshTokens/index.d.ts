import { RefreshToken } from '../../../db/entity/RefreshToken.entity';

export as namespace RefreshTokens;
export = RefreshTokens;

export declare class RefreshTokens {

  static save(token: string, userId: string | null, clientId: string)
    : Promise<RefreshTokens.ReturnValue>;

  static find(token: string)
    : Promise<RefreshTokens.ReturnValue>;

  static findByUserIdAndClientId(userId: string, clientId: string)
    : Promise<RefreshTokens.ReturnValue>;

  static revokeByUserIdAndClientId(userId: string, clientId: string)
    : Promise<RefreshTokens.ReturnValue>;

}

declare namespace RefreshTokens {
  type ReturnValue = undefined | RefreshToken;
}
