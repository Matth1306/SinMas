<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header p-3">
        <h4 style="display: inline-block" class="title m-0">
          Mills' Data Comparison
        </h4>
        <!-- <p-switch style="display:inline-block;margin-left:10px" v-model="switches"></p-switch> -->
      </div>
      <div class="card-body px-3">
        <div class="row">
          <div class="col-5 dtr-picker">
            <div class="form-group m-0">
              <el-date-picker
                value-format="timestamp"
                v-model="form.time"
                type="datetimerange"
                range-separator="-"
                start-placeholder="start"
                end-placeholder="end"
                :picker-options="pickerOptions"
              ></el-date-picker>
            </div>
          </div>
          <div class="col-5">
            <div class="row">
              <div class="col-6">
                <fg-input>
                  <el-select
                    class="select-success"
                    size="large"
                    placeholder="Mill Alpha"
                    v-model="form.a"
                  >
                    <el-option
                      v-for="item in array.site"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
              <div class="col-6">
                <fg-input>
                  <el-select
                    class="select-danger"
                    size="large"
                    placeholder="Mill Bravo"
                    v-model="form.b"
                  >
                    <el-option
                      v-for="item in array.site"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
          </div>
          <div class="col-2">
            <p-button
              class="mt-0 w-100"
              type="info"
              size="md"
              round
              @click="testBaim"
              >Compare</p-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 p-0">
      <chart-card
        :chart-data="chartPH.data"
        :chart-height="48"
        :chart-options="chartPH.options"
        class="p-3"
      >
        <template slot="header">
          <h5 class="card-title mb-2">pH</h5>
        </template>
      </chart-card>
    </div>
    <div class="col-12 p-0">
      <chart-card
        :chart-data="chartCOD.data"
        :chart-height="48"
        :chart-options="chartCOD.options"
        class="p-3"
      >
        <template slot="header">
          <h5 class="card-title mb-2">COD</h5>
        </template>
      </chart-card>
    </div>
    <div class="col-12 p-0">
      <chart-card
        :chart-data="chartTSS.data"
        :chart-height="48"
        :chart-options="chartTSS.options"
        class="p-3"
      >
        <template slot="header">
          <h5 class="card-title mb-2">TSS</h5>
        </template>
      </chart-card>
    </div>
    <div class="col-12 p-0">
      <chart-card
        :chart-data="chartDebit.data"
        :chart-height="48"
        :chart-options="chartDebit.options"
        class="p-3"
      >
        <template slot="header">
          <h5 class="card-title mb-2">Debit</h5>
        </template>
      </chart-card>
    </div>
  </div>
</template>
<script>
import { Card } from "src/components/UIComponents";
import ChartCard from "src/components/UIComponents/Cards/ChartCard";
import LineChart from "src/components/UIComponents/Charts/LineChart";
import BarChart from "src/components/UIComponents/Charts/BarChart";
import PieChart from "src/components/UIComponents/Charts/PieChart";
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
  TimeSelect,
} from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import users from "./users";
import usersMulti from "./usersMulti";
import axios from "axios";
import { lab } from "d3";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);

