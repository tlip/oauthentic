import oauth2orize from 'oauth2orize';
import crypto from 'crypto';
import signale from 'signale';

import { Client } from '../../db/entity/Client.entity';
import { AuthorizationCode } from '../../db/entity/AuthorizationCode.entity';
import { User } from '../../db/entity/User.entity';
import { RefreshToken } from '../../db/entity/RefreshToken.entity';
import { AccessToken } from 'src/db/entity/AccessToken.entity';
import db from '../../db';
import issueTokens from '../../utils/issueTokens';

const server = oauth2orize.createServer();

server.serializeClient((client, done) => done(null, client.id));

server.deserializeClient(
  async (id, done) => {

    let client: Client | undefined;

    try {
      client = await db.Clients.findById(id);
    } catch (error) {
      signale.error('[DeserializeClientError :: Fetching Client]');
      return done(error);
    }

    return done(null, client);

  }
);

server.grant(oauth2orize.grant.code(
  async (client, redirectUri, user, ares, done) => {

    let auth: AuthorizationCode | undefined;
    const code = crypto.randomBytes(8).toString('hex');

    try {
      auth = await db.AuthorizationCodes
        .save(code, client.clientId, redirectUri, user.id, user.username);
    } catch (error) {
      signale.error('[CodeGrantError :: Saving Authorization Code]');
      return done(error);
    }

    return done(null, auth!.code);

  }
));

server.grant(oauth2orize.grant.token(
  async (client, user, ares, done) => {

    try {
      await issueTokens(user.id, client.clientId, done);
    } catch (error) {
      signale.error('[TokenGrantError :: Issuing Tokens]');
      return done(error);
    }

  }
));

server.exchange(oauth2orize.exchange.code(
  async (client, code, redirectUri, done) => {

    let auth: AuthorizationCode | undefined;
    let token = crypto.randomBytes(128).toString('hex');

    try {
      auth = await db.AuthorizationCodes.findByCode(code);
    } catch (error) {
      signale.error('[CodeExchangeError :: Fetching Authoriztion Code]');
      return done(error);
    }
    
    if (auth!.clientId !== client.clientId) {
      return done(null, false);
    } else if (auth!.redirectUri !== redirectUri) {
      return done(null, false);
    }

    try {
      await issueTokens(auth!.userId, client.clientId, done);
    } catch (error) {
      signale.error('[CodeExchangeError :: Issuing Tokens]');
      return done(error);
    }

  }
));

server.exchange(oauth2orize.exchange.password(
  async (client, username, password, scope, done) => {

    let _client: Client | undefined;
    let user: User | undefined;
    const token = crypto.randomBytes(128).toString('hex');

    try {
      _client = await db.Clients.findByClientId(client.clientId);
    } catch (error) {
      signale.error('[PasswordExchangeError :: Fetching Client]');
      return done(error);
    }

    if (!_client || _client.clientSecret !== client.clientSecret) {
      return done(null, false);
    }

    //

    try {
      user = await db.Users.findByUsername(username);
    } catch (error) {
      signale.error('[PasswordExchangeError :: Fetching User]');
      return done(error);
    }

    if (!user || user.password !== password) {
      return done(null, false);
    }
  
    //

    try {
      await issueTokens(user.id, _client.clientId, done);
    } catch (error) {
      signale.error('[PasswordExchangeError :: Issuing Tokens]');
      return done(error);
    }

  }
));

server.exchange(oauth2orize.exchange.clientCredentials(
  async (client, scope, done) => {

    const token = crypto.randomBytes(128).toString('hex');
    let _client: Client | undefined;

    try {
      _client = await db.Clients.findByClientId(client.clientId);
    } catch (error) {
      signale.error('[ClientCredentialsExchangeError :: Fetching Client]');
      return done(error);
    }

    if (!_client || _client.clientSecret !== client.clientSecret) {
      return done(null, false);
    }

    try {
      await issueTokens(null, client.clientId, done);
    } catch (error) {
      signale.error('[ClientCredentialsExchangeError :: Issuing Tokens]');
      return done(error);
    }

  }
));

server.exchange(oauth2orize.exchange.refreshToken(
  async (client, token, scope, done) => {
    
    let refreshToken: RefreshToken | undefined;
    let accessToken: AccessToken | undefined;
    const getToken = (err: Error, aToken: string, rToken: string) => {
      if (err) {
        signale.error('[RefreshExchangeError :: Issuing Tokens :: returnIssuedTokens]');
        throw err;
      }
      return rToken;
    };

    try {
      refreshToken = await db.RefreshTokens.find(token);
      if (refreshToken) {
        const rToken = await issueTokens(refreshToken!.userId, refreshToken!.clientId, getToken);
        refreshToken = await db.RefreshTokens.find(rToken);
      }
      else { return done(null, false); }
    } catch (error) {
      signale.error('[RefreshExchangeError :: Issuing Tokens]');
      return done(error);
    }

    try {
      accessToken = await db.AccessTokens.revoke(refreshToken!.userId, refreshToken!.clientId);
      if (!accessToken) { return done(null, false); }
    } catch (error) {
      signale.error('[RefreshExchangeError :: Revoking Access Token]');
      return done(error);
    }

    try {
      await db.RefreshTokens
        .revokeByUserIdAndClientId(refreshToken!.userId, refreshToken!.clientId);
    } catch (error) {
      signale.error('[RefreshExchangeError :: Removnig Refresh Token]');
      return done(error);
    }

    return done(null, accessToken.token, refreshToken!.token);

  }
));

export default server;
