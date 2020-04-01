import axios from 'axios'

const API_URL = 'https://corona.lmao.ninja'
const API_URLVER2 = 'https://corona.lmao.ninja/v2'
const API_URL2 = 'https://api.kawalcorona.com'

export class Services {
  getDataGlobal () {
    // https://corona.lmao.ninja
    const url = `${API_URL}/all`
    const data = axios.get(url).then(response => response.data)
    return data
  }

  getDataAllCountry () {
    // https://corona.lmao.ninja/countries
    const url = `${API_URL}/countries`
    const data = axios.get(url).then(response => response.data)
    return data
  }

  getDataCountry (countryName) {
    // https://corona.lmao.ninja/countries/{params}
    const url = `${API_URL}/countries/` + countryName
    const data = axios.get(url).then(response => response.data)
    return data
  }

  getDataHistorical () {
    // https://corona.lmao.ninja/v2/historical
    const url = `${API_URLVER2}/historical`
    const data = axios.get(url).then(response => response.data)
    return data
  }

  getDataHistoricalCountry (countryName) {
    // https://corona.lmao.ninja/v2/historical/{params}
    const url = `${API_URLVER2}/historical/` + countryName
    const data = axios.get(url).then(response => response.data)
    return data
  }

  getDataMap () {
    // https://corona.lmao.ninja/jhucsse
    const url = `${API_URLVER2}/jhucsse`
    const data = axios.get(url).then(response => response.data)
    return data
  }

  getIndonesiaProvince () {
    // https://corona.lmao.ninja/indonesia/provinsi
    const url = `${API_URL2}/indonesia/provinsi/`
    const data = axios.get(url).then(response => response.data)
    return data
  }
}
