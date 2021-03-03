<template>
  <div class="sales-stats">
    <div v-show="!isReseller" class="row" style="height: 320px">
      <div class="card-container col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>Pie Province Sales</h5>
          </div>
          <div class="card-body w-100 position-relative p-0">
            <div class="col-md-7 px-0">
              <el-table :data="tableDataProvince[1]" height="192">
                <el-table-column
                  v-for="header in tableDataProvince[0]"
                  :key="header.name"
                  :label="header.name"
                  :prop="header.prop"
                  :min-width="header.minWidth"
                ></el-table-column>
                <el-table-column min-width="22">
                  <div
                    class="indicator"
                    slot-scope="scope"
                    :style="{
                      backgroundColor: tableDataProvince[1][scope.$index].color
                    }"
                  ></div>
                </el-table-column>
              </el-table>
            </div>
            <div class="pie-sales col-md-6 px-0 position-absolute">
              <chart-non-card
                :chart-data="pieProvince.chartData"
                :extra-options="pieChart.extraOptions"
                chart-type="Pie"
              ></chart-non-card>
            </div>
          </div>
          <div class="card-footer p-0" style>
            <hr />
            <div class="stats my-1 px-2 pull-right">
              <a class="mr-2">Go to Details</a>
              <i class="nc-icon nc-single-copy-04"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="card-container col-md-4">
        <div class="card">
          <div class="card-header" style="display:flex">
            <h5>Sales per Month</h5>
            <!-- <h6 style="flex:0 0 20%">
              <u>Unit</u>
            </h6>
            <h6 style="flex:0 0 20%">Amount</h6>-->
          </div>
          <div class="card-body" style="padding:10px">
            <bar-chart
              :labels="barChart.chartData.labels"
              :height="128"
              :datasets="barChart.chartData.datasets"
            ></bar-chart>
          </div>
          <div class="card-footer p-0" style>
            <hr />
            <div class="stats my-1 px-2 pull-right">
              <a class="mr-2">Go to Details</a>
              <i class="nc-icon nc-single-copy-04"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="card-container col-md-4">
        <div class="card">
          <div class="card-header">
            <h5>Pie Industry Sales</h5>
          </div>
          <div class="card-body w-100 position-relative p-0">
            <div class="col-md-7 px-0">
              <el-table :data="tableDataIndustry[1]" height="192">
                <el-table-column
                  v-for="header in tableDataIndustry[0]"
                  :key="header.name"
                  :label="header.name"
                  :prop="header.prop"
                  :min-width="header.minWidth"
                ></el-table-column>
                <el-table-column min-width="22">
                  <div
                    class="indicator"
                    slot-scope="scope"
                    :style="{
                      backgroundColor: tableDataIndustry[1][scope.$index].color
                    }"
                  ></div>
                </el-table-column>
              </el-table>
            </div>
            <div class="pie-sales col-md-6 px-0 position-absolute">
              <chart-non-card
                :chart-data="pieIndustry.chartData"
                :extra-options="pieChart.extraOptions"
                chart-type="Pie"
              ></chart-non-card>
            </div>
          </div>
          <div class="card-footer p-0" style>
            <hr />
            <div class="stats my-1 px-2 pull-right">
              <a class="mr-2">Go to Details</a>
              <i class="nc-icon nc-single-copy-04"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isReseller" class="row" style="height: 320px">
      <div class="card-container col-6">
        <div class="card">
          <div class="card-header">
            <h5>Pie Province Sales</h5>
          </div>
          <div class="card-body w-100 position-relative p-0">
            <div class="col-md-8 px-0">
              <el-table :data="tableDataProvince[1]" height="189">
                <el-table-column
                  v-for="header in tableDataProvince[0]"
                  :key="header.name"
                  :label="header.name"
                  :prop="header.prop"
                  :min-width="header.minWidth"
                ></el-table-column>
                <el-table-column min-width="22">
                  <div
                    class="indicator"
                    slot-scope="scope"
                    :style="{
                      backgroundColor: tableDataProvince[1][scope.$index].color
                    }"
                  ></div>
                </el-table-column>
              </el-table>
            </div>
            <div class="pie-sales col-md-4 px-0 mx-4 position-absolute">
              <chart-non-card
                :chart-data="pieProvince.chartData"
                :extra-options="pieChart.extraOptions"
                chart-type="Pie"
              ></chart-non-card>
            </div>
          </div>
          <div class="card-footer" style>
            <hr />
            <div class="stats"><i class="fa fa-check"></i> Last Updated</div>
          </div>
        </div>
      </div>
      <div class="card-container col-6">
        <div class="card">
          <div class="card-header">
            <h5>Pie Industry Sales</h5>
          </div>
          <div class="card-body w-100 position-relative p-0">
            <div class="col-md-8 px-0">
              <el-table :data="tableDataIndustry[1]" height="189">
                <el-table-column
                  v-for="header in tableDataIndustry[0]"
                  :key="header.name"
                  :label="header.name"
                  :prop="header.prop"
                  :min-width="header.minWidth"
                ></el-table-column>
                <el-table-column min-width="22">
                  <div
                    class="indicator"
                    slot-scope="scope"
                    :style="{
                      backgroundColor: tableDataIndustry[1][scope.$index].color
                    }"
                  ></div>
                </el-table-column>
              </el-table>
            </div>
            <div class="pie-sales col-md-4 px-0 mx-4 position-absolute">
              <chart-non-card
                :chart-data="pieIndustry.chartData"
                :extra-options="pieChart.extraOptions"
                chart-type="Pie"
              ></chart-non-card>
            </div>
          </div>
          <div class="card-footer" style>
            <hr />
            <div class="stats"><i class="fa fa-check"></i> Last Updated</div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!isReseller" class="row">
      <div
        class="card-container col-xl-6"
        v-for="(reseller, index) in separatedBarChart"
        :key="index"
      >
        <div class="card">
          <div class="card-header">
            <h5>{{ reseller[0].label }}</h5>
          </div>
          <div class="card-body">
            <bar-chart
              :labels="barChart.chartData.labels"
              :height="80"
              :datasets="separatedBarChart[index]"
            ></bar-chart>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isReseller" class="row" style="height: 505px">
      <div class="card-container col-12">
        <div class="card">
          <div class="card-header" style="display:flex">
            <h5>Sales per Month</h5>
            <!-- <h6 style="flex:0 0 20%">
              <u>Unit</u>
            </h6>
            <h6 style="flex:0 0 20%">Amount</h6>-->
          </div>
          <div class="card-body" style="padding:10px">
            <bar-chart
              :labels="barChart.chartData.labels"
              :height="80"
              :datasets="barChart.chartData.datasets"
            ></bar-chart>
          </div>
          <div class="card-footer" style>
            <hr />
            <div class="stats"><i class="fa fa-check"></i> Last Updated</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "src/components/UIComponents";
