<template>
  <app-header />
  <app-main />
  <app-footer />
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppMain from '@/components/AppMain.vue'
import AppFooter from '@/components/AppFooter.vue'


export default {
  name: 'App',

  components: {
    AppHeader,
    AppMain,
    AppFooter
  }

}
</script>

<style>

html, body{
    height: 100%;
    margin: 0;
}

body{
    display: flex;
    flex-direction: column;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
