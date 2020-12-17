<template>
  <q-page padding class="flex flex-center ">
    <!-- content -->
    <div
      style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(1.5)"
    >
      <xbg />
    </div>

    <q-dialog
      v-model="persistent"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card
        class="q-pa-md q-ma-md flex flex-center "
        style="border-radius:40px"
      >
        <div class="column">
          <div class="col text-center">
            <q-card-section>
              <q-badge
                class="q-px-md text-20 q-py-sm x-rounded text-body1 "
                label=" Employee Data Form"
              />
            </q-card-section>
          </div>

          <q-card-section class="flex flex-center col">
            <q-form
              ref="manageForm"
              class="q-ma-sd-pa-sm"
              @submit="onSubmit"
              :action="apiEndpoint"
              method="POST"
            >
              <q-input
                ref="fingerPrintIdInput"
                name="fingerPrintId"
                rounded
                :disable="disableInput"
                outlined
                color="primary"
                type="number"
                v-model="fingerPrintId"
                label="fingerprint ID *"
                :rules="[
                  fingerPrintId =>
                    fingerPrintId !== null ||
                    'Please type employee fingerprint ID',
                  fingerPrintId =>
                    (fingerPrintId >= 1 && fingerPrintId <= 127) ||
                    'Please type employee fingerprint ID',
                  fingerPrintId => fingerPrintId !== ''
                ]"
              >
                <template v-slot:append>
                  <q-btn
                    color="primary"
                    icon="fingerprint"
                    class="x-rounded"
                    label="get ID"
                    style="min-width:4px"
                    @click="enrollFingerPrint"
                  />
                </template>
              </q-input>

              <q-input
                :disable="disableInput"
                rounded
                outlined
                name="fullName"
                v-model="fullName"
                label="Employee Name (First & Last names) *"
                lazy-rules
                :rules="[
                  name =>
                    (name &&
                      name.length > 0 &&
                      name.includes(' ') &&
                      name[name.length - 1] !== ' ' &&
                      name[0] !== ' ') ||
                    'Please type the fullname'
                ]"
              />

              <div>
                <div class="column ">
                  <q-input
                    name="attendTime"
                    rounded
                    outlined
                    label="Attend Time"
                    v-model="attendTime"
                    :rules="['attendTime']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="attendTime"
                            mask="hh:mm A"
                            class="x-rounded"
                          >
                            <div class="row items-center justify-center">
                              <q-btn
                                v-close-popup
                                label="Close"
                                class="x-rounded"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <q-input
                    name="leaveTime"
                    rounded
                    outlined
                    label="Leave Time"
                    v-model="leaveTime"
                    :rules="['leaveTime']"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="leaveTime"
                            mask="hh:mm A"
                            class="x-rounded"
                          >
                            <div class="row items-center justify-center">
                              <q-btn
                                v-close-popup
                                label="Close"
                                class="x-rounded"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>

              <div class="flex flex-center">
                <q-btn
                  color="primary"
                  icon="add"
                  label="create"
                  class="q-ma-sm"
                  style="border-radius:50px"
                  type="submit"
                />

                <q-btn
                  color="primary"
                  icon="delete"
                  label="Delete"
                  class="q-ma-sm"
                  style="border-radius:50px"
                  @click="onDelete"
                />
                <q-btn
                  color="primary"
                  icon="update"
                  label="update"
                  @mouseenter="updateState"
                  @mouseleave="updateState"
                  class="q-ma-sm"
                  style="border-radius:50px"
                  @click="onUpdate"
                />
              </div>
            </q-form>
          </q-card-section>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import xbg from "src/components/xbg.vue";
import { QSpinnerGears } from "quasar";
export default {
  components: { xbg },
  name: "ManageEmployee",
  data() {
    return {
      apiEndpoint: "/enroll",
      fullName: "FirstName LastName",
      fingerPrintId: "1",
      employeeName: "",
      attendTime: "08:00 AM",
      leaveTime: "03:30 PM",
      persistent: true,
      submitResult: "",
      disableInput: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.manageForm.validate().then(success => {
        if (success) {
          // this.$q.notify({
          //   color: "green-4",
          //   textColor: "white",
          //   icon: "done",
          //   message: "Submitted",
          //   attrs: {
          //     style: "border-radius:50px"
          //   }
          // });

          const formData = new FormData(evt.target);
          const submitResult = [];
          for (const [name, value] of formData.entries()) {
            submitResult.push({
              name,
              value
            });
          }
          //console.log(submitResult);
          this.submitResult = submitResult;
          this.$axios.post(this.apiEndpoint, submitResult);
        } else {
          this.$q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "Invalid Information",
            attrs: {
              style: "border-radius:50px"
            }
          });
        }
      });
      setTimeout(() => {
        window.location.reload();
      }, 800);
    },
    onUpdate() {
      this.$axios
        .put(`${this.apiEndpoint}/${this.fingerPrintId}`, {
          attendTime: this.attendTime,
          leaveTime: this.leaveTime
        })
        .then(res => {
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "done",
            message: "Updated Successfully",
            attrs: {
              style: "border-radius:50px"
            }
          });
        });
    },
    onDelete() {
      // console.log("deleted");
      this.$axios
        .delete(`${this.apiEndpoint}/${this.fingerPrintId}`)
        .then(res => {
          this.$q.notify({
            color: "positive",
            textColor: "white",
            icon: "done",
            message: "Deleted Successfully",
            attrs: {
              style: "border-radius:50px"
            }
          });
        });
    },
    enrollFingerPrint() {
      this.$io.emit("enrollFingerPrint", this.fingerPrintId);
      //  console.log("Enroll ID Pressed");
    },
    updateState() {
      return (this.disable = !this.disable);
    }
  },
  created() {
    this.$io.emit("enrollFingerPrint", "E");
    this.$io.on("fingerPrint", data => {
      this.employeeName = data;
    });
    this.$io.on("serialData", data => {
      // console.log(data);
      const note = {
        spinner: data.state[0] !== "!" ? false : QSpinnerGears,

        type: data.state[0] !== "!" ? "positive" : "negative",
        textColor: "white",
        timeout: 500,
        badgeColor: "deep-orange-13",
        badgeClass: "x-rounded text-center",

        message: data.state,
        attrs: {
          style: "border-radius:50px"
        }
      };
      this.$q.notify(note);
    });
  }
};
</script>
<style lang="sass">
div.q-menu.q-position-engine.scroll
  background: none
  box-shadow: none
</style>