import ChartCard from "src/components/UIComponents/Cards/ChartCard";
import ChartNonCard from "src/components/UIComponents/Cards/ChartNonCard";
import PieChart from "src/components/UIComponents/Charts/PieChart";
import BarChart from "src/components/UIComponents/Charts/BarChart";
import axios from "axios";

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

function randomScalingFactor() {
  return Math.round(Math.random() * 100);
}

let tempProv = {
  chartData: {
    labels: [],
    datasets: [
      {
        label: "Sales",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
        backgroundColor: [],
        data: []
      }
    ],
    options: {
      tooltips: tooltipOptions
    }
  },
  extraOptions: {
    responsive: true,
    legend: {
      position: "top"
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};
let tempInd = {
  chartData: {
    labels: [],
    datasets: [
      {
        label: "Sales",
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 0,
        backgroundColor: [],
        data: []
      }
    ],
    options: {
      tooltips: tooltipOptions
    }
  },
  extraOptions: {
    responsive: true,
    legend: {
      position: "top"
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
};

export default {
  beforeMount() {
    this.$store.dispatch("removeDroplistCek");
    this.$store.commit("hideTitle");
    this.compilePieIndustry();
  },
  components: {
    Card,
    ChartCard,
    PieChart,
    ChartNonCard,
    BarChart
  },
  computed: {
    isReseller() {
      return this.$store.getters.isReseller;
    }
  },
  created() {
    axios
      .get(
        "http://103.126.226.54:4000/api/sales/overview/" +
          this.$store.state.userId,
        {
          headers: { token: this.$store.state.tokenId }
        }
      )
      .then(response => {
        this.tableDataProvince = [
          this.tableDataProvince[0],
          response.data.dataProv
        ];

        this.tableDataIndustry[1] = response.data.dataType;

        this.barChart = {
          chartData: {
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
              "Oct",
              "Nov",
              "Dec"
            ],
            datasets: response.data.dataBar
          }
        };

        this.compilePieProvince();
        this.pieProvince = tempProv;

        this.compilePieIndustry();
        this.pieIndustry = tempInd;
        this.compileBarChartData(this.barChart.chartData.datasets);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  data() {
    return {
      tableDataProvince: [
        [
          {
            name: "Provnce",
            prop: "name",
            minWidth: 72
          },
          {
            name: "Unit",
            prop: "count",
            minWidth: 48
          }
        ],
        []
      ],
      tableDataIndustry: [
        [
          {
            name: "Industry",
            prop: "name",
            minWidth: 72
          },
          {
            name: "Unit",
            prop: "count",
            minWidth: 48
          }
        ],
        []
      ],
      pieChart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Sales",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 0,
              backgroundColor: [],
              data: []
            }
          ],
          options: {
            tooltips: tooltipOptions
          }
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: "top"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      },
      pieProvince: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Sales",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 0,
              backgroundColor: [],
              data: []
            }
          ],
          options: {
            tooltips: tooltipOptions
          }
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: "top"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      },
      pieIndustry: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Sales",
              pointRadius: 0,
              pointHoverRadius: 0,
              borderWidth: 0,
              backgroundColor: [],
              data: []
            }
          ],
          options: {
            tooltips: tooltipOptions
          }
        },
        extraOptions: {
          responsive: true,
          legend: {
            position: "top"
          },
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      },
      barChart: {
        chartData: {
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
            "Oct",
            "Nov",
            "Dec"
          ],
          datasets: []
        }
      },
      separatedBarChart: []
    };
  },
  methods: {
    compilePieChartData(data) {
      let chartData = this.pieChart.chartData;
      chartData.labels = this.getPieChartLabel(data);
      chartData.datasets[0].backgroundColor = this.getPieChartColor(data);
      chartData.datasets[0].data = this.getPieChartData(data);
      return chartData;
    },
    compilePieProvince() {
      tempProv.chartData.labels = this.getPieChartLabel(
        this.tableDataProvince[1]
      );
      tempProv.chartData.datasets[0].backgroundColor = this.getPieChartColor(
        this.tableDataProvince[1]
      );
      tempProv.chartData.datasets[0].data = this.getPieChartData(
        this.tableDataProvince[1]
      );
      return;
    },
    compilePieIndustry() {
      tempInd.chartData.labels = this.getPieChartLabel(
        this.tableDataIndustry[1]
      );
      tempInd.chartData.datasets[0].backgroundColor = this.getPieChartColor(
        this.tableDataIndustry[1]
      );
      tempInd.chartData.datasets[0].data = this.getPieChartData(
        this.tableDataIndustry[1]
      );
      return;
    },
    getPieChartLabel(data) {
      var label = [];
      for (const item of data.values()) {
        label.push(item.name);
      }
      return label;
    },
    getPieChartData(data) {
      var count = [];
      for (const item of data.values()) {
        count.push(item.count);
      }
      return count;
    },
    getPieChartColor(data) {
      var color = [];
      for (const item of data.values()) {
        color.push(item.color);
      }
      return color;
    },
    compileBarChartData(data) {
      for (const item of data.values()) {
        let mista = data;
        mista = [item];
        this.separatedBarChart.push(mista);
      }

      return;
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.card-container {
  height: 100%;
  .card {
    height: calc(100% - 20px);
    overflow: hidden;
    .card-header {
      padding: 1rem;
      h5 {
        margin: 0;
      }
    }
    .card-body {
      flex: unset;
      .indicator {
        background-color: red;
        border-radius: 50%;
        height: 1rem;
        width: 1rem;
      }
      .pie-sales {
        right: 0;
        bottom: 0;
      }
    }
    .card-footer {
      .stats {
        padding: 0.5rem 0;
      }
    }
  }
  .card-map {
    .card-body {
      height: 100%;
      overflow: hidden;
      .row {
        height: 100%;
        .table-container {
          height: 100%;
          .el-table {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.sales-stats {
  .card {
    .card-footer {
      bottom: 0;
      position: absolute;
      width: 100%;
      & > hr {
        margin: 0;
      }
    }
    .el-table {
      tr {
        th {
          padding: 0.25rem 1rem;
          &:nth-child(1) {
            .cell {
              padding: 0;
              text-align: left;
              white-space: nowrap;
            }
          }
          &:nth-child(2) {
            .cell {
              padding: 0;
              text-align: right;
              white-space: nowrap;
            }
          }
        }
        td {
          padding: 0.25rem 1rem;
          &:nth-child(1) {
            .cell {
              padding: 0;
              text-align: left;
              white-space: nowrap;
            }
          }
          &:nth-child(2) {
            .cell {
              padding: 0;
              text-align: right;
              white-space: nowrap;
            }
          }
          &:nth-child(3) {
            padding: 0;
            .cell {
              padding: 0;
            }
          }
        }
      }
    }
  }
  .card-map {
    .el-table__body-wrapper {
      height: calc(100% - 48px);
      overflow: scroll;
    }
  }
}
</style>
