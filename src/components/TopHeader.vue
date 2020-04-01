<template>
  <div class="home">
    <v-card color="white" elevation="5">
      <div style="height: 490px; width: 100%">
        <l-map :zoom="zoom" :center="center" :options="{zoomControl: false}" style="height: 100%; width: 100%">
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-control-zoom position="bottomright"></l-control-zoom>
          <l-circle
            v-for="(item, i) in covData"
            @click="focusZone(item.center)"
            :key="i"
            :lat-lng="item.center"
            :radius="item.radius"
            color="#F36A7B"
          >
            <l-popup :content="item.content" />
          </l-circle>
        </l-map>
      </div>
    </v-card>
  </div>
</template>

<script>
import { Services } from '../services/APIServiceCovid'
import { LMap, LTileLayer, LCircle, LPopup, LControlZoom } from 'vue2-leaflet'
import { latLng } from 'leaflet'

const apiService = new Services()

export default {
  name: 'Home',

  components: {
    LMap,
    LTileLayer,
    LCircle,
    LPopup,
    LControlZoom
  },

  data () {
    return {
      covData: [],
      zoom: 4,
      center: [-0.5629361, 104.8908514],
      circle: {
        center: latLng(47.41322, -1.0482),
        radius: 100000,
        content: ''
      },
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Data source <a href="https://github.com/NovelCOVID/API">NovelCOVID</a>'
    }
  },

  mounted () {
    this.getApi()
  },

  methods: {
    // getApi () {
    //   apiService.getDataAllCountry().then(succ => {
    //     var data = {}
    //     let content = ''
    //     for (var a = 0; a < succ.length; a++) {
    //       if (succ[a].province != null) {
    //         content = succ[a].country + ' (' + succ[a].province + '): ' + succ[a].cases
    //       } else {
    //         content = succ[a].country + ': ' + succ[a].cases
    //       }

    //       var latlong = latLng(succ[a].countryInfo.lat, succ[a].countryInfo.long)

    //       if (succ[a].country === 'USA') {
    //         latlong = latLng(40.246517, -101.4901277)
    //       }

    //       data = {
    //         center: latlong,
    //         radius: 1000,
    //         content: content
    //       }
    //       this.covData.push(data)
    //     }
    //   })
    // },
    getApi () {
      apiService.getDataMap().then(succ => {
        var data = {}
        let content = ''
        for (var a = 0; a < succ.length; a++) {
          if (succ[a].province != null) {
            content = succ[a].country + ' (' + succ[a].province + '): ' + succ[a].stats.confirmed
          } else {
            content = succ[a].country + ': ' + succ[a].stats.confirmed
          }

          let radius = 1000

          if (succ[a].stats.confirmed > 50000) {
            radius = 150000
          } else if (succ[a].stats.confirmed > 17000 && succ[a].stats.confirmed < 50001) {
            radius = 100000
          } else if (succ[a].stats.confirmed > 3000 && succ[a].stats.confirmed < 17001) {
            radius = 80000
          } else if (succ[a].stats.confirmed > 1600 && succ[a].stats.confirmed < 3001) {
            radius = 50000
          } else if (succ[a].stats.confirmed > 400 && succ[a].stats.confirmed < 1601) {
            radius = 30000
          } else if (succ[a].stats.confirmed > 200 && succ[a].stats.confirmed < 401) {
            radius = 20000
          } else if (succ[a].stats.confirmed > 100 && succ[a].stats.confirmed < 201) {
            radius = 10000
          } else if (succ[a].stats.confirmed > 50 && succ[a].stats.confirmed < 101) {
            radius = 5000
          } else if (succ[a].stats.confirmed < 51) {
            radius = 1000
          }

          data = {
            center: latLng(succ[a].coordinates.latitude, succ[a].coordinates.longitude),
            radius: radius,
            content: content
          }
          this.covData.push(data)
        }
      })
    },
    focusZone (latlong) {
      this.center = [latlong.lat, latlong.lng]
    },
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick () {
      alert('Click!')
    }
  }
}
</script>