const rng = (min, max) => {
  return Math.random() * (max - min) + min;
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
  tooltipCaretSize: 80,
  tooltipCornerRadius: 6,
  tooltipXOffset: 10,
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-info",
  },
  buttonsStyling: false,
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
    PSwitch,
    Card,
    ChartCard,
    LineChart,
    BarChart,
    PieChart,
  },
  computed: {},
  data() {
    return {
      structure: {
        dataParam: [
          {
            name: "pH",
            value: 7.442028985507246,
          },
          {
            name: "COD",
            value: 84.26521739130435,
          },
          {
            name: "TSS",
            value: 55.38840579710145,
          },
          {
            name: "NH3N",
            value: 49.00144927536232,
          },
          {
            name: "Debit",
            value: 55.28115942028985,
          },
        ],
        timestamp: 1610956800,
        milsName: "MILS A",
      },
      array: {
        site: null,
      },
      form: {
        time: null,
        a: null,
        b: null,
      },
      chartPH: {},
      chartCOD: {},
      chartTSS: {},
      chartDebit: {},
      tableData: {
        a: [],
        b: [],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "1 bulan",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "3 bulan",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "6 bulan",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "12 bulan",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 360);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  watch: {},
  created() {
    // this.initDummy();
    this.$store.commit("setIsTopNavbarSelect", false);
    this.getArrayMills();
  },
  methods: {
    generateBaim() {},
    testBaim() {
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      let url1 = `${this.$store.state.apiURL}records/day/${auth._id}?mils=${this.form.a}`;
      let url2 = `${this.$store.state.apiURL}records/day/${auth._id}?mils=${this.form.b}`;

      if (this.form.time && this.form.time[0] && this.form.time[1]) {
        url1 = `${this.$store.state.apiURL}records/day/${auth._id}?mils=${
          this.form.a
        }&start=${this.form.time[0] / 1000}&end=${this.form.time[1] / 1000}`;
        url2 = `${this.$store.state.apiURL}records/day/${auth._id}?mils=${
          this.form.b
        }&start=${this.form.time[0] / 1000}&end=${this.form.time[1] / 1000}`;
      }
      axios.get(url1).then((res1) => {
        console.log(res1.data);
        axios.get(url2).then((res2) => {
          let testData = {
            data: {
              labels: [],
              datasets: [
                {
                  borderColor: "#6bd098",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
                {
                  borderColor: "#f17e5d",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
              ],
            },
            options: {
              tooltips: tooltipOptions,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "#9f9f9f",
                      beginAtZero: false,
                      maxTicksLimit: 5,
                      //padding: 20
                    },
                    gridLines: {
                      drawBorder: false,
                      zeroLineColor: "transparent",
                      color: "rgba(255,255,255,0.05)",
                    },
                  },
                ],

                xAxes: [
                  {
                    barPercentage: 1.6,
                    gridLines: {
                      drawBorder: false,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent",
                      display: false,
                    },
                    ticks: {
                      padding: 20,
                      fontColor: "#9f9f9f",
                    },
                  },
                ],
              },
            },
          };
          let labels = [],
            datapHA = [],
            datapHB = [],
            dataCODA = [],
            dataCODB = [],
            dataTSSA = [],
            dataTSSB = [],
            dataDebitA = [],
            dataDebitB = [];

          for (let i = res1.data.length - 1; i >= 0; i--) {
            labels.push(
              moment.unix(res1.data[i].timestamp).format("DD/MM/YYYY")
            );
            datapHA.push(res1.data[i].dataParam[0].value);
            datapHB.push(res2.data[i].dataParam[0].value);
          }
          testData.data.labels = labels;
          testData.data.datasets[0].data = datapHA;
          testData.data.datasets[1].data = datapHB;
          this.chartPH = testData;
          labels = [];
          for (let i = res1.data.length - 1; i >= 0; i--) {
            labels.push(
              moment.unix(res1.data[i].timestamp).format("DD/MM/YYYY")
            );

            dataCODA.push(res1.data[i].dataParam[1].value);
            dataCODB.push(res2.data[i].dataParam[1].value);
          }
          let testDataCOD = {
            data: {
              labels: [],
              datasets: [
                {
                  borderColor: "#6bd098",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
                {
                  borderColor: "#f17e5d",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
              ],
            },
            options: {
              tooltips: tooltipOptions,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "#9f9f9f",
                      beginAtZero: false,
                      maxTicksLimit: 5,
                      //padding: 20
                    },
                    gridLines: {
                      drawBorder: false,
                      zeroLineColor: "transparent",
                      color: "rgba(255,255,255,0.05)",
                    },
                  },
                ],

                xAxes: [
                  {
                    barPercentage: 1.6,
                    gridLines: {
                      drawBorder: false,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent",
                      display: false,
                    },
                    ticks: {
                      padding: 20,
                      fontColor: "#9f9f9f",
                    },
                  },
                ],
              },
            },
          };

          testDataCOD.data.labels = labels;
          testDataCOD.data.datasets[0].data = dataCODA;
          testDataCOD.data.datasets[1].data = dataCODB;
          this.chartCOD = testDataCOD;
          labels = [];
          for (let i = res1.data.length - 1; i >= 0; i--) {
            labels.push(
              moment.unix(res1.data[i].timestamp).format("DD/MM/YYYY")
            );

            dataTSSA.push(res1.data[i].dataParam[2].value);
            dataTSSB.push(res2.data[i].dataParam[2].value);
          }
          let testDataTSS = {
            data: {
              labels: [],
              datasets: [
                {
                  borderColor: "#6bd098",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
                {
                  borderColor: "#f17e5d",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
              ],
            },
            options: {
              tooltips: tooltipOptions,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "#9f9f9f",
                      beginAtZero: false,
                      maxTicksLimit: 5,
                      //padding: 20
                    },
                    gridLines: {
                      drawBorder: false,
                      zeroLineColor: "transparent",
                      color: "rgba(255,255,255,0.05)",
                    },
                  },
                ],

                xAxes: [
                  {
                    barPercentage: 1.6,
                    gridLines: {
                      drawBorder: false,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent",
                      display: false,
                    },
                    ticks: {
                      padding: 20,
                      fontColor: "#9f9f9f",
                    },
                  },
                ],
              },
            },
          };

          testDataTSS.data.labels = labels;
          testDataTSS.data.datasets[0].data = dataTSSA;
          testDataTSS.data.datasets[1].data = dataTSSB;

          this.chartTSS = testDataTSS;
          labels = [];
          for (let i = res1.data.length - 1; i >= 0; i--) {
            labels.push(
              moment.unix(res1.data[i].timestamp).format("DD/MM/YYYY")
            );

            dataDebitA.push(res1.data[i].dataParam[4].value);
            dataDebitB.push(res2.data[i].dataParam[4].value);
          }
          let testDataDebit = {
            data: {
              labels: [],
              datasets: [
                {
                  borderColor: "#6bd098",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
                {
                  borderColor: "#f17e5d",
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  pointRadius: 0,
                  pointHoverRadius: 0,
                  borderWidth: 3,
                  data: [],
                },
              ],
            },
            options: {
              tooltips: tooltipOptions,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      fontColor: "#9f9f9f",
                      beginAtZero: false,
                      maxTicksLimit: 5,
                      //padding: 20
                    },
                    gridLines: {
                      drawBorder: false,
                      zeroLineColor: "transparent",
                      color: "rgba(255,255,255,0.05)",
                    },
                  },
                ],

                xAxes: [
                  {
                    barPercentage: 1.6,
                    gridLines: {
                      drawBorder: false,
                      color: "rgba(255,255,255,0.1)",
                      zeroLineColor: "transparent",
                      display: false,
                    },
                    ticks: {
                      padding: 20,
                      fontColor: "#9f9f9f",
                    },
                  },
                ],
              },
            },
          };

          testDataDebit.data.labels = labels;
          testDataDebit.data.datasets[0].data = dataDebitA;
          testDataDebit.data.datasets[1].data = dataDebitB;
          this.chartDebit = testDataDebit;
        });
      });
    },
    initDummy() {
      for (let index = 10; index < 50; index++) {
        this.chartPH.data.labels.push("00:" + index);
        this.chartCOD.data.labels.push("00:" + index);
        this.chartTSS.data.labels.push("00:" + index);
        this.chartNH3N.data.labels.push("00:" + index);
        this.chartDebit.data.labels.push("00:" + index);
        this.chartPH.data.datasets[0].data.push(rng(5, 9));
        this.chartPH.data.datasets[1].data.push(rng(5, 9));
        this.chartCOD.data.datasets[0].data.push(rng(100, 120));
        this.chartCOD.data.datasets[1].data.push(rng(100, 120));
        this.chartTSS.data.datasets[0].data.push(rng(100, 120));
        this.chartTSS.data.datasets[1].data.push(rng(100, 120));
        this.chartNH3N.data.datasets[0].data.push(rng(100, 120));
        this.chartNH3N.data.datasets[1].data.push(rng(100, 120));
        this.chartDebit.data.datasets[0].data.push(rng(5, 9));
        this.chartDebit.data.datasets[1].data.push(rng(5, 9));
      }
    },
    compareData(a, b, time) {
      console.log("compareData(" + a + ", " + b + ", " + time + ");");
      let data = this.compileChart(a, b, time);
      console.log("ChartObject:", data);
      this.chartPH.data.labels = data.label;
      this.chartCOD.data.labels = data.label;
      this.chartTSS.data.labels = data.label;
      this.chartDebit.data.labels = data.label;
      this.chartPH.data.datasets[0].data = data.ph[0];
      this.chartPH.data.datasets[1].data = data.ph[1];
      this.chartCOD.data.datasets[0].data = data.cod[0];
      this.chartCOD.data.datasets[1].data = data.cod[1];
      this.chartTSS.data.datasets[0].data = data.tss[0];
      this.chartTSS.data.datasets[1].data = data.tss[1];
      this.chartDebit.data.datasets[0].data = data.debit[0];
      this.chartDebit.data.datasets[1].data = data.debit[1];
    },
    compileChart(a, b, time) {
      console.log("compileChart();");
      let data = this.pushArrayRecord(a, b, time);
      console.log("TableObject:", data);
      let xlabel = this.compileLabel(data.a);
      let yph = [this.compilePH(data.a), this.compilePH(data.b)];
      let ycod = [this.compileCOD(data.a), this.compileCOD(data.b)];
      let ytss = [this.compileTSS(data.a), this.compileTSS(data.b)];
      let ydebit = [this.compileDebit(data.a), this.compileDebit(data.b)];
      return {
        label: xlabel,
        ph: yph,
        cod: ycod,
        tss: ytss,
        debit: ydebit,
      };
    },
    compileDebit(data) {
      console.log("compileDebit();");
      let array = [];
      for (let index = 0; index < data.length; index++) {
        array.push(data.a[index].dataParam[4].value);
      }
      return array;
    },
    compileTSS(data) {
      console.log("compileTSS();");
      let array = [];
      for (let index = 0; index < data.length; index++) {
        array.push(data.a[index].dataParam[2].value);
      }
      return array;
    },
    compileCOD(data) {
      console.log("compileCOD();");
      let array = [];
      for (let index = 0; index < data.length; index++) {
        array.push(data.a[index].dataParam[1].value);
      }
      return array;
    },
    compilePH(data) {
      console.log("compilePH();");
      let array = [];
      for (let index = 0; index < data.length; index++) {
        array.push(data.a[index].dataParam[0].value);
      }
      return array;
    },
    compileLabel(data) {
      console.log("compileLabel();");
      let array = [];
      for (let index = 0; index < data.length; index++) {
        array.push(data.a[index].timestamp);
      }
      return array;
    },
    pushArrayRecord(a, b, time) {
      console.log("pushArrayRecord();");
      let data = {
        a: this.getArrayRecord(a, time),
        b: this.getArrayRecord(b, time),
      };
      return data;
    },
    getArrayRecord(profile, time) {
      console.log("getArrayRecord();");
      const url =
        this.$store.state.apiURL +
        "records/day/" +
        this.$store.state.auth.data._id +
        "?mils=" +
        profile +
        "&start=" +
        time[0] / 1000 +
        "&end=" +
        time[1] / 1000;
      console.log("URL:", url);
      axios
        .get(url, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          console.log("GET: ", response);
          let data = response.data;
          return data;
        })
        .catch((error) => {
          console.log("GET: ", error);
          return [];
        });
    },
    getArrayMills() {
      axios
        .get(
          this.$store.state.apiURL +
            "logger/list/" +
            this.$store.state.auth.data._id
        )
        .then((response) => {
          // console.log(response.data);
          let data = response.data;
          let array = [];
          for (let index = 0; index < data.length; index++) {
            array.push({
              label: data[index].milsName,
              value: data[index]._id,
            });
          }
          this.array.site = array;
        });
    },
  },
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
