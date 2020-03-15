const base_fn = require('./webpack.config.base');
const path = require('path');
const paths = require('./paths');

const config = {
  entry: [
    // isEnvDevelopment &&
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ].filter(Boolean),
}

module.exports = (env) => {
  const baseConfig = base_fn(env);
  // const tempConfig = Object.assign({}, baseConfig, config);
  // const mergedConfig = Object.keys(tempConfig).reduce((temp, key) => {
  //   temp[key] = Object.assign({}, baseConfig[key] || {}, config[key] || {});
  // }, {})
  // console.log(mergedConfig)
  return Object.assign({}, baseConfig, config);
}
