<template>
  <div class="logs">
    <div class="row">
      <div class="card col-12 p-2">
        <div class="card-header p-3">
          <h5 class="card-title">Parameter Value Logs</h5>
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
        <div class="card-body px-3">
          <div class="row">
            <div class="col-md-12">
              <el-table
                :row-class-name="tableRowClassName"
                :cell-style="{ padding: '5px' }"
                :data="queriedData"
                border
              >
                <el-table-column
                  min-width="96"
                  prop="timestamp"
                  label="TIME"
                  align="center"
                ></el-table-column>
                <el-table-column
                  min-width="192"
                  prop="name"
                  label="SITENAME"
                ></el-table-column>
                <el-table-column
                  min-width="480"
                  prop="message"
                  label="ACTIVITY"
                ></el-table-column>

                <el-table-column
                  min-width="64"
                  class-name="action-buttons td-actions"
                  align="center"
                  label="Actions"
                >
                  <template slot-scope="props">
                    <p-button
                      type="info"
                      size="sm"
                      icon
                      @click="handleToStats(props.$index, props.row)"
                    >
                      <i class="nc-icon nc-chart-bar-32"></i>
                    </p-button>
                    <p-button
                      type="success"
                      size="sm"
                      icon
                      @click="handleToRecords(props.$index, props.row)"
                    >
                      <i class="nc-icon nc-single-copy-04"></i>
                    </p-button>
                  </template>
                </el-table-column>
              </el-table>
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
      </div>
      <!-- <div class="col-xl-6 col-lg-12 col-md-12 col-sm-12" v-if="false">
        <time-line>
          <time-line-item
            class="timeline-inverted"
            badgeType="danger"
            badgeIcon="nc-icon nc-single-copy-04"
          >
            <badge slot="header" type="danger">Some title</badge>
            <p
              slot="content"
            >Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my family We just had fun with the “future” theme !!! It was a fun night all together ...</p>
          </time-line-item>

          <time-line-item
            class="timeline-inverted"
            badgeType="success"
            badgeIcon="nc-icon nc-sun-fog-29"
          >
            <badge slot="header" type="success">Another Title</badge>
            <p
              slot="content"
            >Thank God for the support of my wife and real friends. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I love you Ellen and also my number one design rule of anything I do from shoes to music to homes is that Kim has to like it....</p>
          </time-line-item>

          <time-line-item class="timeline-inverted" badgeType="info" badgeIcon="nc-icon nc-world-2">
            <badge slot="header" type="info">Another Title</badge>
            <div slot="content">
              <p>Called I Miss the Old Kanye That’s all it was Kanye And I love you like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown LA 11:10PM</p>
              <hr />
            </div>
          </time-line-item>

          <time-line-item
            class="timeline-inverted"
            badgeType="warning"
            badgeIcon="nc-icon nc-istanbul"
          >
            <badge slot="header" type="warning">Another Title</badge>
            <p
              slot="content"
            >Tune into Big Boy's 92.3 I'm about to play the first single from Cruel Winter Tune into Big Boy's 92.3 I'm about to play the first single from Cruel Winter also to Kim’s hair and makeup Lorraine jewelry and the whole style squad at Balmain and the Yeezy team.</p>
          </time-line-item>
        </time-line>
      </div>-->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2/dist/sweetalert2.js";
import PPagination from "src/components/UIComponents/Pagination.vue";
import { TimeLine, TimeLineItem, Badge } from "src/components/UIComponents";
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
import PSwitch from "src/components/UIComponents/Switch.vue";
import axios from "axios";

var jsonQuery = require("json-query");

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-info"
  },
  buttonsStyling: false
});

