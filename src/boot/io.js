// import something here
import Vue from 'vue'
import io from 'socket.io-client'
import {ipAddress} from '../boot/startupSettings'
// "async" is optional;


Vue.prototype.$io = io(`https://${ipAddress}:3000`)
 
