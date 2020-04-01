<template>
    <div>
      <coungroup />
    </div>
</template>

<script>
const coungroup = () => import('../components/CountryGroup')

export default {
  name: 'countries',

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
    coungroup
  }
}
</script>
