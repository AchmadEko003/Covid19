<template>
  <v-app>
    <appbar app />
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const appbar = () => import('./components/AppBars')

export default {
  name: 'App',

  metaInfo: {
    title: 'Covid-19 Meter',
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: 'Covid-19 Live Meter'
      }
    ],
    htmlAttrs: {
      lang: 'en',
      amp: true
    }
  },

  components: {
    appbar
  },

  data: () => ({
    //
  })
}
</script>

<style lang="scss">
.theme--light.v-application {
  background-color: #e3e3e3 !important;
}
</style>
