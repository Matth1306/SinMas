<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header p-0">
        <h4 style="display: inline-block" class="title">Percentage</h4>
        <!-- <p-switch style="display:inline-block;margin-left:10px" v-model="switches"></p-switch> -->
      </div>
      <div class="card-body p-0">
        <div class="p-0">
          <div class="row">
            <div class="col-md-4 dtr-picker">
              <div class="form-group m-0">
                <el-date-picker
                  value-format="timestamp"
                  v-model="form.time"
                  type="datetimerange"
                  range-separator="-"
                  start-placeholder="start"
                  end-placeholder="end"
                  :picker-options="pickerOptions"
                  @change="dummy"
                ></el-date-picker>
              </div>
            </div>
            <div class="col-md-6"></div>
            <div class="col-md-1">
              <el-select
                class="select-primary w-100"
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
                class="m-0 w-100"
                type="info"
                size="sm"
                round
                @click="toExport(result_)"
                >Export</p-button
              >
            </div>
          </div>
        </div>
        <div class="p-0 mt-2">
          <el-table
            :row-class-name="tableRowClassName"
            :cell-style="{ padding: '4px' }"
            :data="queriedData"
            border
          >
            <el-table-column
              min-width="120"
              prop="name"
              label="Name"
              align="left"
            ></el-table-column>
            <el-table-column
              min-width="120"
              prop="timestamp"
              label="Time"
              align="center"
            ></el-table-column>
            <el-table-column
              min-width="120"
              prop="percentage"
              label="Percentage"
              align="right"
            ></el-table-column>
          </el-table>
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
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2/dist/sweetalert2.js";
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
import users from "./users";
import usersMulti from "./usersMulti";
import axios from "axios";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);

var jsonQuery = require("json-query");

