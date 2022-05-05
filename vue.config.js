const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      filename: `js/[name].${+new Date()}.js`,
      chunkFilename: `js/[name].${+new Date()}.js`,
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  productionSourceMap: false,
});
