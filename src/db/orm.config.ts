import entities from './entity';
import { ConnectionOptions } from 'typeorm';


const ormConfig: ConnectionOptions = {
  // @ts-ignore
  type: <string>process.env.DB_TYPE || 'postgres',
  host: <string>process.env.DB_HOST || 'localhost',
  port: +<string | number>process.env.DB_PORT || 5432,
  username: <string>process.env.DB_USERNAME || 'postgres',
  database: <string>process.env.DB_DATABASE || 'oauth',
  synchronize: true,
  logging: false,
  entities: Object.values(entities),
  migrations: [`${__dirname}/**/*.migration.ts`],
  subscribers: [`${__dirname}/**/*.subscriber.ts`],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
};

export default ormConfig;
