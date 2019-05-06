import http from 'http';
import signale from 'signale';
import { createConnection } from 'typeorm';

import ormConfig from './db/orm.config';


/**
 * INITIAL MODULES
 */

// require the first server module
let app = require('./server').default;
// keep track of the current app module as we require updates
let currentApp = app;


/**
 * CREATE INITIAL SERVERS
 */
const servers = {
  server: http.createServer(app),
};


/**
 * UTIL FUNCTION TO START SERVERS
 */
const startServer = (serverToStart: any, port: string | number, serverName: string) => {
  serverToStart.listen(port, (error: Error) => {
    if (error) { signale.error(error); }
    signale.success(`🚀 ${serverName} started`);
  });
};


/**
 * First create DB Connection, then start the server
 */
const bootstrap = async () => {
  try {
    await createConnection(ormConfig);
  } catch (err) {
    signale.fatal(err);
    signale.fatal('Error setting up the database');
    throw err;
  }

  // start server
  startServer(servers.server, process.env.PORT || 3000, 'server');
};


/**
 * HOT RELOADING
 */
const initializeHMR = () => {

  if (module.hot) {
    signale.success('✅  Server-side HMR Enabled!');

    module.hot.accept('./server', () => {
      signale.info('🔁  HMR Reloading `./server`...');

      try {
        app = require('./server').default;
        servers.server.close();
        servers.server = http.createServer(app);
        currentApp = app;
        startServer(servers.server, process.env.PORT || 3000, 'server');
      } catch (error) {
        signale.error(error);
      }

    });
  }
};


/**
 * KICKOFF
 */
(function main() {
  bootstrap().then(initializeHMR);
})();
