const base_fn = require('./webpack.config.base');
const path = require('path');
const paths = require('./paths');
const modules = require('./modules');

const config = {
  entry: [
    // isEnvDevelopment &&
    require.resolve('react-dev-utils/webpackHotDevClient'),
    paths.appIndexJs,
  ].filter(Boolean),
  // resolve: {
  //   alias: {
  //     'react-dom$': 'react-dom/profiling',
  //     'scheduler/tracing': 'scheduler/tracing-profiling',
  //     "@": path.resolve(__dirname, '../src'),
  //     "components": path.resolve(__dirname, '../src/components'),
  //     "pages": path.resolve(__dirname, '../src/pages'),
  //     "utils": path.resolve(__dirname, '../src/utils'),
  //   }
  // }
}

module.exports = (env) => {
  const baseConfig = base_fn(env);
  const tempConfig = Object.assign({}, baseConfig, config);
  // const mergedConfig = Object.keys(tempConfig).reduce((temp, key) => {
  //   temp[key] = Object.assign({}, baseConfig[key] || {}, config[key]);
  //   return temp;
  // }, {});
  // return Object.assign({}, baseConfig, config);
  // console.log(deepAssign({}, baseConfig, config))
  // debugger
  // return deepAssign({}, baseConfig, config);
  return Object.assign({}, baseConfig, config);
}
