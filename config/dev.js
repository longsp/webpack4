module.exports = {
  // 运行时的config
  runtimeConfig: {
    experimentalFeatures: {
      foo: true,
      bar: true
    },

    thirdPartyApiKey: 'abcdefg123456'
  },

  publicPath: '/assets/',

  serve: {
    port: 8080
  }
}
