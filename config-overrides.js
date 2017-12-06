const rewireMobX = require('react-app-rewire-mobx');
const {injectBabelPlugin} = require('react-app-rewired');
module.exports = function override(config, env) {
  config = rewireMobX(config,env);
  return config;
}