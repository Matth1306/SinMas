<template>
  <div class="admin-site">
    <div class="row">
      <div class="col-md-12 card p-3">
        <div class="card-header row align-items-center px-0 py-2">
          <div class="col-11 d-flex flex-column justify-content-center">
            <h4 class="m-0">Mill</h4>
          </div>
          <div
            v-if="$store.state.auth.data.role === 'superAdmin'"
            class="col-1"
          >
            <p-button
              class="w-100 m-0"
              type="info"
              size="md"
              @click="createData"
              round
              >New</p-button
            >
          </div>
        </div>
        <div class="card-body row p-0">
          <div class="col-sm-12 mt-2">
            <el-table
              :row-class-name="tableRowClassName"
              :cell-style="{ padding: '4px' }"
              :data="queriedData"
              border
            >
              <el-table-column min-width="320" label="Mill" align="left">
                <template v-slot="{ row }">
                  <span>{{ row.milsName }}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120" label="pH" align="center">
                <template v-slot="{ row }">
                  <span>{{ row.range[0].min + " - " + row.range[0].max }}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120" label="COD" align="center">
                <template v-slot="{ row }">
                  <span>{{ row.range[1].max }}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120" label="TSS" align="center">
                <template v-slot="{ row }">
                  <span>{{ row.range[2].max }}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="120" label="Debit" align="center">
                <template v-slot="{ row }">
                  <span>{{ row.range[4].max }}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-if="$store.state.auth.data.role === 'superAdmin'"
                min-width="60"
                class-name="action-buttons td-actions"
                align="center"
                label="Actions"
              >
                <template v-slot="{ row }">
                  <p-button type="info" size="sm" icon @click="editData(row)">
                    <i class="nc-icon nc-settings"></i>
                  </p-button>
                  <p-button
                    type="danger"
                    size="sm"
                    icon
                    @click="deleteData(row)"
                  >
                    <i class="nc-icon nc-simple-remove"></i>
                  </p-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="popup.active"
      class="position-fixed vw-100 vh-100 d-flex align-items-center"
      style="
        background-color: rgba(0, 0, 0, 0.2);
        top: 0px;
        left: 0px;
        z-index: 1000;
      "
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div
              v-if="popup.state <= 1"
              class="card border-info"
              style="border: 0.5px solid"
            >
              <div class="card-header p-4">
                <div class="row align-items-center">
                  <div class="col-6">
                    <h4 class="m-0">Mill Form</h4>
                  </div>
                  <div class="col-6 d-flex justify-content-end">
                    <p-button
                      class="m-0 mr-3"
                      type="danger"
                      size="md"
                      @click="
                        () => {
                          popup.active = false;
                        }
                      "
                      round
                      >Cancel</p-button
                    >
                    <p-button
                      class="m-0"
                      type="info"
                      size="md"
                      @click="saveDataHandle"
                      round
                      >Save</p-button
                    >
                  </div>
                </div>
              </div>
              <div class="card-body p-4">
                <div class="row">
                  <div class="col-12">
                    <fg-input
                      v-model="form.milsName"
                      label="Mill"
                      placeholder="Mill Name"
                    ></fg-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <fg-input
                      v-model="form.range[0].min"
                      label="pH minimal"
                      placeholder="pH minimal"
                    ></fg-input>
                  </div>
                  <div class="col-6">
                    <fg-input
                      v-model="form.range[0].max"
                      label="pH maximal"
                      placeholder="pH maximal"
                    ></fg-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <fg-input
                      v-model="form.range[1].max"
                      label="COD maximal"
                      placeholder="COD maximal"
                    ></fg-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <fg-input
                      v-model="form.range[2].max"
                      label="TSS maximal"
                      placeholder="TSS maximal"
                    ></fg-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12">
                    <fg-input
                      v-model="form.range[4].max"
                      label="Debit maximal"
                      placeholder="Debit maximal"
                    ></fg-input>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6">
                    <fg-input
                      v-model="form.latlong.lat"
                      label="Latitude"
                      placeholder="Latitude"
                    ></fg-input>
                  </div>
                  <div class="col-6">
                    <fg-input
                      v-model="form.latlong.lng"
                      label="Longitude"
                      placeholder="Longitude"
                    ></fg-input>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="popup.state == 2" class="card p-4 text-center">
              <div class="card-header p-0">
                <h2>Delete Data</h2>
              </div>
              <div class="card-body p-0">
                <p>Confirm to delete data.</p>
                <p-button
                  class="mx-2 my-0"
                  type="default"
                  round
                  @click="
                    () => {
                      popup.active = false;
                    }
                  "
                  >Cancel</p-button
                >
                <p-button
                  class="mx-2 my-0"
                  type="danger"
                  round
                  @click="deleteDataHandle"
                  >Delete</p-button
                >
              </div>
            </div>
            <div v-if="popup.state == 3" class="card p-4 bg-info text-center">
              <div class="card-header p-0">
                <h2>Submiting</h2>
              </div>
              <div class="card-body p-0">
                <p>Please wait while the request is being handled.</p>
              </div>
            </div>
            <div
              v-if="popup.state == 4"
              class="card p-4 bg-success text-center"
            >
              <div class="card-header p-0">
                <h2>Success</h2>
              </div>
              <div class="card-body p-0">
                <p>Request handle is complete. Confirm to continue.</p>
                <p-button
                  class="mx-2 my-0"
                  type="default"
                  round
                  @click="
                    () => {
                      popup.active = false;
                    }
                  "
                  >Confirm</p-button
                >
              </div>
            </div>
            <div v-if="popup.state == 5" class="card p-4 bg-danger text-center">
              <div class="card-header p-0">
                <h2>Failed</h2>
              </div>
              <div class="card-body p-0">
                <p>Request handle is failed. Confirm to close.</p>
                <p-button
                  class="mx-2 my-0"
                  type="default"
                  round
                  @click="
                    () => {
                      popup.active = false;
                    }
                  "
                  >Confirm</p-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