Vue.use(Table);
Vue.use(TableColumn);
export default {
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
    }
  },
  computed: {
    activeMills() {
      return this.$store.state.mills.active;
    },
    pagedData() {
      return this.tableData.slice(this.from, this.to);
    },
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
  components: {
    PPagination,
    [Tag.name]: Tag,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Select.name]: Select,
    TimeLine,
    TimeLineItem,
    Badge
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
        time: null
      },
      selected: {
        site: "0"
      },
      nameSite: "",
      result_: [],
      dateTimePicker: null,
      tableData: [],
      pagination: {
        perPage: 15,
        currentPage: 1,
        perPageOptions: [15, 30, 45, 60],
        total: 0
      },
      searchQuery: "",
      titleHolder: "",
      getSelect: [
        { value: "PT. Distributor", label: "PT. Distributor" },
        { value: "PT. Distributor A", label: "PT. Distributor A" },
        { value: "PT. Distributor B", label: "PT. Distributor B" },
        { value: "PT. Distributor C", label: "PT. Distributor C" }
      ],
      propsToSearch: ["name"]
    };
  },
  methods: {
    dummy() {
      let array = [];
      // let mill = ["Mill Alpha", "Mill Bravo", "Mill Charlie", "Mill Delta"];
      // let data = ["pH", "COD", "TSS", "Debit"];
      // for (let index = 0; index < count; index++) {
      //   array.push({
      //     name: mill[index % 4],
      //     timestamp: "30/12/2021, 23:58",
      //     message:
      //       "Parameter " +
      //       data[Math.floor(Math.random() * 5)] +
      //       " tidak sesuai ambang batas normal!",
      //   });
      // }
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      let url = `${this.$store.state.apiURL}error/raw/${auth._id}?`;
      if (this.form.time) {
        url =
          url +
          `&start=${this.form.time[0] / 1000}&end=${this.form.time[1] / 1000}`;
      }
      if (this.$store.state.mills.active) {
        url = url + `&mils=${this.$store.state.mills.active}`;
      }
      axios.get(url).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          array.push({
            name: res.data[i].milsName,
            timestamp: moment
              .unix(res.data[i].timestamp)
              .format("DD/MM/YYYY HH:mm"),
            message: res.data[i].errorMsg
          });
        }
      });
      this.tableData = array;
    },

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
                arrData[i].message
              ];
              tempTableData.push(temp);
            }
            let pdfName = "SPARING - Error Logs - " + site + " - " + dateRange;
            var doc = new jsPDF({ format: "a4" });
            doc.autoTable({
              head: [
                ["Data SPARING", "", "", "", "", "", "", "", "", "", "", ""]
              ],
              body: [
                ["Waktu export", ":", moment().format("L")],
                ["Jenis data", ":", "Error Logs"],
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
              head: [["Name", "Waktu", "Pesan"]],
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
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "table-secondary";
      }
      return "";
    },
    handleToStats(row, data) {
      this.$store.state.listName = data.name;
      this.$store.getters.findListName;

      this.$router.push("/dashboard/stats");
    },
    handleToRecords(row, data) {
      this.$store.state.listName = data.name;
      this.$store.getters.findListName;
      this.$router.push("/records");
    }
  },
  beforeMount() {
    this.$store.dispatch("removeDroplistCek");
    this.$store.commit("showTitle");
  }
};
</script>
<style lang="scss" scoped>
.btn-activity {
  background-color: rgb(78, 78, 78);
  border: none;
  border-radius: 3px;
  border-width: 2px;
  box-shadow: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.35em;
  margin: 10px 1px;
  padding: 5px 15px;
  text-transform: capitalize;
}
.btn-activity:hover {
  background-color: rgb(255, 153, 153);
  color: white;
}
</style>
<style lang="scss">
.logs {
  .el-table {
    tr {
      th:nth-child(2) {
        & > div {
          text-align: left;
        }
      }
      th:nth-child(3) {
        & > div {
          text-align: left;
        }
      }
      td:nth-child(2) {
        & > div {
          text-align: left;
        }
      }
      td:nth-child(3) {
        & > div {
          text-align: left;
        }
      }
    }
  }
}
</style>
