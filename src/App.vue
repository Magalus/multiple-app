<template>
  <Navbar />
  <router-view/>
</template>

<script>

import Navbar from '@/components/Navbar/navbar.vue'

export default {
    components: {
        Navbar
    },
}

</script>

<style lang="scss">

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
