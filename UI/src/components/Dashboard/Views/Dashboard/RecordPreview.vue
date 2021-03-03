<template>
  <div class="record-preview">
    <div class="full-page-background"></div>
    <mista-loading v-if="isLoading"></mista-loading>
    <div v-else class="container">
      <div class="row">
        <div class="col">
          <p-button
            class="w-100"
            type="info"
            size="md"
            round
            @click="toExport(result_)"
            >Export</p-button
          >
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="card">
            <div id="page" style="padding: 36px 36px 36px 72px">
              <div class="card-header p-0">
                <h4 class="title">Listed Data</h4>
              </div>
              <div class="card-body p-0">
                <div class="p-0 mt-2">
                  <el-table
                    :row-class-name="tableRowClassName"
                    :cell-style="{ padding: '4px' }"
                    :data="tableData"
                    border
                  >
                    <el-table-column
                      min-width="120"
                      prop="site"
                      label="Name"
                      align="left"
                    ></el-table-column>
                    <el-table-column
                      min-width="120"
                      label="Time"
                      align="center"
                    >
                      <template v-slot="{ row }">
                        <span>{{ momentTS(row.timestamp) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="72" label="pH" align="center">
                      <template v-slot="{ row }">
                        <span>{{ row.ph.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="72" label="COD" align="center">
                      <template v-slot="{ row }">
                        <span>{{ row.cod.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="72" label="TSS" align="center">
                      <template v-slot="{ row }">
                        <span>{{ row.tss.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="72"
                      label="Debit"
                      align="center"
                    >
                      <template v-slot="{ row }">
                        <span>{{ row.debit.toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="100"
                      label="Beban COD"
                      align="center"
                    >
                      <template v-slot="{ row }">
                        <span>{{ (row.cod * row.debit).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      min-width="100"
                      prop="btss"
                      label="Beban TSS"
                      align="center"
                    >
                      <template v-slot="{ row }">
                        <span>{{ (row.tss * row.debit).toFixed(2) }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
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
import MistaLoading from "src/components/UIComponents/Loading.vue";
import moment from "moment";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2PDF from "jspdf-html2canvas";
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
  TimeSelect,
} from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import users from "./users";
import usersMulti from "./usersMulti";
import axios from "axios";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-info",
  },
  buttonsStyling: false,
});

const jsPDFHTML2Canvas = {};

export default {
  components: {
    PPagination,
    [Tag.name]: Tag,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Select.name]: Select,
    [Input.name]: Input,
    PSwitch,
    MistaLoading,
  },
  data() {
    return {
      isLoading: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "1 month",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "3 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "6 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "12 months",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      form: {
        time: null,
      },
      nameSite: "",
      result_: [],
      titleHolder: "",
      tempPicker: "",
      valueSelect: "",
      getSelect: [],
      switches: false,
      tags: {
        dynamicTags: [],
        inputVisible: false,
        inputValue: "",
      },
      pagination: {
        perPage: 15,
        currentPage: 1,
        perPageOptions: [15, 30, 45, 60],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["name"],
      tableData: [],
      tableRawData: [],
      dateTimePicker: null,
    };
  },
  computed: {
    admin() {
      return this.$store.getters.isAdmin;
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
      this.result_ = this.tableData.filter((row) => {
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
    },
  },
  watch: {
    activeMills(newActive, oldActive) {
      this.getArrayRecord(newActive, this.form.time);
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
    },
  },
  created() {
    // this.dummy(150);
    this.getAuthLocal();
    this.initPage(this.$store.state.userId);
  },
  methods: {
    exportPDF() {
      let page = document.getElementById("page");
      html2PDF(page, {
        jsPDF: {
          unit: "px",
          format: "a4",
        },
        html2canvas: {
          imageTimeout: 15000,
          logging: true,
          useCORS: false,
        },
        imageType: "image/jpeg",
        imageQuality: 1,
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        output: "SPARING.pdf",
        init: function () {},
        success: function (pdf) {
          pdf.save(this.output);
        },
      });
    },
    initPage(id) {
      if (id === this.$store.state.auth.admin) {
        this.$store.commit("setIsTopNavbarSelectAll", true);
        this.$store.commit("setMillsActive", "");
        this.$store.commit("setIsTopNavbarSelect", true);
      } else {
        this.$store.commit("setIsTopNavbarSelectAll", true);
        this.$store.commit("setMillsActive", "");
        this.$store.commit("setIsTopNavbarSelect", false);
      }
      this.getArrayRecord();
    },
    getAuthLocal() {
      var auth = JSON.parse(localStorage.getItem("auth-data"));
      this.$store.commit("setAuthData", auth);
    },
    momentTS(time) {
      return moment(time).format("YYYY/M/D, hh:mm:ss");
    },
    getArrayRecord(site, timeframe) {
      axios
        .get(
          this.$store.state.apiURL + "records/hour/5ff6c5ca6b3a059e91c85a52",
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response);
          let data = response.data;
          let array = [];
          for (let index = 0; index < data.length; index++) {
            array.push({
              site: data[index].milsName,
              timestamp: data[index].timestamp,
              ph: data[index].dataParam[0].value,
              cod: data[index].dataParam[1].value,
              tss: data[index].dataParam[2].value,
              debit: data[index].dataParam[4].value,
            });
          }
          this.tableData = array;
          this.isLoading = false;
        });
    },
    dummy(count) {
      let array = [];
      let mill = ["Mill Alpha", "Mill Bravo", "Mill Charlie", "Mill Delta"];
      for (let index = 0; index < count; index++) {
        array.push({
          site: mill[index % 4],
          timestamp: "30/12/2021, 23:58",
          ph: (Math.random() * 2 + 6).toFixed(2),
          cod: (Math.random() * 120).toFixed(2),
          tss: (Math.random() * 120).toFixed(2),
          debit: (Math.random() * 120).toFixed(2),
          bcod: (Math.random() * 120).toFixed(2),
          btss: (Math.random() * 120).toFixed(2),
        });
      }
      this.tableData = array;
    },
    toExport(arrData) {
      swalWithBootstrapButtons
        .fire({
          title: "Export Data",
          text: "Please choose what type of file do you want",
          // icon: "question",
          showCancelButton: true,
          confirmButtonText: "CSV",
          cancelButtonText: "PDF",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.value) {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += [
              Object.keys(arrData[0]).join(";"),
              ...arrData.map((item) => Object.values(item).join(";")),
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

            var dateRange =
              arrData[arrData.length - 1].timestamp +
              " - " +
              arrData[0].timestamp;
            for (let i = 0; i < arrData.length; i++) {
              var temp = [
                arrData[i].name,
                arrData[i].timestamp,
                arrData[i].pH,
                arrData[i].COD,
                arrData[i].TSS,
                arrData[i].NH3N,
                arrData[i].Debit,
              ];
              tempTableData.push(temp);
            }
            let pdfName = "export";
            var doc = new jsPDF({ format: "a4" });
            doc.autoTable({
              head: [["Data List " + this.nameSite]],
              body: [
                [
                  "Print Date: " +
                    moment().format("L") +
                    ", Date Range: " +
                    dateRange,
                ],
              ],
              headStyles: {
                halign: "center",
                fontSize: 15,
                fillColor: [255, 255, 255],
                textColor: [80, 80, 80],
              },
              alternateRowStyles: {
                halign: "center",
                fillColor: [255, 255, 255],
                textColor: [80, 80, 80],
              },
            });
            doc.autoTable({
              head: [["Name", "Time", "PH", "COD", "TSS", "NH3N", "Debit"]],
              theme: "striped",
              body: tempTableData,
              headStyles: {
                fillColor: [51, 127, 143],
              },
              styles: {
                lineWidth: 0.2,
                halign: "center",
              },
            });
            doc.save("export.pdf");
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
    },
  },
};
</script>
<style lang="scss" scoped>
.record-preview {
  .full-page-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: gray;
  }
}
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
