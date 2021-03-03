<template>
  <div class="row">
    <div class="col-xl-2dot4-3 col-lg-2dot4-3 col-md-2dot4-3 col-sm-2dot4-3">
      <div class="card">
        <div style="display: flex">
          <div class="card-header" style="flex: 0 0 70%">
            <h5>Records</h5>
          </div>
          <div style="color: black; flex: 0 0 30%; padding: 5px; text-align: right">
            <button type="button" class="btn-record">See details</button>
          </div>
        </div>
        <div class="card-body table-responsive table-full-width" style="overflow: hidden">
          <el-table :cell-style="{padding:'3px'}" :data="tableDataParameter[1]">
            <el-table-column
              v-for="header in tableDataParameter[0]"
              :key="header.name"
              :label="header.name"
              :property="header.prop"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <div class="col-xl-2dot4-2 col-lg-2dot4-2 col-md-2dot4-2 col-sm-2dot4-2">
      <div class="card">
        <div style="display: flex">
          <div class="card-header" style="flex: 0 0 70%">
            <h5>Activity Logs</h5>
          </div>
          <div style="color: black; flex: 0 0 30%; padding: 5px; text-align: right">
            <button type="button" class="btn-activity">See details</button>
          </div>
        </div>
        <div class="card-body table-responsive table-full-width" style="overflow: hidden">
          <el-table
            :cell-style="{padding:'3px'}"
            :row-class-name="tableRowClassName"
            :data="tableDataError[1]"
          >
            <el-table-column
              v-for="header in tableDataError[0]"
              :key="header.name"
              :label="header.name"
              :property="header.prop"
            ></el-table-column>
          </el-table>
        </div>
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
      tableDataParameter: [
        [
          {
            name: "TIME",
            prop: "timestamp"
          },
          {
            name: "pH",
            prop: "ph"
          },
          {
            name: "COD",
            prop: "cod"
          },
          {
            name: "TSS",
            prop: "tss"
          },
          {
            name: "NH3-N",
            prop: "nh3n"
          },
          {
            name: "Debit",
            prop: "debit"
          },
          {
            name: "STATUS",
            prop: "status"
          }
        ],
        [
          {
            timestamp: 1234567890,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: 1234567890,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: 1234567890,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: 1234567890,
            ph: "2,345.67",
            cod: "2,345.67",
            tss: "2,345.67",
            nh3n: "2,345.67",
            debit: "234,56",
            status: "green"
          },
          {
            timestamp: 1234567890,
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
            name: "Timestamp",
            prop: "timestamp"
          },
          {
            name: "Error Detail",
            prop: "detail"
          }
        ],
        [
          {
            timestamp: 1234567890,
            detail: "Logger mu ajur lurd"
          },
          {
            timestamp: 1234567890,
            detail: "Logger mu ajur lurd"
          },
          {
            timestamp: 1234567890,
            detail: "Logger mu ajur lurd"
          },
          {
            timestamp: 1234567890,
            detail: "Logger mu ajur lurd"
          },
          {
            timestamp: 1234567890,
            detail: "Logger mu ajur lurd"
          }
        ]
      ]
    };
  }
};
</script>
<style scoped>
.cell {
  font-size: 12px;
}
.btn-record {
  background-color: rgb(102, 153, 255);
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
  background-color: rgb(255, 102, 102);
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
