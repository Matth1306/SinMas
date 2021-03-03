<template>
  <div>
    <div>
      <!-- <h3 v-for="site in dataSite" :key="site.site">{{site.site}}</h3> -->
      <h1>IKI HALAMAN LIYO</h1>
    </div>
    <div class="row">
      <div class="f5-col-lg-1" v-for="stats in statsCards2" :key="stats">
        <stats-card
          :type="stats.type"
          :icon="stats.icon"
          :small-title="stats.title"
          :title="stats.value"
        >
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i>
            {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>

    <div class="row">
      <div
        class="col col-xl-2dot4-2 col-lg-2dot4-2 col-md-2dot4-2 col-sm-2dot4-2"
      >
        <div class="card">
          <div style="display: flex">
            <div class="card-header" style="flex: 0 0 70%">
              <h5 style="float: left;margin:5px">pH</h5>
              <p style="float: left;margin-top:14px">RANGE (6-8)</p>
            </div>
            <div
              style="color: black; flex: 0 0 30%; padding: 5px; text-align: right"
            >
              <button type="button" class="btn-activity" @click="toRecords">
                See details
              </button>
            </div>
          </div>
          <div
            class="card-body table-responsive table-full-width"
            style="overflow: hidden;padding:0px"
          >
            <el-table
              :cell-style="{ padding: '3px' }"
              :row-class-name="tableRowClassName"
              :data="tableDataPH[1]"
            >
              <el-table-column
                v-for="header in tableDataPH[0]"
                :key="header.name"
                :label="header.name"
                :property="header.prop"
                :min-width="header.width"
              ></el-table-column>
            </el-table>
            <div class="stats" style="margin:10px 0px 10px 30px">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </div>
        </div>
      </div>
      <div
        class="col col-xl-2dot4-3 col-lg-2dot4-3 col-md-2dot4-3 col-sm-2dot4-3"
      >
        <chart-card
          :chart-data="chartHours.data"
          :chart-height="85"
          :chart-options="chartHours.options"
        >
          <template slot="header">
            <h5 class="card-title">pH</h5>
            <p class="card-category">History</p>
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
      <div class="col-xl-2dot4-3 col-lg-2dot4-3 col-md-2dot4-3 col-sm-2dot4-3">
        <div class="card">
          <div style="display: flex">
            <div class="card-header" style="flex: 0 0 70%">
              <h5>Last Data Entry</h5>
            </div>
            <div
              style="color: black; flex: 0 0 30%; padding: 5px; text-align: right"
            >
              <button type="button" class="btn-record" @click="toRecords">
                See details
              </button>
            </div>
          </div>
          <div
            class="card-body table-responsive table-full-width"
            style="overflow: hidden"
          >
            <!-- <el-table
              v-if="admin"
              :cell-style="{ padding: '3px' }"
              :data="tableDataParameterMulti[1]"
            >
              <el-table-column
                v-for="header in tableDataParameterMulti[0]"
                :key="header.name"
                :label="header.name"
                :property="header.prop"
                :min-width="header.width"
              ></el-table-column>
            </el-table>-->
            <el-table
              :cell-style="{ padding: '3px' }"
              :data="tableDataParameterMulti[1]"
            >
              <el-table-column
                v-for="header in tableDataParameterMulti[0]"
                :key="header.name"
                :label="header.name"
                :property="header.prop"
                :min-width="header.width"
              ></el-table-column>
            </el-table>
            <div class="stats" style="margin:10px 0px 0px 20px">
              <i class="fa fa-history"></i> Updated 3 minutes ago
            </div>
          </div>
        </div>
      </div>

      <div class="col-xl-2dot4-2 col-lg-2dot4-2 col-md-2dot4-2 col-sm-2dot4-2">
        <div class="card">
          <div style="display: flex">
            <div class="card-header" style="flex: 0 0 70%">
              <h5>Activity</h5>
            </div>
            <div
              style="color: black; flex: 0 0 30%; padding: 5px; text-align: right"
            >
              <button type="button" class="btn-activity" @click="toLogs">
                See details
              </button>
            </div>
          </div>
          <div
            class="card-body table-responsive table-full-width"
            style="overflow: hidden"
          >
            <el-table
              :cell-style="{ padding: '3px' }"
              :row-class-name="tableRowClassName"
              :data="tableDataError[1]"
            >
              <el-table-column
                v-for="header in tableDataError[0]"
                :key="header.name"
                :label="header.name"
                :property="header.prop"
                :min-width="header.width"
              ></el-table-column>
            </el-table>
            <div class="stats" style="margin:10px 0px 0px 20px">
              <i class="fa fa-history"></i> Updated 3 minutes ago
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
Vue.use(Table);
Vue.use(TableColumn);
import CircleChartCard from "src/components/UIComponents/Cards/CircleChartCard.vue";
import ChartCard from "src/components/UIComponents/Cards/ChartCard";
import StatsCard from "src/components/UIComponents/Cards/StatsCard";
import Loading from "src/components/Dashboard/Layout/LoadingMainPanel.vue";
import RegularTablesSimple from "src/components/Dashboard/Views/Tables/RegularTablesSimple";
import RegularTables1 from "src/components/Dashboard/Views/Tables/RegularTables1";

let tempUnix = {
  data: {
    labels: [],
    datasets: [
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
  methods: {
    toRecords() {
      window.location.replace("#/dashboard/stats");
    },
    toLogs() {
      window.location.replace("#/logs");
    }
  },
  mounted() {},
  created() {
    axios
      .get(
        "http://103.126.226.54:4000/api/ind/dashboard/overview/" +
          this.$store.state.userId,
        { headers: { token: this.$store.state.tokenId } }
      )
      .then(response => {
        this.statsCards2 = response.data.statCards;
        this.tableDataPH[1] = response.data.tableData[1][0];
        this.tableDataParameter = response.data.tableLastData;
        tempUnix.data.datasets[0].data = response.data.chartData[1][0];
        tempUnix.data.labels = response.data.chartData[0];
        this.tableDataError[1] = response.data.errorTable;
        for (let i = 0; i < tempUnix.data.labels.length; i++) {
          tempUnix.data.labels[i] = moment
            .unix(tempUnix.data.labels[i])
            .format("LT");
        }

        this.chartHours = tempUnix;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
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
    RegularTables1
  },
  beforeMount() {
    for (let i = 0; i < 4; i++) {
      this.statsCards1.push(this.statsCards[i]);
    }
    for (let i = 4; i < this.statsCards.length; i++) {
      this.statsCards2.push(this.statsCards[i]);
    }
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      dataSite: [
        { site: "PT. Mitra Mega 1" },
        { site: "PT. Mitra Mega 2" },
        { site: "PT. Mitra Mega 3" },
        { site: "PT. Mitra Mega 4" },
        { site: "PT. Mitra Mega 5" },
        { site: "PT. Mitra Mega 6" },
        { site: "PT. Mitra Mega 7" },
        { site: "PT. Mitra Mega 8" }
      ],
      tableDataPH: [
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
        [
          {
            time: "30/12/2020, 23:59",
            value: "1,234.56",
            status: "green"
          },
          {
            time: "30/12/2020, 23:59",
            value: "1,234.56",
            status: "green"
          },
          {
            time: "30/12/2020, 23:59",
            value: "1,234.56",
            status: "green"
          },
          {
            time: "30/12/2020, 23:59",
            value: "1,234.56",
            status: "green"
          },
          {
            time: "30/12/2020, 23:59",
            value: "1,234.56",
            status: "green"
          },
          {
            time: "30/12/2020, 23:59",
            value: "1,234.56",
            status: "green"
          },
          {
            time: "30/12/2020, 23:59",
            value: "1,234.56",
            status: "green"
          }
        ]
      ],
      tableDataParameter: [
        [
          {
            name: "TIME",
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
            name: "NH3-N",
            prop: "nh3n",
            width: 80
          },
          {
            name: "Debit",
            prop: "debit",
            width: 80
          },
          {
            name: "STATUS",
            prop: "status",
            width: 80
          }
        ],
        [
          {
            timestamp: "2020/04/04, 23:59",
            23: 59,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: "2020/04/04, 23:59",
            23: 59,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: "2020/04/04, 23:59",
            23: 59,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: "2020/04/04, 23:59",
            23: 59,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          }
        ]
      ],
      tableDataParameterMulti: [
        [
          {
            name: "TIME",
            prop: "timestamp",
            width: 140
          },
          {
            name: "SITE",
            prop: "site",
            width: 150
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
            name: "NH3-N",
            prop: "nh3n",
            width: 80
          },
          {
            name: "Debit",
            prop: "debit",
            width: 80
          },
          {
            name: "STATUS",
            prop: "status",
            width: 80
          }
        ],
        [
          {
            timestamp: "2020/04/04, 23:59",
            site: "PT Mitra Mega Int",
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: "2020/04/04, 23:59",
            site: "PT Mitra Mega Int",
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: "2020/04/04, 23:59",
            site: "PT Mitra Mega Int",
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: "2020/04/04, 23:59",
            site: "PT Mitra Mega Int",
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          }
        ]
      ],
      tableDataError: [
        [
          {
            name: "TIME",
            prop: "timestamp",
            width: 100
          },
          {
            name: "ACTIVITY",
            prop: "detail",
            width: 350
          }
        ],
        [
          {
            timestamp: "2020/04/04, 23:59",
            detail: "Logger mu ajur lurd"
          },
          {
            timestamp: "2020/04/04, 23:59",
            detail: "Logger mu ajur lurd"
          },
          {
            timestamp: "2020/04/04, 23:59",
            detail: "Logger mu ajur lurd"
          },
          {
            timestamp: "2020/04/04, 23:59",
            detail: "Logger mu ajur lurd"
          }
        ]
      ],
      tableData: [
        {
          time: "30/12/1234, 23:59",
          value: 7,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          status: "green"
        }
      ],
      statsCards1: [],
      statsCards2: [],
      statsCards: [
        {
          type: "warning",
          icon: "nc-icon nc-globe",
          title: "pH",
          value: 7,
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "success",
          icon: "nc-icon nc-globe",
          title: "COD",
          value: "120 mg/l",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "danger",
          icon: "nc-icon nc-globe",
          title: "TSS",
          value: "70 mg/l",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "info",
          icon: "nc-icon nc-globe",
          title: "NH3N",
          value: "20 mg/l",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "info",
          icon: "nc-icon nc-globe",
          title: "Debit",
          value: "200 m3/s",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "danger",
          icon: "nc-icon nc-globe",
          title: "FE",
          value: "2 mg/l",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "success",
          icon: "nc-icon nc-globe",
          title: "NO2",
          value: "20 mg/l",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "warning",
          icon: "nc-icon nc-globe",
          title: "CO",
          value: "1500 mg/l",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        },
        {
          type: "warning",
          icon: "nc-icon nc-globe",
          title: "CO",
          value: "1500 mg/l",
          footerText: "Updated now",
          footerIcon: "nc-icon nc-refresh-69"
        }
      ],
      chartHours: {
        data: {
          labels: [],
          datasets: [
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
      },
      activeUsersChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct"
          ],
          series: [542, 480, 430, 550, 530, 453, 380, 434, 568, 610]
        }
      },
      emailsCampaignChart: {
        data: {
          labels: ["12pm", "3pm", "6pm", "9pm", "12am", "3am", "6am", "9am"],
          series: [40, 500, 650, 700, 1200, 1250, 1300, 1900]
        }
      },
      activeCountriesChart: {
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October"
          ],
          series: [80, 78, 86, 96, 83, 85, 76, 75, 88, 90]
        }
      },
      activityChart: {
        data: {
          labels: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20
          ],
          datasets: [
            {
              label: "Data",
              borderColor: "#fcc468",
              fill: true,
              backgroundColor: "#fcc468",
              hoverBorderColor: "#fcc468",
              borderWidth: 8,
              data: [
                100,
                120,
                80,
                100,
                90,
                130,
                110,
                100,
                80,
                110,
                130,
                140,
                130,
                120,
                130,
                80,
                100,
                90,
                120,
                130
              ]
            },
            {
              label: "Data",
              borderColor: "#4cbdd7",
              fill: true,
              backgroundColor: "#4cbdd7",
              hoverBorderColor: "#4cbdd7",
              borderWidth: 8,
              data: [
                80,
                140,
                50,
                120,
                50,
                150,
                60,
                130,
                50,
                130,
                150,
                100,
                110,
                80,
                140,
                50,
                140,
                50,
                110,
                150
              ]
            }
          ]
        }
      }
    };
  }
};
</script>
<style scoped>
.row {
  margin: -7px;
  overflow: hidden;
}
.cell {
  font-size: 12px;
}
.btn-record {
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
.btn-record:hover {
  background-color: rgb(153, 186, 255);
  color: white;
}
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
.f5-col-md-5,
.f5-col-md,
.f5-col-md-auto,
.f5-col-lg-1,
.f5-col-lg-2,
.f5-col-lg-3,
.f5-col-lg-4,
.f5-col-lg-5 {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
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
</style>
