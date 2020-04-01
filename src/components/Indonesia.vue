<template>
  <v-sheet class="mx-auto pb-5 mt-7 pa-5 px-7" elevation="5" max-width="100%">
        <v-row class="fill-height" align="center" justify="center" no-gutters>
          <v-card elevation="5">
            <v-avatar size="60" tile width="90" class="centering mx-auto">
              <img :src="covCountries.countryInfo.flag" :alt="covCountries.countryInfo.iso3" />
            </v-avatar>
          </v-card>
        </v-row>
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12">
            <p class="mb-0 text-center display-1 font-weight-medium">{{ covCountries.country }}</p>
          </v-col>
          <v-col cols="12" md="3">
            <v-card elevation="0" class="pa-4">
              <p class="text-center display-1 font-weight-bold mb-0" style="color: #69A7D6">
                {{ covCountries.cases }}
                <span
                  class="text-center font-weight-medium subtitle-1"
                  style="color: #69A7D6"
                >(+{{ covCountries.todayCases }})</span>
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
                {{ covCountries.deaths }}
                <span
                  class="text-center font-weight-medium subtitle-1"
                  style="color: #F36A7B"
                >(+{{ covCountries.todayDeaths }})</span>
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
              >{{ covCountries.recovered }}</p>
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
              >{{ covCountries.active }}</p>
              <p
                class="text-center font-weight-regular subtitle-1 mb-1"
                style="color: #4B4B4B"
              >Aktif</p>
            </v-card>
          </v-col>
          <v-col cols="12">
            <linechart :linedata="propData" />
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="12">
            <province />
          </v-col>
        </v-row>
  </v-sheet>
</template>

<script>
import { Services } from '../services/APIServiceCovid'
const linechart = () => import('./DetailChart')
const province = () => import('./Province')

const api = new Services()

export default {
  components: {
    linechart,
    province
  },

  data: () => ({
    model: null,
    active: false,
    covCountries: [],
    propData: {},
    selectData: String
  }),

  watch: {
  },

  mounted () {
    this.getAll()
  },

  methods: {
    getAll () {
      api.getDataCountry('indonesia').then(succ => {
        this.covCountries = succ
        this.propData = 'indonesia'
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
