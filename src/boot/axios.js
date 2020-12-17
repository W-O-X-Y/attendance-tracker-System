import Vue from 'vue'
import axios from 'axios'
import {ipAddress} from '../boot/startupSettings'


Vue.prototype.$axios = axios.create({
    baseURL: `https://${ipAddress}`,
    timeout: 10000
})
