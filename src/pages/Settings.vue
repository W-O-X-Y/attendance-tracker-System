<template>
  <q-page padding class="flex flex-center">
    <!-- <img svg-inline svg-sprite src="../assets/c2.svg" :fill="sfg" /> -->
    <div
      style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(1.5)"
    >
      <simple-svg
        :src="imgURL"
        fill-class-name="cls-3"
        :fill="hex"
        stroke-class-name="cls-3"
        :stroke="hex"
        width="100%"
        height="100%"
        custom-class-name="my-class"
      />
    </div>

    <q-card class="column q-pa-md flex flex-center" style="border-radius:30px">
      <q-card-section>
        <q-badge
          color="primary"
          class="q-py-sm q-px-md x-rounded flex flex-center"
        >
          <div class="flex flex-center">
            <q-icon class="q-mx-xs text-body1" name="settings" color="white" />
            <span class="text-body1"> Settings</span>
          </div>
        </q-badge>
      </q-card-section>
      <q-card-section class="col bg-grey-2 " style="border-radius:20px">
        <q-input
          ref="ipInput"
          input-class="text-center"
          lazy-rules
          :rules="[ip => ip.length > 2, ip => ip !== '', ip => ip != undefined]"
          v-model="ipAddress"
          type="text"
          label="Server IP Address"
        />
      </q-card-section>
      <q-card-section class="column">
        <q-btn
          color="primary"
          icon="palette"
          class="x-rounded q-ma-sm"
          label="Theme Color"
          @click="setColor"
        />
        <q-btn
          color="primary"
          icon="save"
          class="x-rounded q-ma-sm"
          label="Apply"
          v-close-popup
          @click="applySettings"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="colorDialog" class=" flex flex-center" persistent>
      <q-card class="flex flex-center column" style="border-radius:40px">
        <q-card-section class=" flex flex-center">
          <div class="q-pa-sm" style="box-shadow:none;width:250px">
            <q-color
              flat
              v-model="hex"
              default-view="palette"
              :palette="[
                '#019A9D',
                '#D9B801',
                '#3d5afe',
                '#000',
                '#00e676',
                '#ff1744',
                '#546e7a'
              ]"
              class="q-pa-md x-rounded"
              no-header
              @change="NewColor"
            />
          </div>
        </q-card-section>
        <q-card-section class="  q-pa-xs flex flex-center">
          <q-btn
            label="Default"
            color="primary"
            class="q-ma-sm x-rounded "
            @click="primaryColor"
          />
          <q-btn
            label="Confirm"
            color="primary"
            class="q-mx-sm x-rounded "
            @click="colorDialog = !colorDialog"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import io from "socket.io-client";
import { colors } from "quasar";
const { setBrand, getBrand } = colors;
import { ipAddress } from "../boot/startupSettings";
export default {
  name: "Settings",
  data() {
    return {
      imgURL: require("../assets/logo.svg"),

      ipAddress,
      hex: getBrand("primary"),
      colorDialog: false
    };
  },
  methods: {
    setColor() {
      return (this.colorDialog = !this.colorDialog);
    },
    NewColor() {
      setBrand("primary", String(this.hex));
    },
    primaryColor() {
      setBrand("primary", "#546e7a");
      return (this.colorDialog = !this.colorDialog);
    },
    applySettings() {
      this.$q.localStorage.set("themeColor", String(this.hex));

      if (this.ipAddress.length > 2) {
        this.$q.localStorage.set("serverIpAddress", this.ipAddress);
      } else {
        this.$q.localStorage.set("serverIpAddress", "localhost");
      }

      window.location.reload();
    }
  },
  created() {}
};
</script>
