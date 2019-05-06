const glob = require('glob');
const path = require('path');

module.exports = config => ({

  output: Object.assign({}, config.output, ({
    filename: '[name].js',
    libraryTarget: 'umd',
  })),

  entry: {
    server: './src/index.ts',
    ...(glob.sync(path.resolve('src/db/migration/*.ts')) || []).reduce((entries, filename) => {
      const migrationName = path.basename(filename, '.ts');
      return Object.assign({}, entries, {
        [migrationName]: filename,
      });
    }, {}),
    ...(glob.sync(path.resolve('src/db/entity/*.ts')) || []).reduce((entries, filename) => {
      const entityName = path.basename(filename, '.ts');
      return Object.assign({}, entries, {
        [entityName]: filename,
      });
    }, {}),
  },

  optimization: {
    minimize: false,
  },

});
