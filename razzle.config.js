const typeOrmPlugin = require('./config/plugins/razzle.typeorm');

module.exports = {
  plugins: [
    { name: 'typescript', options: { useBabel: true } },
  ],

  modify: (config, { target, dev }) => {
    const modifications = [];

    modifications.push(typeOrmPlugin(config));
    
    return Object.assign({}, config, ...modifications);
  },
};
