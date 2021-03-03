<template>
  <div class="dashboard-overview">
    <div
      v-if="isNotification"
      class="notification-container position-absolute d-flex align-items-center"
      style="z-index: 10; width: calc(100% - 32px); height: calc(100vh - 96px)"
    >
      <div class="container">
        <div class="card">
          <div class="card-header p-4" style="background-color: #ff9999">
            <div class="row">
              <div class="col-3">
                <p-button
                  @click="get2MinsData"
                  :class="
                    true
                      ? 'bg-secondary border-0 mr-3'
                      : 'bg-black border-0 mr-3'
                  "
                  >2 Minutes</p-button
                >
                <p-button
                  @click="get1HourData"
                  :class="false ? 'bg-black border-0' : 'bg-secondary border-0'"
                  >1 Hour</p-button
                >
              </div>
              <div
                class="col-6 d-flex align-items-center justify-content-center"
              >
                <div class="row justify-content-center align-items-center">
                  <span
                    class="icon bg-white rounded-circle d-flex flex-column align-items-center justify-content-center"
                  >
                    <span
                      class="part-1 bg-danger rounded d-inline-block"
                    ></span>
                    <span
                      class="part-2 bg-danger rounded d-inline-block"
                    ></span>
                  </span>
                  <h2 class="text-default mb-0 ml-4">Error Logs</h2>
                </div>
              </div>
              <div class="col-3"></div>
            </div>
          </div>
          <div class="card-body px-4 py-0" style="background-color: #ff9999">
            <div class="rounded overflow-hidden">
              <el-table :data="errorData" row-key="id">
                <el-table-column
                  v-if="true"
                  label="Mill"
                  prop="milsName"
                  align="left"
                  min-width="120"
                  sortable
                ></el-table-column>
                <el-table-column
                  label="Time"
                  prop="timestamp"
                  min-width="120"
                  align="center"
                  sortable
                ></el-table-column>
                <el-table-column
                  label="Message"
                  prop="errorMsg"
                  min-width="320"
                  align="left"
                  sortable
                ></el-table-column>
              </el-table>
            </div>
          </div>
          <div class="card-footer p-4" style="background-color: #ff9999">
            <div class="row">
              <div class="col text-right">
                <p-button
                  @click="$router.push('/logs')"
                  class="bg-white text-primary border-0 mr-3"
                  >Open Error Logs</p-button
                >

                <p-button
                  class="bg-primary border-0"
                  @click="isNotification = false"
                  >Close</p-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mista-loading v-if="isLoading"></mista-loading>
    <div v-if="!isLoading">
      <div class="row">
        <div
          class="col-3"
          v-for="(stats, index) in statsCards"
          :key="stats.title"
        >
          <stats-card
            :type="stats.type"
            :icon="stats.icon"
            :small-title="stats.title"
            :avg="stats.avg"
            :min="stats.min"
            :max="stats.max"
          >
            <div slot="footer">
              <div class="row align-items-center">
                <div class="col-7">
                  <a
                    @click="
                      row2 = { index, key: stats.key };
                      dummy(row2);
                      titleParam = stats.title;
                      tempRange = [stats.min, stats.max];
                    "
                    style="cursor: pointer"
                    >{{ stats.title }} Details</a
                  >
                </div>
                <div
                  class="col-5 p-0 d-flex flex-column justify-content-around"
                >
                  <div class="row">
                    <div class="col-12 text-right pl-0">
                      <span :class="'text-' + stats.type">{{
                        stats.percentage.toFixed(2) + "%"
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </stats-card>
        </div>
      </div>

      <div class="row">
        <div class="card-container col-4" style="height: 402px">
          <div class="card">
            <div style="display: flex">
              <div class="card-header" style="flex: 0 0 70%">
                <h5 style="float: left; margin: 5px">{{ titleParam }}</h5>
                <p
                  v-if="titleParam === 'pH'"
                  style="float: left; margin-top: 14px"
                >
                  RANGE {{ tempRange[0] }}-{{ tempRange[1] }}
                </p>
                <p v-else style="float: left; margin-top: 14px">
                  MAX {{ tempRange[1] }}
                </p>
              </div>
            </div>
            <div class="card-body">
              <el-table
                :row-class-name="tableRowClassName"
                :cell-style="{ padding: '3px' }"
                :data="tableDataParam[1]"
                height="280"
              >
                <el-table-column
                  v-for="(header, index) in tableDataParam[0]"
                  :label="header.name"
                  :property="header.prop"
                  :min-width="header.width"
                  :key="index"
                ></el-table-column>
              </el-table>
            </div>
            <div class="card-footer">
              <div class="stats" style="text-align: end">
                <a @click="toStats">Open Stats</a>
                <i class="nc-icon nc-single-copy-04"></i>
              </div>
            </div>
          </div>
        </div>
        <div
          class="card-container sensor-line-chart col-8"
          style="height: 402px"
          ref="cardContainer"
        >
          <chart-card
            :chart-data="chartHours.data"
            :chart-height="setChartHeight()"
            :chart-options="chartHours.options"
          >
            <template slot="header">
              <h5 class="card-title">{{ titleParam }}</h5>
              <p v-if="titleParam === 'pH'" class="card-category">
                RANGE {{ tempRange[0] }}-{{ tempRange[1] }}
              </p>
              <p v-else class="card-category">MAX {{ tempRange[1] }}</p>
            </template>

            <template slot="footer">
              <hr />
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>
      </div>
      <div class="row">
        <div class="card-container col-6" style="height: 287px">
          <div class="card">
            <div style="display: flex">
              <div class="card-header" style="flex: 0 0 70%">
                <h5 style="height: 30px; overflow: hidden">Last Data Entry</h5>
              </div>
            </div>
            <div class="card-body">
              <el-table
                :row-class-name="tableRowClassName"
                :cell-style="{ padding: '3px' }"
                :data="tableDataEntry[1]"
                height="168"
              >
                <el-table-column
                  v-for="(header, index) in tableDataEntry[0]"
                  :label="header.name"
                  :property="header.prop"
                  :min-width="header.width"
                  :key="index"
                ></el-table-column>
              </el-table>
            </div>
            <div class="card-footer">
              <div class="stats" style="text-align: end">
                <a @click="toRecords">Open Records</a>
                <i class="nc-icon nc-single-copy-04"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="card-container col-6" style="height: 287px">
          <div class="card activity">
            <div style="display: flex">
              <div class="card-header" style="flex: 0 0 70%">
                <h5>Error Logs</h5>
              </div>
            </div>
            <div
              class="card-body table-responsive table-full-width"
              style="overflow: hidden"
            >
              <el-table
                :cell-style="{ padding: '3px' }"
                :data="tableDataError[1]"
                height="168"
              >
                <el-table-column
                  v-for="(header, index) in tableDataError[0]"
                  :label="header.name"
                  :property="header.prop"
                  :min-width="header.width"
                  :key="index"
                ></el-table-column>
              </el-table>
            </div>
            <div class="card-footer">
              <div class="stats" style="text-align: end">
                <a @click="toLogs">Open Error Logs</a>
                <i class="nc-icon nc-single-copy-04"></i>
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
import moment from "moment";
import axios from "axios";
import { Table, TableColumn } from "element-ui";
import { LetterCube } from "vue-loading-spinner";

Vue.use(Table);
Vue.use(TableColumn);
import MistaLoading from "src/components/UIComponents/Loading.vue";
import CircleChartCard from "src/components/UIComponents/Cards/CircleChartCard.vue";
import ChartCard from "src/components/UIComponents/Cards/ChartCard";
import StatsCard from "src/components/UIComponents/Cards/StatsCard";
import Loading from "src/components/Dashboard/Layout/LoadingMainPanel.vue";
import RegularTablesSimple from "src/components/Dashboard/Views/Tables/RegularTablesSimple";
import RegularTables1 from "src/components/Dashboard/Views/Tables/RegularTables1";

const tooltipOptions = {
  tooltipFillColor: "rgba(0,0,0,0.5)",
  tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  tooltipFontSize: 14,
  tooltipFontStyle: "normal",
  tooltipFontColor: "#fff",
  tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
  tooltipTitleFontSize: 14,
  tooltipTitleFontStyle: "bold",
  tooltipTitleFontColor: "#fff",
  tooltipYPadding: 6,
  tooltipXPadding: 6,
  tooltipCaretSize: 8,
  tooltipCornerRadius: 6,
  tooltipXOffset: 10
};

export default {
  watch: {
    activeMills() {
      this.dummy(this.row2);
    }
  },
  created() {
    this.initPageData();
    this.get2MinsData();
    this.apiInterval = setInterval(() => {
      this.dummy(this.row2);
    }, 10000);
  },
  methods: {
    initPageData() {
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      axios
        .get(this.$store.state.apiURL + "logger/list/" + auth._id)
        .then(response => {
          let data = response.data;
          let array = [];
          for (let index = 0; index < data.length; index++) {
            array.push({
              id: data[index]._id,
              name: data[index].milsName
            });
          }
          this.$store.commit("setMillsArray", array);
          this.select.site = array;
          if (
            this.$store.state.auth.data.role === "admin" ||
            this.$store.state.auth.data.role === "superAdmin"
          ) {
            this.$store.commit("setMillsActive", array[0].id);
            this.$store.commit("setIsTopNavbarSelectAll", false);
            this.$store.commit("setIsTopNavbarSelect", true);
          } else {
            this.$store.commit("setIsTopNavbarSelect", false);
            this.$store.commit(
              "setMillsActive",
              this.$store.state.auth.data.associateLogger
            );
          }
        });
    },
    dummy(row2) {
      let that = this;
      this.isLoading = false;
      this.$store.commit("insertDroplist");
      if (row2.key === "debit") this.row2.index = 4;

      let tableDataPopup = [];

      axios
        .get(
          this.$store.state.apiURL +
            "dashboard/overview/data/" +
            this.$store.state.mills.active
        )
        .then(res => {
          const statusGen = a => {
            for (let i = 0; i < a.length; i++) {
              if (i === 3) continue;
              if (a[i].status === "danger") {
                return "danger";
              }
            }
            return "success";
          };

          this.statsCards = [
            {
              type: res.data.dataList[0].dataParam[0].status,
              title: res.data.dataList[0].dataParam[0].name,
              key: "ph",
              icon: "nc-icon nc-globe",
              percentage: res.data.percent[0].percentage[0].value,
              avg: res.data.dataList[0].dataParam[0].value.toFixed(2),
              min: res.data.logger.range[0].min.toFixed(2),
              max: res.data.logger.range[0].max.toFixed(2)
            },
            {
              type: res.data.dataList[0].dataParam[1].status,
              title: res.data.dataList[0].dataParam[1].name,
              key: "cod",
              icon: "nc-icon nc-globe",
              percentage: res.data.percent[0].percentage[1].value,
              avg: res.data.dataList[0].dataParam[1].value.toFixed(2),
              min: res.data.logger.range[1].min.toFixed(2),
              max: res.data.logger.range[1].max.toFixed(2)
            },
            {
              type: res.data.dataList[0].dataParam[2].status,
              title: res.data.dataList[0].dataParam[2].name,
              key: "tss",
              icon: "nc-icon nc-globe",
              percentage: res.data.percent[0].percentage[2].value,
              avg: res.data.dataList[0].dataParam[2].value.toFixed(2),
              min: res.data.logger.range[2].min.toFixed(2),
              max: res.data.logger.range[2].max.toFixed(2)
            },
            {
              type: res.data.dataList[0].dataParam[4].status,
              title: res.data.dataList[0].dataParam[4].name,
              key: "debit",
              icon: "nc-icon nc-globe",
              percentage: res.data.percent[0].percentage[4].value,
              avg: res.data.dataList[0].dataParam[4].value.toFixed(2),
              min: res.data.logger.range[4].min.toFixed(2),
              max: res.data.logger.range[4].max.toFixed(2)
            }
          ];
          let tempTable = [];
          let tempLastData = [];
          let tempError = [];
          let tempChart = [];

          for (let index = res.data.dataList.length - 1; index >= 0; index--) {
            tempChart.push({
              timestamp: moment
                .unix(res.data.dataList[index].timestamp)
                .format("DD/MM/YYYY HH:mm"),
              ph: res.data.dataList[index].dataParam[0].value,
              cod: res.data.dataList[index].dataParam[1].value,
              tss: res.data.dataList[index].dataParam[2].value,
              debit: res.data.dataList[index].dataParam[4].value,
              status: statusGen(res.data.dataList[index].dataParam)
            });
          }

          for (let index = 0; index < res.data.dataList.length; index++) {
            tempTable.push({
              time: moment
                .unix(res.data.dataList[index].timestamp)
                .format("DD/MM/YYYY HH:mm"),
              value: res.data.dataList[index].dataParam[row2.index].value,
              status: res.data.dataList[index].dataParam[row2.index].status
            });
            tempLastData.push({
              timestamp: moment
                .unix(res.data.dataList[index].timestamp)
                .format("DD/MM/YYYY HH:mm"),
              ph: res.data.dataList[index].dataParam[0].value,
              cod: res.data.dataList[index].dataParam[1].value,
              tss: res.data.dataList[index].dataParam[2].value,
              debit: res.data.dataList[index].dataParam[4].value,
              status: statusGen(res.data.dataList[index].dataParam)
            });
            if (
              res.data.errorList[index].errorMsg ===
              "Parameter NH3N tidak sesuai ambang batas normal!"
            )
              continue;
            tempError.push({
              timestamp: moment
                .unix(res.data.errorList[index].timestamp)
                .format("DD/MM/YYYY HH:mm"),
              detail: res.data.errorList[index].errorMsg
            });
          }

          that.tableDataParam[1] = tempTable;
          that.tableDataEntry[1] = tempLastData;
          that.tableDataError[1] = tempError;
          let tempUnix = {
            data: {
              droplistValue: true,
              labels: [],
              datasets: [
                {
                  borderColor: "#ff0000",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: []
                },
                {
                  borderColor: "#ff0000",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: []
                },
                {
                  borderColor: "#fcc468",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: []
                }
              ]
            },
            options: {
              tooltips: tooltipOptions,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "#9f9f9f",
                      beginAtZero: false,
                      maxTicksLimit: 5
                      //padding: 20
                    },
                    gridLines: {
                      drawBorder: true,
                      zeroLineColor: "transparent",
                      color: "rgba(255,255,255,0.05)"
                    }
                  }
                ],

                xAxes: [
                  {
                    barPercentage: 1.6,
                    gridLines: {
                      drawBorder: true,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent",
                      display: false
                    },
                    ticks: {
                      padding: 20,
                      fontColor: "#9f9f9f"
                    }
                  }
                ]
              }
            }
          };
          let labels = [];

          for (let index = 0; index < tempChart.length; index++) {
            labels.push(tempChart[index].timestamp.slice(-5));
          }

          tempUnix.data.labels = labels;
          // this.tableDataParam[1] = tableDataParam;
          // this.tempRange = range[0];

          let datasets = [];
          for (let index = 0; index < tempChart.length; index++) {
            datasets.push(tempChart[index][row2.key]);
          }
          let min = [];
          for (let index = 0; index < tempChart.length; index++) {
            min.push(res.data.logger.range[row2.index].min);
          }
          let max = [];
          for (let index = 0; index < tempChart.length; index++) {
            max.push(res.data.logger.range[row2.index].max);
          }
          tempUnix.data.datasets[0].data = min;
          tempUnix.data.datasets[1].data = max;
          tempUnix.data.datasets[2].data = datasets;
          that.chartHours = tempUnix;
        });
    },
    get2MinsData() {
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      axios
        .get(this.$store.state.apiURL + "error/raw/" + auth._id)
        .then(res => {
          res.data.map(el => {
            el.timestamp = moment.unix(el.timestamp).format("MM/DD/YYYY HH:mm");
          });
          this.errorData = res.data;
        });
    },
    get1HourData() {
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      axios
        .get(this.$store.state.apiURL + "error/hour/" + auth._id)
        .then(res => {
          res.data.map(el => {
            el.timestamp = moment.unix(el.timestamp).format("MM/DD/YYYY HH:mm");
          });
          this.errorData = res.data;
        });
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.status === "danger") {
        return "table-danger";
      }
      return "table-default";
    },
    rowClass(param) {
      if (param.status === "danger") {
        return "table-danger";
      }
    },

    toStats() {
      this.$router.push("/dashboard/stats");
    },
    toRecords() {
      this.$router.push("/records");
    },
    toLogs() {
      this.$router.push("/logs");
    },
    myEventHandler(e) {
      if (window.innerWidth > 1440) {
        this.chartHeight = 96;
      } else if (window.innerWidth > 1366) {
        this.chartHeight = 72;
      }
    },
    setChartHeight() {
      if (window.innerWidth > 1440) {
        return 110;
      } else if (window.innerWidth > 1366) {
        return 144;
      } else if (window.innerWidth > 992) {
        return 144;
      } else if (window.innerWidth > 768) {
        return 144;
      } else if (window.innerWidth > 425) {
        return 128;
      } else if (window.innerWidth > 375) {
        return 240;
      } else if (window.innerWidth > 320) {
        return 288;
      } else {
        return 320;
      }
    }
  },
  destroyed() {
    clearInterval(this.apiInterval);

    window.removeEventListener("resize", this.myEventHandler);
  },
  computed: {
    activeMills() {
      return this.$store.getters.activeMills;
    },
    token() {
      return this.$store.getters.isToken;
    },
    admin() {
      return this.$store.getters.isAdmin;
    },
    distributor() {
      return this.$store.getters.isDistributor;
    },
    reseller() {
      return this.$store.getters.isReseller;
    },
    industri() {
      return this.$store.getters.isIndustri;
    }
  },
  components: {
    StatsCard,
    ChartCard,
    RegularTablesSimple,
    CircleChartCard,
    RegularTables1,
    LetterCube,
    MistaLoading
  },
  beforeMount() {},
  data() {
    return {
      apiInterval: null,
      row2: { index: 0, key: "ph" },
      select: {
        site: []
      },
      errorData: [],
      errorDataHourly: [],
      isNotification: true,
      is2Menit: true,
      isLoading: true,
      tempRange: [6, 9],
      titleParam: "pH",
      chartHeight: 96,
      tableDataParam: [
        [
          {
            name: "TIME",
            prop: "time",
            width: 130
          },
          {
            name: "VALUE",
            prop: "value",
            width: 80
          },
          {
            name: "STATUS",
            prop: "status",
            width: 80
          }
        ],
        []
      ],

      tableDataEntry: [
        [
          {
            name: "Time",
            prop: "timestamp",
            width: 140
          },
          {
            name: "pH",
            prop: "ph",
            width: 80
          },
          {
            name: "COD",
            prop: "cod",
            width: 80
          },
          {
            name: "TSS",
            prop: "tss",
            width: 80
          },
          {
            name: "Debit",
            prop: "debit",
            width: 80
          },
          {
            name: "Status",
            prop: "status",
            width: 80
          }
        ],
        []
      ],
      tableDataError: [
        [
          {
            name: "TIME",
            prop: "timestamp",
            width: 96
          },
          {
            name: "ERROR",
            prop: "detail",
            width: 320
          }
        ],
        []
      ],
      statsCards: [],
      chartHours: {}
    };
  }
};
</script>
<style>
.dashboard-overview .row {
  margin: -7px;
  overflow: hidden;
}
.dashboard-overview .cell {
  font-size: 12px;
}
.dashboard-overview .btn-table {
  background-color: #007fff;
  border: none;
  border-radius: 6px;
  border-width: 2px;
  box-shadow: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  font-weight: 400;
  line-height: 1.35em;
  margin: 10px 1px;
  padding: 2px 8px;
  text-transform: capitalize;
}
.dashboard-overview .btn-table:hover {
  background-color: #99ccff;
  color: white;
}
.dashboard-overview .activity tr > th > .cell,
.dashboard-overview .activity tr > td > .cell {
  white-space: nowrap;
}
.dashboard-overview .activity tr > th:nth-child(2) > .cell,
.dashboard-overview .activity tr > td:nth-child(2) > .cell {
  text-align: left;
}
.f5-col-md-5,
.f5-col-md,
.f5-col-md-auto,
.f5-col-lg-1,
.f5-col-lg-2,
.f5-col-lg-3,
.f5-col-lg-4,
.f5-col-lg-5,
.f5-col-xl-1,
.f5-col-xl-2,
.f5-col-xl-3,
.f5-col-xl-4,
.f5-col-xl-5 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}
@media (min-width: 768px) {
  .f5-col-md {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
  }
  .f5-col-md-auto {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: auto;
    max-width: 100%;
  }
  .f5-col-md-5 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
}
@media (min-width: 992px) {
  .f5-col-lg {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
  }
  .f5-col-lg-auto {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: auto;
    max-width: 100%;
  }
  .f5-col-lg-1 {
    -ms-flex: 0 0 20%;
    flex: 0 0 20%;
    max-width: 20%;
  }
  .f5-col-lg-2 {
    -ms-flex: 0 0 40%;
    flex: 0 0 40%;
    max-width: 40%;
  }
  .f5-col-lg-3 {
    -ms-flex: 0 0 60%;
    flex: 0 0 60%;
    max-width: 60%;
  }
  .f5-col-lg-4 {
    -ms-flex: 0 0 80%;
    flex: 0 0 80%;
    max-width: 80%;
  }
  .f5-col-lg-5 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
}
@media (min-width: 1200px) {
  .f5-col-xl {
    -ms-flex-preferred-size: 0;
    flex-basis: 0;
    -ms-flex-positive: 1;
    flex-grow: 1;
    max-width: 100%;
  }
  .f5-col-xl-auto {
    -ms-flex: 0 0 auto;
    flex: 0 0 auto;
    width: auto;
    max-width: 100%;
  }
  .f5-col-xl-1 {
    -ms-flex: 0 0 20%;
    flex: 0 0 20%;
    max-width: 20%;
  }
  .f5-col-xl-2 {
    -ms-flex: 0 0 40%;
    flex: 0 0 40%;
    max-width: 40%;
  }
  .f5-col-xl-3 {
    -ms-flex: 0 0 60%;
    flex: 0 0 60%;
    max-width: 60%;
  }
  .f5-col-xl-4 {
    -ms-flex: 0 0 80%;
    flex: 0 0 80%;
    max-width: 80%;
  }
  .f5-col-xl-5 {
    -ms-flex: 0 0 100%;
    flex: 0 0 100%;
    max-width: 100%;
  }
}
.card-container > .card {
  height: calc(100% - 20px);
  overflow: hidden;
}
</style>
<style lang="scss">
.dashboard-overview {
  .mista-loading {
    min-height: calc(100vh - 124px);
  }
  .card-container {
    .card {
      .card-body {
        .el-table {
          .el-table__body-wrapper {
            -ms-overflow-style: none;
            &::-webkit-scrollbar {
              display: none;
            }
          }
        }
        .stats {
          bottom: 0;
          padding: 0.75rem 1rem;
          position: absolute;
          width: 100%;
          a {
            color: #252422;
            cursor: pointer;
            margin-right: 0.25rem;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .card-footer {
        bottom: 0;
        padding: 0.5rem 1rem;
        position: absolute;
        width: 100%;
        a {
          margin-right: 0.5rem;
          color: #252422;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
  .card-stats {
    .stats {
      a {
        color: #252422;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .sensor-line-chart {
    .card-footer {
      display: none;
    }
  }
}
</style>
