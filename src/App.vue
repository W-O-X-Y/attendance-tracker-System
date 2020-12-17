<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { colors } from "quasar";
const { setBrand } = colors;
// import Vue from "vue";
// import { SimpleSVG } from "vue-simple-svg";
// Vue.component("simple-svg", SimpleSVG);
export default {
  name: "App",
  mounted() {
    // let color = this.$q.localStorage.getItem("themeColor");
    // color === null
    //   ? setBrand("primary", "#65778c")
    //   : setBrand("primary", String(color));
    // console.log("AutoStartSettings");
  }
};
</script>
