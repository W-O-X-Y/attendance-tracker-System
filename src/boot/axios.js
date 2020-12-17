import Vue from 'vue'
import axios from 'axios'
import {ipAddress} from '../boot/startupSettings'


Vue.prototype.$axios = axios.create({
    baseURL: `http://${ipAddress}:3000`,
    timeout: 1000
})
