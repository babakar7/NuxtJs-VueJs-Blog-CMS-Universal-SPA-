const pkg = require('./package')

module.exports = {

  // universal provides pre rendering capabilities
  mode: 'universal',

  debug: true,

  /*
  ** Headers of the page
    Added to every single page
  */
  head: {
    title:  'VueJs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'VueJs Blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App; like in main.js in regular vue project
  */
  plugins: [

    '~plugins/date-filter.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [,
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',

  ],

  axios: {
  // proxyHeaders: false
},

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    },


  }


}
