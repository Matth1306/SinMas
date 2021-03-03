import { Line, mixins } from "vue-chartjs";

export default {
  mixins: [mixins.reactiveData],
  data() {
    return {
      fallBackColor: "#f96332",
      options: {}
    };
  },
  watch: {
    data: {
      deep: true,
      handler(data) {
        this.chartData = this.assignChartData({ data });
      }
    },
    datasets(datasets) {
      setInterval(() => {
        this.chartData = this.assignChartData({ datasets });
      }, 10);
    }
  }
};
