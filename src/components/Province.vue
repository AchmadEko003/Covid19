<template>
  <div>
    <v-card elevation="0">
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
        :items-per-page="150"
        :hide-default-footer="true"
        :loading="isLoad"
         loading-text="Loading... Please wait"
      >
      <template v-slot:item.attributes.Provinsi="{ item }">
        <p class="mb-0 font-weight-bold">{{ item.attributes.Provinsi }}</p>
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
          text: 'Provinsi',
          align: 'start',
          value: 'attributes.Provinsi'
        },
        { text: 'Kasus', value: 'attributes.Kasus_Posi' },
        { text: 'Meninggal', value: 'attributes.Kasus_Meni' },
        { text: 'Sembuh', value: 'attributes.Kasus_Semb' }
      ],
      covid: []
    }
  },

  mounted () {
    this.getAll()
  },

  methods: {
    getAll () {
      api.getIndonesiaProvince().then(succ => {
        for (var a = 0; a < succ.length; a++) {
          succ[a].attributes.Kasus_Posi = format.numberFormatting(succ[a].attributes.Kasus_Posi)
          succ[a].attributes.Kasus_Meni = format.numberFormatting(succ[a].attributes.Kasus_Meni)
          succ[a].attributes.Kasus_Semb = format.numberFormatting(succ[a].attributes.Kasus_Semb)
        }
        this.covid = succ
        this.isLoad = false
      }).catch(this.isLoad = false)
    }
  }
}
</script>
