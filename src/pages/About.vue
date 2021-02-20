<template>
  <q-page padding class="items-center flex flex-center ">
    <div
      style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(1)"
    >
      <xbg />
    </div>
    <q-card class=" column flex flex-center x-rounded q-pa-xs">
      <q-card-section class="col flex flex-center  q-q-ma-xs">
        <xbg />
      </q-card-section>
      <q-card-section
        class=" column flex flex-center text-center text-h5 text-primary q-ma-xs"
      >
        <span class="col text-primary text-italic text-center text-h6">
          Created By:</span
        >
        <br />

        <div class="col">
          <q-badge
            class="q-px-md q-py-sm q-ma-xs text-h6 x-rounded"
            label="Ibrahim Muhammad Abdallah"
          />
        <br />
        <span class="col text-primary text-italic text-center text-h6">
          © All Rights Reserved 2020</span
        >
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import xbg from "src/components/xbg.vue";
export default {
  components: { xbg },
  name: "About",
  data() {
    return {};
  }
};
</script>
