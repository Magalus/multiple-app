<template>
  <div id="nav">
    <router-link to="/quiz">Quiz</router-link>
    <router-link to="/meteo">Météo</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Jost,Arial,Helvetica,sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    padding: 30px;
    width: 100%;
    height: 25px;
    position: absolute;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: white;
  margin: 0px 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
