<template>
  <div class="home fill-height">
    <v-row no-gutters>
      <v-col cols="12" md="9" class="mb-7">
        <headers />
      </v-col>
      <v-col cols="12" md="3" class="mb-7">
        <subheaders />
      </v-col>
      <v-col cols="12">
        <v-card elevation="5">
        <v-tabs centered background-color="transparent">
          <v-tab to="/">Indonesia</v-tab>
          <v-tab to="/countries">Negara</v-tab>
          <v-tab to="/all">Semua Data</v-tab>
        </v-tabs>
        </v-card>
        <v-divider class="mb-5"></v-divider>
        <router-view></router-view>
      </v-col>
    </v-row>
  </div>
</template>

<script>
const headers = () => import('../components/TopHeader')
const subheaders = () => import('../components/SubHeader')

export default {
  name: 'home',

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
    headers,
    subheaders
  }
}
</script>