// import FileInput from "./FileInput";
import {
  Table,
  TableColumn,
  Select,
  Option,
  Tag,
  Input,
  DatePicker,
  TimeSelect,
  Button,
  Upload
} from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import users from "./users";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-info"
  },
  buttonsStyling: false
});
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  components: {
    PPagination,
    [Tag.name]: Tag,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Select.name]: Select,
    [Input.name]: Input
  },
  data() {
    return {
      popup: {
        active: false,
        state: 0
      },
      form: {
        range: [
          { name: "pH", min: 0, max: 0 },
          { name: "COD", min: 0, max: 0 },
          { name: "TSS", min: 0, max: 0 },
          { name: "NH3N", min: 0, max: 0 },
          { name: "Debit", min: 0, max: 0 }
        ],
        milsName: "",
        latlong: { lat: 0, lng: 0 }
      },
      modelValidations: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          min: 5
        },
        confirmPassword: {
          required: true,
          confirmed: "password"
        },
        compName: {
          required: true
        },
        compAddress: {
          required: true
        },
        compTlp: {
          required: true
        }
      },
      pagination: {
        perPage: 15,
        currentPage: 1,
        perPageOptions: [15, 30, 45, 60],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["name", "email"],
      tableData: [],
      dateTimePicker: ""
    };
  },
  computed: {
    isAdminShow() {
      return this.$store.getters.isAdmin;
    },
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      let result = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      this.pagination.total = this.tableData.length;
      return this.tableData.length;
    }
  },
  created() {
    // this.dummy(4);
    if (
      this.$store.state.auth.data.role === "admin" ||
      this.$store.state.auth.data.role === "superAdmin"
    ) {
      this.$store.commit("setIsTopNavbarSelectAll", true);
      this.$store.commit("setMillsActive", "");
      this.$store.commit("setIsTopNavbarSelect", true);
    } else {
      this.$store.commit(
        "setMillsActive",
        this.$store.state.auth.data.associateLogger
      );
      this.$store.commit("setIsTopNavbarSelect", false);
    }
    this.getArrayMills();
  },
  methods: {
    getArrayMills() {
      axios
        .get(
          this.$store.state.apiURL +
            "logger/list/" +
            this.$store.state.auth.data._id
        )
        .then(response => {
          // console.log(response.data);
          let data = response.data;
          this.tableData = data;
        });
    },
    saveDataHandle() {
      if (this.popup.state == 0) {
        this.createDataHandle();
      } else {
        this.editDataHandle();
      }
    },
    createDataHandle() {
      this.popup.state = 3;
      const data = this.form;
      const url = this.$store.state.apiURL + "logger/";
      axios
        .post(url, data, {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          console.log("POST:", data, response);
          this.popup.state = 4;
          this.getArrayMills();
        })
        .catch(error => {
          console.log("POST:", data, error);
          this.popup.state = 5;
        });
    },
    createData() {
      console.log("executing: createData()");
      this.form = {
        range: [
          { name: "pH", min: 0, max: 0 },
          { name: "COD", min: 0, max: 0 },
          { name: "TSS", min: 0, max: 0 },
          { name: "NH3N", min: 0, max: 0 },
          { name: "Debit", min: 0, max: 0 }
        ],
        milsName: null,
        latlong: { lat: 0, lng: 0 }
      };
      this.popup.state = 0;
      this.popup.active = true;
    },
    editDataHandle() {
      this.popup.state = 3;
      const data = this.form;
      const url = this.$store.state.apiURL + "logger/" + data._id;
      axios
        .put(url, data, {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          console.log("PUT:", data, response);
          this.popup.state = 4;
          this.getArrayMills();
        })
        .catch(error => {
          console.log("PUT:", data, error);
          this.popup.state = 5;
        });
    },
    editData(data) {
      console.log("executing: editData(data)");
      this.form = data;
      this.popup.state = 1;
      this.popup.active = true;
    },
    deleteDataHandle() {
      this.popup.state = 3;
      const data = this.form;
      const url = this.$store.state.apiURL + "logger/" + data._id;
      axios
        .delete(url, {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          console.log("DELETE:", data, response);
          this.popup.state = 4;
          this.getArrayMills();
        })
        .catch(error => {
          console.log("DELETE:", data, error);
          this.popup.state = 5;
        });
    },
    deleteData(data) {
      console.log("executing: deleteData(data)");
      this.form = data;
      this.popup.state = 2;
      this.popup.active = true;
    },
    dummy(count) {
      let array = [];
      let mill = ["Mill Alpha", "Mill Bravo", "Mill Charlie", "Mill Delta"];
      for (let index = 0; index < count; index++) {
        array.push({
          name: mill[index % 4],
          timestamp: "30/12/2021",
          ph: "6 - 8",
          cod: 100,
          tss: 100,
          nh3n: 100,
          debit: 100
        });
      }
      this.tableData = array;
    },
    toExport(arrData) {
      swalWithBootstrapButtons
        .fire({
          title: "Delete",
          text: "Do you want to delete?",
          // icon: "question",
          showCancelButton: true,
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          reverseButtons: true
        })
        .then(result => {});
    },
    loadRes() {
      this.listRes = "";
      this.formSite.associateRole[2] = "";
      axios
        .get(
          "http://103.126.226.54:4000/api/users/reg-list/" +
            this.formSite.associateRole[1],
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listRes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    filesChange(files) {
      this.inputs.file = files;
    },
    addForm() {
      this.stateForm = true;
      axios
        .get(
          "http://103.126.226.54:4000/api/users/reg-list/5e77b6d37b48030fbcfc216b",
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listDist = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm() {
      axios
        .post("http://103.126.226.54:4000/api/users/register", this.formSite)
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/list/" +
                this.$store.state.userId +
                "/sites",
              {
                headers: { token: this.$store.state.tokenId }
              }
            )
            .then(response => {
              this.tableData = response.data;
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(error);
        });

      this.stateForm = false;
    },
    closeForm() {
      this.stateForm = false;
    },
    handleClose(tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.tags.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.tags.inputValue;
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue);
      }
      this.tags.inputVisible = false;
      this.tags.inputValue = "";
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "table-secondary";
      }
      return "";
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table .td-actions {
  button.btn {
    margin-right: 5px;
  }
}
.card-form-container {
  position: absolute;
  width: 100%;
  z-index: 10;
  .form {
    box-shadow: 0 0 20px -2px rgba(0, 0, 0, 0.15);
    display: block;
    left: 50%;
    margin: auto;
    position: absolute;
    text-align: left;
    top: 4rem;
    transform: translateX(-50%);
    width: 60%;
    .card-header {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .card-footer {
      text-align: right;
    }
  }
}
</style>
<style lang="scss">
.admin-site {
  .cell {
    text-align: inherit;
    vertical-align: top;
    word-break: normal;
  }
}
</style>
