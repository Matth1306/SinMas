<template>
  <div id="charts-page">
    <div class="dashboard-stats row justify-content-center d-flex">
      <div class="card-container col-md-12">
        <div class="card">
          <div class="card-body p-3">
            <div class="row align-items-center">
              <div class="col-1">
                <h5 class="m-0">Filter</h5>
              </div>
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
                    @change="getData"
                  ></el-date-picker>
                </div>
              </div>
              <div class="col-4"></div>
              <div class="col-2">
                <p-button
                  class="border-info w-100 m-0"
                  type="info"
                  size="lg"
                  round
                  @click="toExport()"
                  >Export</p-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="col">
            <div id="chart-export">
              <div
                class="card-container footer-none col-6"
                v-for="chart in allChart"
                :key="chart.title"
              >
                <!-- <canvas id="chartExport"> -->
                <chart-card
                  :chart-data="chart.data"
                  :chart-height="72"
                  :chart-options="chart.options"
                >
                  <template slot="header">
                    <h5 class="card-title">{{ chart.title }}</h5>
                    <p v-if="chart.title === 'pH'" class="card-category">
                      RANGE {{ chart.paramRange0 }} - {{ chart.paramRange1 }}
                    </p>
                    <p v-else class="card-category">
                      MAX {{ chart.paramRange1 }}
                    </p>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DatePicker,
  TimeSelect,
  Slider,
  Tag,
  Input,
  Button,
  Select,
  Option
} from "element-ui";
import { Card } from "src/components/UIComponents";
import ChartCard from "src/components/UIComponents/Cards/ChartCard";
import LineChart from "src/components/UIComponents/Charts/LineChart";
import BarChart from "src/components/UIComponents/Charts/BarChart";
import PieChart from "src/components/UIComponents/Charts/PieChart";
import Swal from "sweetalert2/dist/sweetalert2.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2PDF from "jspdf-html2canvas";
import routes from "src/routes/routes";
import { log } from "fullcalendar";
import moment from "moment";
const axios = require("axios");

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
  tooltipXOffset: 10
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-info"
  },
  buttonsStyling: false
});

