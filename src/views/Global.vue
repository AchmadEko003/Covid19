<template>
    <div>
        <allcountries />
    </div>
</template>

<script>
const allcountries = () => import('../components/AllCountry')

export default {
  name: 'global',

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
    allcountries
  }
}
</script>
