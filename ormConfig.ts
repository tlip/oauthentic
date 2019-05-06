module.exports = {
  type: process.env.DB_TYPE || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  database: process.env.DB_DATABASE || 'oauth',
  synchronize: true,
  logging: true,
  entities: [
    `${__dirname}/**/*.entity.js`,
    
  ],
  migrations: [
    `${__dirname}/**/*.migration.js`,
    
  ],
  subscribers: [
    `${__dirname}/**/*.subscriber.js`,
    
  ],
  cli: {
    entitiesDir: 'src/db/entity',
    migrationsDir: 'src/db/migration',
    subscribersDir: 'src/db/subscriber',
  },
};
