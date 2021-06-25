const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

/* config-overrides.js */
module.exports = function (config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': resolve('src'),
    '@views': resolve('src/views')
  };

  return config;
}