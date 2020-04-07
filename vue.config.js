module.exports = {
  transpileDependencies: [
    'vuetify'
  ],

  // baseUrl: process.env.NODE_ENV === 'production'
  //   ? 'https://covid19.madko.id/'
  //   : '/',

  productionSourceMap: false,

  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  }
}
