<template>
  <q-page class=" flex flex-center ">
    <div
      style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(1.5)"
    >
      <xbg />
    </div>
    <div class=" items-center q-pa-xs">
      <q-btn
        color="primary"
        icon="list"
        label="Attendance Report"
        @click="getEmployeesList"
        rounded
        size="xl"
      />
    </div>

    <q-dialog
      transition-show="scale"
      transition-hide="scale"
      full-width
      persistent
      v-model="dialogState"
    >
      <div class="flex flex-center no-shadow">
        <q-card
          transition-show="scale"
          transition-hide="scale"
          class=" column flex flex-center bg-white"
          style="border-radius:40px"
        >
          <q-card-section class="col flex flex-center">
            <q-table
              ref="eTable"
              :pagination="{ rowsPerPage: 0 }"
              hide-pagination
              v-if="employeesList != null"
              :dense="$q.screen.md"
              :grid="$q.screen.lt.md"
              table-header-class="bg-primary text-white "
              title="Employees List"
              title-class="text-center text-primary "
              class=" non-selectable "
              style="border-radius:20px"
              :data="employeesList"
              :columns="columns"
              :row-key="row => row.id"
              @row-click="showRecordDialoge"
              card-class="text-center x-rounded"
            >
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width />
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>

              <template v-slot:body="props">
                <q-tr :props="props">
                  <q-td auto-width>
                    <q-btn
                      v-if="$q.screen.gt.sm"
                      size="sm"
                      color="primary"
                      round
                      dense
                      @click="showRecordExpansion(props)"
                      :icon="props.expand ? 'remove' : 'add'"
                    />
                  </q-td>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.value }}
                  </q-td>
                </q-tr>
                <q-tr v-show="props.expand" :props="props">
                  <q-td style="padding:0" colspan="100%">
                    <q-table
                      :pagination="{ rowsPerPage: 0 }"
                      hide-pagination
                      :dense="$q.screen.md"
                      :grid="$q.screen.lt.md"
                      table-header-class="bg-primary text-white "
                      title="Attendance Record"
                      title-class="text-center text-primary "
                      class=" non-selectable  "
                      :data="clickedRow.attendanceRecord"
                      :columns="attendanceData"
                      :row-key="row => row.id"
                    />
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
          <q-card-actions class="col flex flex-center">
            <q-btn
              flat
              label="close"
              @click="closeDialog"
              v-close-popup
              color="primary"
              class="bg-white"
              style="border-radius:50px"
            />
          </q-card-actions>
        </q-card>
      </div>
    </q-dialog>
    <q-dialog v-model="confirm" v-if="$q.screen.lt.md">
      <q-card class="flex flex-center" style="border-radius:40px">
        <q-card-section>
          <q-table
            :pagination="{ rowsPerPage: 0 }"
            hide-pagination
            :dense="$q.screen.md"
            :grid="$q.screen.lt.md"
            table-header-class="bg-primary text-white "
            title="Attendance Record"
            title-class="text-center text-primary "
            class=" non-selectable flex flex-center"
            :data="clickedRow.attendanceRecord"
            :columns="attendanceData"
            :row-key="row => row.id"
            card-class=" text-center "
            card-style="border-radius:20px"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import xbg from "src/components/xbg.vue";
export default {
  components: { xbg },
  name: "Reports",

  data() {
    return {
      lastProps: {},
      clickedRow: {},
      confirm: false,
      fullScreenMode: false,
      employeesList: [],

      dialogState: false,
      columns: [
        {
          name: "Employee",
          required: true,
          label: "Full Name ",
          align: "left",
          field: row => `${row.firstName} ${row.lastName}`,
          format: val => `${val}`,
          sortable: true
          //headerClasses: "bg-white text-primary",
          // classes: "bg-primary text-white"
        },

        {
          name: "fingerPrintId",
          label: "Fingerprint ID ",
          align: "center",
          field: row => row.fingerPrintId
        },
        {
          name: "attendanceTime",
          label: "Attendance Time ",
          align: "center",
          field: row => row.attendanceTime
        },
        {
          name: "departureTime",
          label: "Departure Time ",
          align: "center",
          field: row => row.departureTime
        },
        {
          name: "attendRecord",
          label: "Attend Record ",
          align: "center",
          field: row =>
            row.attendanceRecord[row.attendanceRecord.length - 1].attendTime,
          sortable: true
        },
        {
          name: "leaveRecord",
          label: "Leave Record ",
          align: "center",
          field: row =>
            row.attendanceRecord[row.attendanceRecord.length - 1].leaveTime,
          sortable: true
        }
      ],
      attendanceData: [
        {
          name: "attendRecord",
          label: "Attend Record ",
          align: "center",
          field: row => row.attendTime,
          sortable: true
        },
        {
          name: "leaveRecord",
          label: "Leave Record ",
          align: "center",
          field: row => row.leaveTime,
          sortable: true
        }
      ]
    };
  },
  created() {
    this.$io.emit("frontend", "Frontend Started");
    this.$io.on("backend", message => console.log(message));
  },
  methods: {
    async getEmployeesList() {
      await this.$axios
        .get("/getEmployee")
        .then(emplyeesData => {
          this.employeesList = [...emplyeesData.data];
          // console.log("this.employeesList", this.employeesList);
        })
        .catch(err => {
          this.$q.notify({
            color: "red-5",
            timeout: 700,
            badgeColor: "secondary",
            textColor: "white",
            icon: "warning",
            message: "Resources are unavailable",
            attrs: {
              style: "border-radius:50px"
            }
          });
          return;
        });

      return (this.dialogState = true);
    },
    closeDialog() {
      return (this.dialogState = false);
    },
    showRecordExpansion(props) {
      props.expand = !props.expand;
      this.lastProps.expand = false;
      this.clickedRow = props.row;
      this.lastProps = props;
      console.log(this.clickedRow.attendanceRecord);
    },
    showRecordDialoge(e, row, index) {
      this.clickedRow = row;
      console.log(this.clickedRow.attendanceRecord);
      return (this.confirm = !this.confirm);
    }
  },
  computed: {}
};
</script>
