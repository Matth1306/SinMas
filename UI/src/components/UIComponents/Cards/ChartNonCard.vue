<template>
  <div>
    <component
      :is="chartComponent"
      :chart-id="chartId"
      :labels="chartData.labels"
      :color="color"
      :title="chartTitle"
      :extra-options="chartOptions"
      :height="chartHeight"
      :datasets="chartData.datasets"
      :data="chartData.series"
    ></component>
  </div>
</template>
<script>
import BarChart from "../Charts/BarChart";
import LineChart from "../Charts/LineChart";
import DoughNutChart from "../Charts/DoughnutChart";
import PieChart from "../Charts/PieChart";
export default {
  name: "chart-non-card",
  components: {
    LineChart,
    BarChart,
    DoughNutChart,
    PieChart
  },
  props: {
    footerText: {
      type: String,
      default: "",
      description: "Card footer text"
    },
    headerTitle: {
      type: String,
      default: "Chart title",
      description: "Card header title"
    },
    chartType: {
      type: String,
      default: "Line",
      description: "Chart type (Line|Pie|Bar)"
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      },
      description:
        "Chart options. Will be sent as extra options to Line|Pie|Bar chart components"
    },
    chartTitle: {
      type: String,
      description: "Chart title"
    },
    chartHeight: {
      type: Number,
      default: 250,
      description: "Chart height"
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          series: []
        };
      },
      description:
        "Chart data. Should contain `series` and `labels` or `datasets` and `labels`"
    },
    chartId: String,
    color: {
      type: String,
      default: "#6bd098",
      description: "Chart color"
    }
  },
  data() {
    return {
      chartComponents: {
        Line: "line-chart",
        Bar: "bar-chart",
        Doughnut: "doughnut-chart",
        Pie: "pie-chart",
        default: "line-chart"
      }
    };
  },
  computed: {
    chartComponent() {
      return (
        this.chartComponents[this.chartType] || this.chartComponents.default
      );
    }
  }
};
</script>
<style>
</style>
