<template>
  <div class="card">
    <div class="card-header">
      <h5 class="title">pH</h5>
    </div>
    <div class="card-body table-full-width">
      <el-table
        :header-row-style="{textAlign:'center'}"
        :cell-style="{padding:'5px'}"
        :data="tableData"
      >
        <el-table-column width="150%" label="TIME" property="time"></el-table-column>
        <el-table-column label="VALUE" property="value"></el-table-column>
        <el-table-column label="RANGE" property="range"></el-table-column>
        <el-table-column label="STATUS" property="status"></el-table-column>
      </el-table>
      <div class="stats" style="margin:10px 0px 0px 15px">
        <i class="fa fa-history"></i> Updated 3 minutes ago
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Table, TableColumn } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
export default {
  data() {
    return {
      tableData: [
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        },
        {
          time: "30/12/1234, 23:59",
          value: 7,
          range: 6 - 8,
          status: "green"
        }
      ]
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "table-success";
      } else if (rowIndex === 2) {
        return "table-info";
      } else if (rowIndex === 4) {
        return "table-danger";
      } else if (rowIndex === 6) {
        return "table-warning";
      }
      return "";
    }
  }
};
</script>
<style>
.cell {
  text-align: center;
  font-size: 12px;
}
</style>
