<template>
  <div>
    <v-row v-if="!isNull" class="fill-height" align="center" justify="center">
      <v-progress-circular :size="30" color="primary" indeterminate class="mx-auto"></v-progress-circular>
    </v-row>
    <line-chart
      v-else
      style="width: calc(100% - 10px)"
      :chart-data="datacollection"
      :options="options"
    ></line-chart>
  </div>
</template>

<script>
import { Services } from '../services/APIServiceCovid'
import LineChart from '../Script/LineChart'

const api = new Services()

export default {
  props: {
    linedata: {}
  },
  components: {
    LineChart
  },
  data () {
    return {
      isNull: false,
      datacollection: null,
      cartDat: [],
      options: {
        title: {
          display: true,
          text: 'Total Kasus'
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  watch: {
    linedata () {
      this.getHistory(this.linedata)
    }
  },
  mounted () {
    this.getHistory(this.linedata)
  },
  methods: {
    fillData (data) {
      this.datacollection = {
        labels: data[0].label.cases,
        datasets: [
          {
            label: 'Kasus',
            showLine: true,
            fill: false,
            backgroundColor: '#69A7D6',
            borderColor: '#69A7D6',
            pointRadius: 2,
            data: data[0].value.cases
          },
          {
            label: 'Meninggal',
            showLine: true,
            fill: false,
            backgroundColor: '#f87979',
            borderColor: '#f87979',
            pointRadius: 2,
            data: data[0].value.deaths
          }
          // ,
          // {
          //   label: 'Recovered',
          //   showLine: true,
          //   fill: false,
          //   backgroundColor: '#82BF85',
          //   borderColor: '#82BF85',
          //   pointRadius: 2,
          //   data: data[0].value.recovered
          // }
        ]
      }
      this.isNull = true
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    getHistory (data) {
      this.isNull = false
      api.getDataHistoricalCountry(data).then(succ => {
        var db = [
          {
            cases: succ.timeline.cases
          },
          {
            deaths: succ.timeline.deaths
          },
          {
            recovered: succ.timeline.recovered
          }
        ]

        var type = ['cases', 'deaths', 'recovered']
        var labelData = {
          cases: [],
          deaths: [],
          recovered: []
        }
        var valData = {
          cases: [],
          deaths: [],
          recovered: []
        }
        this.cartDat = []

        for (var i in db) {
          for (var j in db[i][type[i]]) {
            labelData[type[i]].push(j)
            valData[type[i]].push(db[i][type[i]][j])
          }
        }
        this.cartDat.push({ label: labelData, value: valData })
        this.fillData(this.cartDat)
      })
    }
  }
}
</script>
