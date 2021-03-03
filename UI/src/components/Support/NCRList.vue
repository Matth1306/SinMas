<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header p-3">
        <h4 style="display: inline-block" class="title my-2">NCR List</h4>
        <div class="row">
          <div class="col-md-4 dtr-picker">
            <div class="form-group">
              <el-date-picker
                value-format="timestamp"
                v-model="form.time"
                type="datetimerange"
                range-separator="-"
                start-placeholder="start"
                end-placeholder="end"
                :picker-options="pickerOptions"
                @change="getArrayNCR"
              ></el-date-picker>
            </div>
          </div>
          <div class="col-md-6"></div>
          <div class="col-md-1">
            <el-select
              class="select-primary"
              v-model="pagination.perPage"
              placeholder="Per page"
            >
              <el-option
                class="select-primary"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <div class="col-md-1 d-flex justify-content-end">
            <p-button
              class="mt-0 w-100"
              type="info"
              size="sm"
              round
              @click="toExport(result_)"
              >Export</p-button
            >
          </div>
        </div>
      </div>
      <div class="card-body px-3">
        <div class="row">
          <div class="col-12">
            <el-table
              :row-class-name="tableRowClassName"
              :cell-style="{ padding: '4px' }"
              :data="queriedData"
              border
            >
              <el-table-column
                min-width="220"
                prop="id"
                label="LK Number"
              ></el-table-column>
              <el-table-column min-width="220" label="Date">
                <template v-slot="{ row }">
                  <span>{{ momentTS(row.date) }}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="220" label="Mill/Unit">
                <template v-slot="{ row }">
                  <span>{{ getNameMills(row.site) }}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="220" prop="status" label="Status">
                <template v-slot="{ row }">
                  <span>{{ row.status === 0 ? "Open" : "Closed" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                min-width="96"
                class-name="action-buttons td-actions"
                align="center"
                label="Menu"
              >
                <template v-slot="{ row }">
                  <p-button type="info" size="sm" icon @click="openData(row)">
                    <i class="nc-icon nc-single-copy-04"></i>
                  </p-button>
                  <template v-if="isAdmin">
                    <p-button
                      v-if="row.status === 0"
                      type="success"
                      size="sm"
                      icon
                      @click="validateHandle(row)"
                    >
                      <i class="nc-icon nc-check-2"></i>
                    </p-button>
                    <p-button
                      v-if="row.status === 1"
                      type="danger"
                      size="sm"
                      icon
                      @click="validateHandle(row)"
                    >
                      <i class="nc-icon nc-simple-remove"></i>
                    </p-button>
                  </template>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="row py-2">
          <div class="col-sm-6 pagination-info">
            <p class="category">Showing {{ from + 1 }} to {{ to }}</p>
          </div>
          <div class="col-sm-6">
            <p-pagination
              class="pull-right"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="pagination.total"
            ></p-pagination>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="popup.show"
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
            <div v-if="popup.state == 0" class="card p-4 bg-danger text-center">
              <div class="card-header p-0">
                <h2>Failed</h2>
              </div>
              <div class="card-body p-0">
                <p>
                  Make sure to fill every input required for registering data.
                </p>
                <p-button
                  class="m-0"
                  type="default"
                  round
                  @click="
                    () => {
                      popup.show = false;
                    }
                  "
                  >Close</p-button
                >
              </div>
            </div>
            <div
              v-if="popup.state == 1"
              class="card p-4 bg-primary text-center"
            >
              <div class="card-header px-4 py-2 text-center">
                <h4 class="m-0">Validation</h4>
              </div>
              <div class="card-body px-4 py-2 text-center">
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select status"
                    v-model="form.validation.temp.status"
                  >
                    <el-option
                      class="select-default"
                      :value="0"
                      label="Open"
                    ></el-option>
                    <el-option
                      class="select-default"
                      :value="1"
                      label="Close"
                    ></el-option>
                  </el-select>
                </fg-input>
                <p-button
                  class="mb-0 mr-3"
                  type="danger"
                  size="md"
                  round
                  @click="
                    () => {
                      popup.show = false;
                    }
                  "
                  >Cancel</p-button
                >
                <p-button
                  class="mb-0"
                  type="default"
                  size="md"
                  round
                  @click="validateData"
                  >Validate</p-button
                >
              </div>
            </div>
            <div v-if="popup.state == 2" class="card p-4 bg-info text-center">
              <div class="card-header p-0">
                <h2>Validating</h2>
              </div>
              <div class="card-body p-0">
                <p>Please wait. Data is being upload.</p>
              </div>
            </div>
            <div
              v-if="popup.state == 3"
              class="card p-4 bg-success text-center"
            >
              <div class="card-header p-0">
                <h2>Success</h2>
              </div>
              <div class="card-body p-0">
                <p>Data is updated. Confirm to close the popup dialog.</p>
                <p-button
                  class="m-0"
                  type="default"
                  round
                  @click="
                    () => {
                      popup.show = false;
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
import PSwitch from "src/components/UIComponents/Switch.vue";
import {
  Table,
  TableColumn,
  Button,
  Select,
  Option,
  Tag,
  Input,
  DatePicker,
  TimeSelect
} from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);

var jsonQuery = require("json-query");

const swalWithBootstrapButtons = swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-info"
  },
  buttonsStyling: false
});

