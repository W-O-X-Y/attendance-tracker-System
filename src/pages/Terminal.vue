<template>
  <q-page class="flex flex-center ">
    <div
      style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(1.5)"
    >
      <xbg />
    </div>
    <div class="column items-center">
      <div class="q-ma-sm col">
        <q-card
          class="q  x-rounded"
          style=" max-width:70vw; min-width: 100px;width: 400px"
        >
          <q-card-section class="col flex flex-center q-ma-sm">
            <xbg />
          </q-card-section>
          <q-card-section class="flex flex-center">
            <q-badge
              color="primary"
              :label="employeeInfo"
              class="non-selectable x-rounded q-pa-sm"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="q-ma-sm col">
        <q-card class="column q-pa-xs flex flex-center x-rounded">
          <q-card-section class=" q-pa-xs flex flex-center">
            <lottie
              :options="defaultOptions"
              @animCreated="controlAnimation"
              @complete="reverseAnimation"
              :height="150"
              :width="150"
            />
          </q-card-section>
          <q-card-section class=" q-pa-xs  flex flex-center">
            <q-badge
              class="q-pa-sm non-selectable x-rounded"
              label="Scan Your Finger !"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import Lottie from "../components/lottie";
import * as animationData from "../assets/BT.json";
import xbg from "src/components/xbg.vue";

export default {
  name: "Terminal",
  components: { Lottie, xbg },
  data() {
    return {
      defaultOptions: { animationData: animationData.default },

      employeeInfo: "Employee Info"
    };
  },
  created() {
    this.$io.emit("readFingerPrint", "R");
    this.$io.on("fingerPrintFound", data => {
      data != undefined
        ? (this.employeeInfo = `WELCOME: ${data.firstName} ${data.lastName} 😍`)
        : (this.employeeInfo = "No Matching Fingerprient");
      this.$q.notify({
        color: "primary",
        timeout: 500,
        badgeColor: "deep-orange-13",
        badgeClass: "x-rounded text-center",
        textColor: "white",
        icon: "alarm",
        message: data.attendRecord,
        attrs: {
          style: "border-radius:50px"
        }
      });
    });
  },

  methods: {
    controlAnimation: function(anim) {
      this.anim = anim;
      this.anim.addEventListener("complete", () => console.log("complete"));
    },
    // stop: function() {
    //   this.anim.stop();
    // },
    // play: function() {
    //   this.anim.play();
    // },
    // pause: function() {
    //   this.anim.pause();
    // },
    // onSpeedChange: function() {
    //   this.anim.setSpeed(this.animationSpeed);
    // },
    reverseAnimation() {
      this.anim.setDirection(-1);
    }
  }
};
</script>
