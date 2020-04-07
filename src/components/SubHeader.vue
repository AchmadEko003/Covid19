<template>
  <div v-resize="onResize">
    <v-row no-gutters :class="rowClass" justify="center" align="center">
      <v-col cols="12" class="py-3 pt-0">
        <v-card elevation="5" class="pa-4">
          <v-skeleton-loader
          v-if="isLoad"
            ref="skeleton"
            type="text"
            class="mx-auto"
          ></v-skeleton-loader>
          <p
            class="text-center display-1 font-weight-bold mb-0"
            style="color: #69A7D6"
          >{{ covData.cases }}</p>
          <p
            class="text-center font-weight-regular subtitle-1 mb-1"
            style="color: #69A7D6"
          >Total Kasus</p>
        </v-card>
      </v-col>
      <v-col cols="12" class="py-3">
        <v-card elevation="5" class="pa-4">
          <v-skeleton-loader
          v-if="isLoad"
            ref="skeleton"
            type="text"
            class="mx-auto"
          ></v-skeleton-loader>
          <p
            class="text-center display-1 font-weight-bold mb-0"
            style="color: #F36A7B"
          >{{ covData.deaths }}</p>
          <p class="text-center font-weight-regular subtitle-1 mb-1" style="color: #F36A7B">Meninggal</p>
        </v-card>
      </v-col>
      <v-col cols="12" class="py-3">
        <v-card elevation="5" class="pa-4">
          <v-skeleton-loader
          v-if="isLoad"
            ref="skeleton"
            type="text"
            class="mx-auto"
          ></v-skeleton-loader>
          <p
            class="text-center display-1 font-weight-bold mb-0"
            style="color: #82bf85"
          >{{ covData.recovered }}</p>
          <p
            class="text-center font-weight-regular subtitle-1 mb-1"
            style="color: #82bf85"
          >Sembuh</p>
        </v-card>
      </v-col>
      <v-col cols="12" class="py-3 pb-0">
        <v-card elevation="5" class="pa-4">
          <v-skeleton-loader
          v-if="isLoad"
            ref="skeleton"
            type="text"
            class="mx-auto"
          ></v-skeleton-loader>
          <p
            class="text-center display-1 font-weight-bold mb-0"
            style="color: #4B4B4B"
          >{{ activeCoc }}</p>
          <p
            class="text-center font-weight-regular subtitle-1 mb-1"
            style="color: #4B4B4B"
          >Kasus Aktif</p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Services } from '../services/APIServiceCovid'
import { GlobalScript } from '../Script/GlobalScript'

const api = new Services()
const format = new GlobalScript()

export default {
  name: 'sub-header',

  data () {
    return {
      isLoad: true,
      rowClass: 'pl-4',
      windowSize: {
        x: 0,
        y: 0
      },
      covData: [],
      activeCoc: ''
    }
  },

  mounted () {
    this.onResize()
    this.getAll()
  },

  methods: {
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      if (window.innerWidth < 960) {
        this.rowClass = 'pl-0'
      } else {
        this.rowClass = 'pl-4'
      }
    },
    getAll () {
      api.getDataGlobal().then(succ => {
        var active = succ.cases - (succ.deaths + succ.recovered)
        succ.cases = format.numberFormatting(succ.cases)
        succ.deaths = format.numberFormatting(succ.deaths)
        succ.recovered = format.numberFormatting(succ.recovered)
        this.covData = succ
        this.activeCoc = format.numberFormatting(active)
        this.isLoad = false
      })
    }
  }
}
</script>