const swalWithBootstrapButtons = Swal.mixin({
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
  created() {
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
    this.dummy();
  },
  computed: {
    activeMills() {
      return this.$store.state.mills.active;
    },
    admin() {
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
        filter: {
          mode: "1"
        },
        time: null
      },
      selected: {
        site: "0"
      },
      nameSite: "",
      result_: [],
      titleHolder: "",
      tempPicker: "",
      valueSelect: "",
      getSelect: [
        { value: "PT. Distributor", label: "PT. Distributor" },
        { value: "PT. Distributor A", label: "PT. Distributor A" },
        { value: "PT. Distributor B", label: "PT. Distributor B" },
        { value: "PT. Distributor C", label: "PT. Distributor C" }
      ],
      switches: false,
      listIndustri: [],
      selects: {
        simple: "",
        industri: [
          {
            value: "PT Mitra Mega Intisolusi 1",
            label: "PT Mitra Mega Intisolusi 1"
          },
          {
            value: "PT Mitra Mega Intisolusi 2",
            label: "PT Mitra Mega Intisolusi 2"
          },
          {
            value: "PT Mitra Mega Intisolusi 3",
            label: "PT Mitra Mega Intisolusi 3"
          },
          {
            value: "PT Mitra Mega Intisolusi 4",
            label: "PT Mitra Mega Intisolusi 4"
          },
          {
            value: "PT Mitra Mega Intisolusi 5",
            label: "PT Mitra Mega Intisolusi 5"
          },
          {
            value: "PT Mitra Mega Intisolusi 6",
            label: "PT Mitra Mega Intisolusi 6"
          },
          {
            value: "PT Mitra Mega Intisolusi 7",
            label: "PT Mitra Mega Intisolusi 7"
          },
          {
            value: "PT Mitra Mega Intisolusi 8",
            label: "PT Mitra Mega Intisolusi 8"
          }
        ],
        multiple: "ARS"
      },
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
      tableColumns: [
        {
          prop: "name",
          label: "Name",
          minWidth: 160
        },
        {
          prop: "timestamp",
          label: "Time",
          minWidth: 160
        },
        {
          prop: "pH",
          label: "pH",
          minWidth: 80
        },
        {
          prop: "COD",
          label: "COD",
          minWidth: 90
        },
        {
          prop: "TSS",
          label: "TSS",
          minWidth: 90
        },
        {
          prop: "NH3N",
          label: "NH3N",
          minWidth: 90
        },
        {
          prop: "Debit",
          label: "Debit",
          minWidth: 90
        },
        {
          prop: "bCOD",
          label: "Beban COD",
          minWidth: 90
        },
        {
          prop: "bTSS",
          label: "Beban TSS",
          minWidth: 90
        },
        {
          prop: "bNH3N",
          label: "Beban NH3N",
          minWidth: 90
        }
      ],
      tableColumnsMulti: [
        {
          prop: "id",
          label: "No",
          minWidth: 60
        },
        {
          prop: "time",
          label: "Time",
          minWidth: 160
        },
        {
          prop: "site",
          label: "Site",
          minWidth: 240
        },
        {
          prop: "type",
          label: "Type",
          minWidth: 240
        },
        {
          prop: "ph",
          label: "pH",
          minWidth: 80
        },
        {
          prop: "cod",
          label: "COD",
          minWidth: 90
        },
        {
          prop: "tss",
          label: "TSS",
          minWidth: 90
        },
        {
          prop: "nh3n",
          label: "NH3N",
          minWidth: 90
        },
        {
          prop: "debit",
          label: "Debit",
          minWidth: 90
        },
        {
          prop: "bebancod",
          label: "Beban COD",
          minWidth: 110
        },
        {
          prop: "bebantss",
          label: "Beban TSS",
          minWidth: 100
        }
      ],
      tableData: [],
      tableRawData: [],
      dateTimePicker: null
    };
  },
  watch: {
    activeMills() {
      this.dummy();
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
  methods: {
    momentTS(time) {
      return moment.unix(time).format("YYYY/M/D, hh:mm:ss");
    },
    getMillsName(id) {
      let data = {
        array: this.array.site
      };
      return jsonQuery(`array[value=${id}].label`, { data: data }).value;
    },
    getMillsArray() {
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
    dummy() {
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      let array = [];
      let url = `${this.$store.state.apiURL}error/percentage/${auth._id}?`;
      if (this.form.time) {
        url =
          url +
          `&start=${this.form.time[0] / 1000}&end=${this.form.time[1] / 1000}`;
      }
      if (this.$store.state.mills.active) {
        url = url + `&mils=${this.$store.state.mills.active}`;
      }

      axios.get(url).then(res => {
        const recap = data => {
          let jumlah = 0;
          for (let i = 0; i < data.length; i++) {
            if (i !== 3) jumlah = jumlah + data[i].value;
          }
          const recap = jumlah / 4;
          return `${recap.toFixed(2)} %`;
        };

        for (let index = 0; index < res.data.length; index++) {
          array.push({
            name: res.data[index].milsName,
            timestamp: moment
              .unix(res.data[index].timestamp)
              .format("DD/MM/YYYY HH:mm"),
            percentage: recap(res.data[index].percentage)
          });
        }
      });
      // let mill = ["Mill Alpha", "Mill Bravo", "Mill Charlie", "Mill Delta"];
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
            result.dismiss === Swal.DismissReason.cancel
          ) {
            var tempTableData = [];
            let site = this.getMillsName(this.$store.state.mills.active);
            if (site == "") {
              site = "Semua";
            }
            var dateRange = [
              this.momentTS(arrData[arrData.length - 1].timestamp),
              this.momentTS(arrData[0].timestamp)
            ];
            for (let i = 0; i < arrData.length; i++) {
              var temp = [
                arrData[i].name,
                arrData[i].timestamp,
                arrData[i].percentage
              ];
              tempTableData.push(temp);
            }
            let pdfName =
              "SPARING - Record - Percentage - " + site + " - " + dateRange;
            var doc = new jsPDF({ format: "a4" });
            doc.autoTable({
              head: [
                ["Data SPARING", "", "", "", "", "", "", "", "", "", "", ""]
              ],
              body: [
                ["Waktu export", ":", moment().format("L")],
                ["Jenis data", ":", "Data Per jam"],
                ["Lokasi data", ":", site]
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
              head: [["Name", "Waktu", "Persentase"]],
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
