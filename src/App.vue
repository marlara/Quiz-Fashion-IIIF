<template>
  <app-header />
  <app-main /> <!-- you can use transitions to change the main content, see how it works! https://vueschool.io/lessons/route-transitions -->
  <app-footer />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppMain from '@/components/AppMain.vue'
import AppFooter from '@/components/AppFooter.vue'
import('@/assets/main.css');

export default {
  name: 'App',

  components: {
    AppHeader,
    AppMain,
    AppFooter
  }

}
</script>

