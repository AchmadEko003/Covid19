<template>
  <v-sheet class="mx-auto pb-5" elevation="0" color="transparent" max-width="100%">
    <v-slide-group v-model="model" show-arrows center-active>
      <v-slide-item v-for="(item, n) in covCountries" :key="n" v-slot:default="{ active, toggle }">
        <v-card
          :color="active ? '#69A7D6' : 'white'"
          class="mx-4 my-4"
          height="100"
          width="200"
          elevation="5"
          @click="toggle"
        >
          <v-row v-if="!active" class="fill-height" align="center" justify="center">
            <v-col cols="12">
              <p class="text-center font-weight-medium subtitle-1 mb-0">{{ item.country }}</p>
              <p class="text-center font-weight-bold headline mb-0">
                {{ item.cases }}
                <span
                  class="text-center font-weight-medium subtitle-1"
                  style="color: #F36A7B"
                >(+{{ item.todayCases }})</span>
              </p>
            </v-col>
          </v-row>
          <v-row v-if="active" class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" color="white" class="mt-7 pa-5 px-7" elevation="5">
        <v-row class="fill-height" align="center" justify="center" no-gutters>
          <v-card elevation="5">
            <v-avatar size="60" tile width="90" class="centering mx-auto">
              <img :src="selectData.countryInfo.flag" :alt="selectData.countryInfo.iso3" />
            </v-avatar>
          </v-card>
        </v-row>
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12">
            <p class="mb-0 text-center display-1 font-weight-medium">{{ selectData.country }}</p>
          </v-col>
          <v-col cols="12" md="3">
            <v-card elevation="0" class="pa-4">
              <p class="text-center display-1 font-weight-bold mb-0" style="color: #69A7D6">
                {{ selectData.cases }}
                <span
                  class="text-center font-weight-medium subtitle-1"
                  style="color: #69A7D6"
                >(+{{ selectData.todayCases }})</span>
              </p>
              <p
                class="text-center font-weight-regular subtitle-1 mb-1"
                style="color: #69A7D6"
              >Total Kasus</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card elevation="0" class="pa-4">
              <p class="text-center display-1 font-weight-bold mb-0" style="color: #F36A7B">
                {{ selectData.deaths }}
                <span
                  class="text-center font-weight-medium subtitle-1"
                  style="color: #F36A7B"
                >(+{{ selectData.todayDeaths }})</span>
              </p>
              <p
                class="text-center font-weight-regular subtitle-1 mb-1"
                style="color: #F36A7B"
              >Total Meninggal</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card elevation="0" class="pa-4">
              <p
                class="text-center display-1 font-weight-bold mb-0"
                style="color: #82BF85"
              >{{ selectData.recovered }}</p>
              <p
                class="text-center font-weight-regular subtitle-1 mb-1"
                style="color: #82BF85"
              >Sembuh</p>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card elevation="0" class="pa-4">
              <p
                class="text-center display-1 font-weight-bold mb-0"
                style="color: #4B4B4B"
              >{{ selectData.active }}</p>
              <p
                class="text-center font-weight-regular subtitle-1 mb-1"
                style="color: #4B4B4B"
              >Aktif</p>
            </v-card>
          </v-col>
          <v-col cols="12">
            <linechart :linedata="propData" />
          </v-col>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>

<script>
import { Services } from '../services/APIServiceCovid'
const linechart = () => import('./DetailChart')

const api = new Services()

export default {
  components: {
    linechart
  },

  data: () => ({
    model: null,
    active: false,
    covCountries: [],
    propData: String,
    selectData: String
  }),

  watch: {
    model () {
      this.propData = this.covCountries[this.model].country
      this.selectData = this.covCountries[this.model]
    }
  },

  mounted () {
    this.getAll()
  },

  methods: {
    getAll () {
      api.getDataAllCountry().then(succ => {
        this.covCountries = succ
      })
    },
    getHistory () {
      api
        .getDataHistoricalCountry(this.covCountries[this.model].country)
        .then(succ => {
          this.propData = succ
        })
    }
  }
}
</script>

<style lang="scss">
.centering {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
