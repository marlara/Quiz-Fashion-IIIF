<template>
  <footer>
    <p>Copyright &copy; {{ year }} </p>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  setup () {
    const year = computed(() => new Date().getFullYear())
    return { year }
  }
}
</script>

<style scoped>
footer{
    flex-shrink: 0;
    display: flex;
    background-color: black;
    color: white;
    padding-top: 5px;
}

</style>