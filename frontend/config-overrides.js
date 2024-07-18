const path = require('path');

module.exports = function override(config, env) {
  // Add source-map-loader ignore configuration
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(oneOf => {
        if (oneOf.loader && oneOf.loader.includes('source-map-loader')) {
          oneOf.exclude = /node_modules/;
        }
      });
    }
  });

  return config;
};