export default {
  components: {
    PPagination,
    [Tag.name]: Tag,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Select.name]: Select,
    [Input.name]: Input,
    PSwitch
  },
  data() {
    return {
      array: {
        site: []
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "1 month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "6 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "12 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      form: {
        validation: {
          data: null,
          id: null,
          temp: {
            status: null
          }
        },
        time: null
      },
      popup: {
        show: false,
        state: 0
      },
      nameSite: "",
      result_: [],
      titleHolder: "",
      tempPicker: "",
      getSelect: [],
      tags: {
        dynamicTags: [],
        inputVisible: false,
        inputValue: ""
      },
      pagination: {
        perPage: 15,
        currentPage: 1,
        perPageOptions: [15, 30, 45, 60],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["name"],
      tableData: [],
      tableRawData: []
    };
  },
  computed: {
    isAdmin() {
      if (
        this.$store.state.auth.data.role === "admin" ||
        this.$store.state.auth.data.role === "adminMils"
      ) {
        return true;
      } else {
        return false;
      }
    },
    isSite() {
      if (this.$store.state.auth.data.associateLogger) {
        return true;
      } else {
        return false;
      }
    },
    activeMills() {
      return this.$store.state.mills.active;
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
        this.result_ = this.tableData;
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      this.result_ = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = this.result_.length;
      return this.result_.slice(this.from, this.to);
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
  watch: {
    activeMills() {
      this.getArrayNCR();
    },
    searchQuery() {
      this.$store.state.listName = this.searchQuery;
      this.$store.getters.findListName;
      if (this.searchQuery === "") {
        this.nameSite = "All Site";
      } else {
        this.nameSite = this.searchQuery;
      }
    },
    titleHolder() {
      this.$store.dispatch("getTitle", { data: this.titleHolder });
    }
  },
  created() {
    // this.dummy(150);
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
    this.getArrayNCR();
  },
  methods: {
    validateData() {
      this.popup.state = 2;
      let data = this.form.validation.data;
      data.status = this.form.validation.temp.status;
      var that = this;
      axios
        .put(
          that.$store.state.apiURL + "ncr/" + that.form.validation.id,
          data,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          // console.log("SUCCESS SUBMIT FORM", response);
          that.popup.state = 3;
          this.getArrayNCR();
        })
        .catch(error => {
          // console.log("FAILURE", error);
          that.popup.state = 0;
        });
    },
    validateHandle(row) {
      // console.log(row);
      var data = JSON.parse(JSON.stringify(row));
      this.form.validation.temp.status = data.status;
      this.form.validation.id = row._id;
      delete data._id;
      delete data.__v;
      this.form.validation.data = data;
      this.popup.state = 1;
      this.popup.show = true;
    },
    openData(row) {
      this.$store.commit("setBusNCRData", row);
      this.$store.commit("setBusNCREntry", false);
      this.$router.push("detail");
    },
    momentTS(time) {
      return moment(time).format("YYYY/M/D");
    },
    getNameMills(id) {
      let data = {
        array: this.array.site
      };
      return jsonQuery(`array[value=${id}].label`, { data: data }).value;
    },
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
          let array = [];
          for (let index = 0; index < data.length; index++) {
            array.push({
              label: data[index].milsName,
              value: data[index]._id
            });
          }
          this.array.site = array;
        });
    },
    getArrayNCR() {
      let url =
        this.$store.state.apiURL +
        "ncr/all/" +
        this.$store.state.auth.data._id +
        "?";

      if (this.form.time) {
        url = url + `&start=${this.form.time[0]}&end=${this.form.time[1]}`;
      }
      if (this.$store.state.mills.active) {
        url = url + `&mils=${this.$store.state.mills.active}`;
      }

      console.log(url);
      axios
        .get(url, {
          headers: { "Content-Type": "application/json" }
        })
        .then(response => {
          // console.log(response);
          this.tableData = response.data;
        });
    },
    dummy(count) {
      let array = [];
      let mill = ["Mill Alpha", "Mill Bravo", "Mill Charlie", "Mill Delta"];
      for (let index = 0; index < count; index++) {
        array.push({
          id: index + "/LK/Sparing/" + mill[index % 4] + "/2021",
          date: "30/12/2021",
          site: mill[index % 4],
          status: "Open"
        });
      }
      this.tableData = array;
    },
    toExport(arrData) {
      swalWithBootstrapButtons
        .fire({
          title: "Do you want to export?",
          text: "Please choose what type of file do you want",
          // icon: "question",
          showCancelButton: true,
          confirmButtonText: "CSV",
          cancelButtonText: "PDF",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += [
              Object.keys(arrData[0]).join(";"),
              ...arrData.map(item => Object.values(item).join(";"))
            ]
              .join("\n")
              .replace(/(^\[)|(\]$)/gm, "");

            const data = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", data);
            link.setAttribute("download", "export.csv");
            link.click();
            swalWithBootstrapButtons.fire(
              "Export  CSV Success",
              "Your CSV file has been exported.",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.cancel
          ) {
            var tempTableData = [];
            let site = this.getNameMills(this.$store.state.mills.active);
            if (site == "") {
              site = "Semua";
            }
            var dateRange = [
              this.momentTS(arrData[arrData.length - 1].timestamp),
              this.momentTS(arrData[0].timestamp)
            ];
            for (let i = 0; i < arrData.length; i++) {
              var temp = [
                arrData[i].id,
                this.momentTS(arrData[i].timestamp),
                this.getNameMills(arrData[i].site),
                arrData[i].status == 0 ? "Open" : "Closed"
              ];
              tempTableData.push(temp);
            }
            let pdfName = "SPARING - NCR - " + site + " - " + dateRange;
            var doc = new jsPDF({ format: "a4" });
            doc.autoTable({
              head: [
                ["Data SPARING", "", "", "", "", "", "", "", "", "", "", ""]
              ],
              body: [
                ["Waktu export", ":", moment().format("L")],
                ["Jenis data", ":", "Daftar NCR"],
                ["Lokasi data", ":", site],
                ["Waktu awal", ":", dateRange[0]],
                ["Waktu akhir", ":", dateRange[1]]
              ],
              headStyles: {
                halign: "left",
                fontSize: 15,
                fillColor: [255, 255, 255],
                textColor: [80, 80, 80]
              },
              alternateRowStyles: {
                halign: "left",
                fillColor: [255, 255, 255],
                textColor: [80, 80, 80]
              }
            });
            doc.autoTable({
              head: [["Nomor LK", "Tanggal", "Mills / Unit", "Status"]],
              theme: "striped",
              body: tempTableData,
              headStyles: {
                fillColor: [51, 127, 143]
              },
              styles: {
                lineWidth: 0.2,
                halign: "center"
              },
              columnStyles: {
                0: { halign: "left" }
              }
            });
            doc.save(`${pdfName}.pdf`);
            doc = new jsPDF({ format: "a4" });
            swalWithBootstrapButtons.fire(
              "Export  PDF Success",
              "Your PDF file has been exported.",
              "success"
            );
          }
        });
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
.cell {
  text-align: center;
  padding: 5px;
}
</style>
<style lang="scss">
.dtr-picker {
  .form-group {
    .el-input__inner {
      border: 2px solid #51cbce;
      border-radius: 20px;
    }
  }
}
</style>
