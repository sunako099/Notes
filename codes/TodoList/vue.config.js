const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,

  
  }
)




const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

configureWebpack: {
	plugins: [new NodePolyfillPlugin()]
}

