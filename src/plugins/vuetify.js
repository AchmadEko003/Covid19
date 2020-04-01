import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import Charts from 'chart.js'

Vue.use(Vuetify)
Vue.component(Charts)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#69A7D6',
        secondary: '#b0bec5',
        anchor: '#8c9eff'
      }
    }
  }
})
