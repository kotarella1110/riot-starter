import webpackMerge from 'webpack-merge';
import commonConfig from './webpack/common.config.js';
import devConfig from './webpack/dev.config.js';
import prodConfig from './webpack/prod.config.js';

export default (env = {}) => {
  let isProd = !!env.production;
  if(isProd) {
    return webpackMerge(commonConfig(env), prodConfig());
  }
  return webpackMerge(commonConfig(env), devConfig());
}