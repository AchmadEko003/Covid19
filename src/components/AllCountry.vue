<template>
  <div>
    <v-card elevation="5">
      <v-card-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          outlined
          dense
          filled
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="covid"
        :search="search"
        :items-per-page="193"
        :hide-default-footer="true"
        :loading="isLoad"
      >
      <template v-slot:item.country="{ item }">
        <p class="mb-0 font-weight-bold">{{ item.country }}</p>
      </template>
      <template v-slot:item.todayCases="{ item }">
        <p v-if="item.todayCases != ''" class="mb-0 font-weight-bold" style="color:#69A7D6">+{{ item.todayCases }}</p>
      </template>
      <template v-slot:item.todayDeaths="{ item }">
        <p v-if="item.todayDeaths != ''" class="mb-0 font-weight-bold" style="color:#F36A7B">+{{ item.todayDeaths }}</p>
      </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { Services } from '../services/APIServiceCovid'
import { GlobalScript } from '../Script/GlobalScript'

const api = new Services()
const format = new GlobalScript()

export default {
  data () {
    return {
      isLoad: true,
      search: '',
      headers: [
        {
          text: 'Negara',
          align: 'start',
          value: 'country'
        },
        { text: 'Kasus', value: 'cases' },
        { text: 'Kasus Harian', value: 'todayCases' },
        { text: 'Meninggal', value: 'deaths' },
        { text: 'Meninggal Harian', value: 'todayDeaths' },
        { text: 'Sembuh', value: 'recovered' },
        { text: 'Aktif', value: 'active' },
        { text: 'Kritis', value: 'critical' },
        { text: 'Total Tes', value: 'tests' }
      ],
      covid: []
    }
  },

  mounted () {
    this.getAll()
  },

  methods: {
    getAll () {
      api.getDataAllCountry().then(succ => {
        for (var a = 0; a < succ.length; a++) {
          succ[a].cases = format.numberFormatting(succ[a].cases)

          if (succ[a].todayCases === 0) {
            succ[a].todayCases = ''
          } else {
            succ[a].todayCases = format.numberFormatting(succ[a].todayCases)
          }

          if (succ[a].deaths === 0) {
            succ[a].deaths = ''
          } else {
            succ[a].deaths = format.numberFormatting(succ[a].deaths)
          }

          if (succ[a].todayDeaths === 0) {
            succ[a].todayDeaths = ''
          } else {
            succ[a].todayDeaths = format.numberFormatting(succ[a].todayDeaths)
          }

          if (succ[a].recovered === 0) {
            succ[a].recovered = ''
          } else {
            succ[a].recovered = format.numberFormatting(succ[a].recovered)
          }

          if (succ[a].active === 0) {
            succ[a].active = ''
          } else {
            succ[a].active = format.numberFormatting(succ[a].active)
          }

          if (succ[a].critical === 0) {
            succ[a].critical = ''
          } else {
            succ[a].critical = format.numberFormatting(succ[a].critical)
          }

          if (succ[a].tests === 0) {
            succ[a].tests = ''
          } else {
            succ[a].tests = format.numberFormatting(succ[a].tests)
          }
        }
        this.covid = succ
        this.isLoad = false
      }).catch(this.isLoad = false)
    }
  }
}
</script>
