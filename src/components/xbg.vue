<template>
  <simple-svg
    :src="imgURL"
    fill-class-name="cls-3"
    :fill="themeColor"
    stroke-class-name="cls-3 "
    :stroke="themeColor"
    width="100%"
    height="100%"
    custom-class-name="my-class"
  />
</template>

<script>
import Vue from "vue";
import { SimpleSVG } from "vue-simple-svg";
Vue.component("simple-svg", SimpleSVG);

import { themeColor } from "../boot/startupSettings";
export default {
  name: "xbg",
  data() {
    return { imgURL: require("../assets/logo.svg"), themeColor };
  }
};
</script>