export default {
  components: {
    [Input.name]: Input,
    [Button.name]: Button,
    [Option.name]: Option,
    [Select.name]: Select,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    Card,
    ChartCard,
    LineChart,
    BarChart,
    PieChart,
    tooltipOptions
  },
  data() {
    return {
      array: {
        site: null
      },
      form: {
        filter: {
          mode: "1"
        },
        time: null
      },
      allChart: [],
      cekInterval: null,
      chartHeight: 64,
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
      }
    };
  },
  computed: {
    activeMills() {
      return this.$store.getters.activeMills;
    }
  },
  watch: {
    activeMills() {
      this.getData();
    }
  },
  created() {
    this.initPageData();
  },
  destroyed() {},
  methods: {
    queryTime(time) {
      console.log(time);
    },
    initPageData() {
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      // console.log("AUTH:", auth);
      const end = new Date().getTime();
      const start = new Date().getTime() - 3600 * 1000 * 24 * 30;
      const url = this.$store.state.apiURL + "logger/list/" + auth._id;
      // console.log("GET: Data for", start, "to", end);
      axios.get(url).then(response => {
        let data = response.data;
        // console.log("GET:", data, "from:", url);
        let array = [];
        for (let index = 0; index < data.length; index++) {
          array.push({
            id: data[index]._id,
            name: data[index].milsName
          });
        }
        this.array.site = array;
        this.$store.commit("setMillsArray", array);
        if (auth.role === "admin") {
          console.log("SET: selectSite(admin)");
          if (this.$store.state.mills.active === "") {
            console.log("SET: mills.active to", array[0].id);
            this.$store.commit("setMillsActive", array[0].id);
          }
          this.$store.commit("setIsTopNavbarSelectAll", false);
          this.$store.commit("setIsTopNavbarSelect", true);
        } else {
          this.$store.commit("setIsTopNavbarSelect", false);
        }
        this.getData();
      });
    },
    getData() {
      this.allChart = [];
      let url =
        this.$store.state.apiURL +
        "dashboard/stats/" +
        this.$store.state.mills.active;
      if (this.form.time) {
        url += `?start=${this.form.time[0] / 1000}&end=${this.form.time[1] /
          1000}`;
      }
      // console.log("FETCH:", url);
      axios.get(url).then(response => {
        console.log("GET:", url, response.data);
        let paramAdd = [0, 1, 2, 4];

        const chartDataGenerator = (data, paramAddress) => {
          let labels = [],
            param = [],
            min = [],
            max = [];
          for (let index = 0; index < data.dataList.length; index++) {
            labels.push(
              moment.unix(data.dataList[index].timestamp).format("DD/MM/YYYY")
            );
            param.push(data.dataList[index].dataParam[paramAddress].value);
            min.push(data.logger.range[paramAddress].min);
            max.push(data.logger.range[paramAddress].max);
          }
          let tempUnix = {
            data: {
              droplistValue: true,
              labels: labels,
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
            },
            title: response.data.logger.range[paramAddress].name,
            paramRange0: response.data.logger.range[paramAddress].min,
            paramRange1: response.data.logger.range[paramAddress].max
          };
          tempUnix.data.datasets[0].data = min;
          tempUnix.data.datasets[1].data = max;
          tempUnix.data.datasets[2].data = param;
          console.log(param);
          this.allChart.push(tempUnix);
        };
        for (let index = 0; index < paramAdd.length; index++) {
          chartDataGenerator(response.data, paramAdd[index]);
        }
      });
    },
    toExport() {
      swalWithBootstrapButtons
        .fire({
          title: "Do you want to export?",
          text: "",
          // icon: "question",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          reverseButtons: true
        })
        .then(result => {
          if (result.value) {
            var opt = {
              margin: 1,
              filename: "chart.pdf",
              image: { type: "jpeg", quality: 0.98 },
              html2canvas: { scale: 2 },
              jsPDF: { unit: "in", format: "a4", orientation: "landscape" },
              output: `Stats - ${this.$store.state.mills.active} - ${this.form.time}.pdf`,
              init: function() {},
              success: function(pdf) {
                pdf.save(this.output);
              }
            };
            var tempCanvas = html2PDF(
              document.getElementById("chart-export"),
              opt
            );
            // console.log(tempCanvas, opt);
            // //creates image
            // var canvasImg = canvas.toDataURL("image/jpeg", 1.0);

            // //creates PDF from img
            // var doc = new jsPDF("potrait");
            // doc.setFontSize(20);
            // doc.text(15, 15, "Cool Chart");
            // doc.addImage(canvasImg, "JPEG", 10, 10, 280, 150);
            // doc.save("canvas.pdf");
          }
        });
    },
    getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    toRecords() {
      this.$router.push("/records");
    },
    myEventHandler(e) {
      this.chartHeight =
        ((this.$refs.cardContainer.clientHeight - 144) *
          this.$refs.cardContainer.clientHeight *
          400) /
        (315 * (this.$refs.cardContainer.clientWidth - 15));

      var actualHeight =
        (this.chartHeight * (this.$refs.cardContainer.clientWidth - 15)) / 400;
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard-stats {
  .card-container {
    display: inline-block;
    .card {
      height: calc(100% - 20px);
      overflow: hidden;
      .card-body {
        .el-table {
          -ms-overflow-style: none;
          height: 160px;
          overflow: scroll;
        }
        .el-table::-webkit-scrollbar {
          display: none;
        }
      }
      .card-footer {
        bottom: 0;
        padding: 1rem 1.5rem;
        position: absolute;
        width: 100%;
        a {
          color: #252422;
        }
      }
      .btn-card {
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
        margin: 1rem;
        padding: 2px 8px;
        text-transform: capitalize;
        &:hover {
          background-color: #99ccff;
          color: white;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.dashboard-stats {
  .card {
    .card-header {
      padding: 1rem 1.5rem;
      h5 {
        margin: 0;
      }
    }
    .card-footer {
      bottom: 0;
      position: absolute;
      width: 100%;
    }
    tr {
      td {
        padding: 0.25rem;
      }
    }
  }
  .footer-none {
    .card-footer {
      display: none;
    }
  }
  .dtr-picker {
    .form-group {
      .el-input__inner {
        border: 2px solid #51cbce;
        border-radius: 20px;
      }
    }
  }
}
</style>
