<template>
    <div>
        <indo />
    </div>
</template>

<script>
const indo = () => import('../components/Indonesia')

export default {
  name: 'indonesia',

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
    indo
  }
}
</script>
