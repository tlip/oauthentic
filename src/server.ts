import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from 'errorhandler';
import session from 'express-session';
import redisStore from 'connect-redis';
import passport from 'passport';

import StrategyInjection from './lib/StrategyInjection';
import routes from './routes';

const isProd = process.env.NODE_ENV === 'production';
const server = express();
const RedisStore = redisStore(session);

server
  .disable('x-powered-by')
  .disable('X-Powered-By')
  .use(morgan(isProd ? 'combined' : 'dev'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors())
  .use(errorHandler())
  .use(session({
    secret: <string>process.env.REDIS_SESSION_SECRET,
    store: new RedisStore({
      url: <string>process.env.REDIS_URL,
      port: +<string>process.env.REDIS_PORT,
    }),
    resave: false,
    saveUninitialized: false,
  }))
  .use(passport.initialize())
  .use(passport.session());

StrategyInjection(passport);

server
  .use('/oauth2', routes.oauth2)
  .use('/api/client', routes.client)
  .use('/api/user', routes.user)
  .use('/auth', routes.auth)
  .get('/', (req, res) => res.status(200).end('Oauth2 Server'))
  .get('/*', (req, res) => res.status(404));

export default server;
