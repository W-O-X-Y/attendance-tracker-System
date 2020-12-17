import Vue from 'vue'
import xbg from '../components/xbg'
Vue.component('xbg',xbg)

import { colors,LocalStorage } from "quasar";
const { setBrand } = colors;
const { getItem } = LocalStorage
let themeColor,ipAddress='localhost';
try {
    themeColor  = getItem("themeColor")  || "#65778c";
     setBrand("primary",themeColor); 
    ipAddress = getItem("serverIpAddress") || "localhost"
    console.log("Startup Settings Loaded",ipAddress)
    
}
catch { console.log("Startup Settings Error")}

export { themeColor,ipAddress }

    
   