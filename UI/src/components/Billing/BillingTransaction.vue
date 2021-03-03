<template>
  <div class="billing-transaction">
    <div class="card-form-container">
      <div v-if="showForm" class="card form p-4">
        <div class="card-header">Form Transaction</div>
        <div class="card-body p-0">
          <div class="row">
            <div class="form-group col-6">
              <label class="control-label">Customer</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Customer"
                    v-model="formTransaction.loggerID"
                  >
                    <el-option
                      v-for="item in listSubject"
                      class="select-info"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="form-group col-6">
              <label class="control-label">Package</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Package"
                    v-model="formTransaction.package"
                  >
                    <el-option
                      v-for="item in listPackage"
                      class="select-info"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <label>Start Date</label>
              <el-date-picker
                class="w-100"
                v-model="formTransaction.startDate"
                type="date"
                value-format="timestamp"
                placeholder="Pick a day"
              ></el-date-picker>
            </div>
            <div class="col-6">
              <label>Amount</label>
              <fg-input v-model="formTransaction.amount"></fg-input>
            </div>
          </div>
        </div>
        <div class="card-footer px-0">
          <p-button class="mr-2" type="danger" round @click="cancel"
            >Cancel</p-button
          >
          <p-button type="info" round @click="submit">Submit</p-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card col-md-12 px-0">
        <div class="card-header row">
          <div class="col-6 d-flex flex-column justify-content-center">
            <h4 class="m-0">Transaction</h4>
          </div>
          <div
            v-if="isAdminShow"
            class="col-6 d-flex flex-row justify-content-end"
          >
            <p-button type="info" round @click="addTransaction"
              >Add Transaction</p-button
            >
          </div>
        </div>
        <div class="card-body row m-0 p-0 w-100">
          <div class="col-12">
            <div class="row">
              <!-- <div class="col-md-2">
              <el-input placeholder="Please input" v-model="search"></el-input>
              </div>-->
              <div class="col-md-4">
                <fg-input>
                  <el-select
                    class="select-primary"
                    size="large"
                    :placeholder="titleHolder"
                    v-model="searchQuery"
                  >
                    <el-option
                      v-for="option in getSelect"
                      class="select-primary"
                      :value="option.value"
                      :label="option.label"
                      :key="option.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
              <div class="col-md-4 dtr-picker">
                <div class="form-group">
                  <el-date-picker
                    value-format="timestamp"
                    v-model="dateTimePicker"
                    type="daterange"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                  ></el-date-picker>
                </div>
              </div>
              <div class="col-4 p-0 d-flex justify-content-end">
                <div class="col-4">
                  <el-select
                    class="select-primary"
                    v-model="pagination.perPage"
                    placeholder="Per page"
                  >
                    <el-option
                      class="select-primary"
                      v-for="item in pagination.perPageOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 mt-2">
            <el-table
              :row-class-name="tableRowClassName"
              :cell-style="{ padding: '4px' }"
              :data="queriedData"
              border
            >
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                :min-width="column.minWidth"
                :prop="column.prop"
                :label="column.label"
                :align="column.align"
              ></el-table-column>
            </el-table>
          </div>
          <div class="col-sm-6 pagination-info" style="padding-top:20px">
            <p class="category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <div class="col-sm-6" style="padding-top:20px">
            <p-pagination
              class="pull-right"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="pagination.total"
            ></p-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import {
  Table,
  TableColumn,
  Select,
  Option,
  Tag,
  Input,
  DatePicker,
  TimeSelect,
  Button,
  Upload
} from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import TableTransaction from "./TableTransaction.js";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  watch: {
    selectedData() {
      this.selectedData = this.searchQuery;
    },
    dateTimePicker() {
      if (this.dateTimePicker === null) {
        this.tempPicker = "";
        axios
          .get(
            "http://103.126.226.54:4000/api/ent/bill/transaction/?id=" +
              this.$store.state.userId,
            {
              headers: { token: this.$store.state.tokenId }
            }
          )
          .then(response => {
            this.tableData = response.data[0];

            this.getSelect = response.data[1];

            // this.selects.industri.value = response.data[0].name;
            // this.selects.industri.label = response.data[0].name;
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        this.tempPicker =
          "?start=" +
          this.dateTimePicker[0] / 1000 +
          "&end=" +
          this.dateTimePicker[1] / 1000;

        axios
          .get(
            "http://103.126.226.54:4000/api/ent/bill/transaction/?id=" +
              this.$store.state.userId +
              this.tempPicker,
            {
              headers: { token: this.$store.state.tokenId }
            }
          )
          .then(response => {
            this.tableData = response.data[0];

            this.getSelect = response.data[1];

            // this.selects.industri.value = response.data[0].name;
            // this.selects.industri.label = response.data[0].name;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  },
  created() {
    axios
      .get(
        "http://103.126.226.54:4000/api/ent/bill/transaction/?id=" +
          this.$store.state.userId +
          this.tempPicker,
        {
          headers: { token: this.$store.state.tokenId }
        }
      )
      .then(response => {
        this.tableData = response.data[0];
        this.getSelect = response.data[1];
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  components: {
    PPagination,
    [Tag.name]: Tag,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Select.name]: Select,
    [Input.name]: Input
  },
  computed: {
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
      this.result_ = this.tableData.filter(row => {
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
    }
  },
  data() {
    return {
      tempPicker: "",
      dateTimePicker: null,
      titleHolder: "Select Customer",
      getSelect: [],
      listSubject: null,
      listPackage: [
        { value: 2592000, label: "1 Month" },
        { value: 7776000, label: "3 Months" },
        { value: 15552000, label: "6 Months" },
        { value: 31104000, label: "1 Year" }
      ],
      formTransaction: {
        loggerID: "",
        package: "",
        startDate: "",
        amount: ""
      },
      showForm: false,
      checkboxes: {
        first: false,
        second: false,
        a: false,
        b: false,
        c: false,
        unchecked: false,
        checked: true,
        disabledUnchecked: false,
        disabledChecked: true
      },
      formData: {
        selectSubject: [
          { value: "Selectable Alpha", label: "Selectable Alpha" },
          { value: "Selectable Bravo", label: "Selectable Bravo" },
          { value: "Selectable Charlie", label: "Selectable Charlie" },
          { value: "Selectable Delta", label: "Selectable Delta" },
          { value: "Selectable Echo", label: "Selectable Echo" },
          { value: "Selectable Foxtrot", label: "Selectable Foxtrot" },
          { value: "Selectable Golf", label: "Selectable Golf" },
          { value: "Selectable Hotel", label: "Selectable Hotel" }
        ],
        selectPacket: [
          { value: "10‬", label: "1 month" },
          { value: "3 month", label: "3 month" },
          { value: "6 month", label: "6 month" },
          { value: "1 year", label: "1 year" },
          { value: "3 year", label: "3 year" },
          { value: "6 year", label: "6 year" }
        ]
      },
      selects: {
        simple: "",
        industri: [
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" },
          { value: "Tambang Emas & Tembaga", label: "Tambang Emas & Tembaga" }
        ],
        multiple: "ARS"
      },
      tags: {
        dynamicTags: [],
        inputVisible: false,
        inputValue: ""
      },
      pagination: {
        perPage: 15,
        currentPage: 1,
        perPageOptions: [15, 30, 45, 60],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["name"],
      tableColumns: [
        {
          align: "left",
          prop: "id",
          label: "Logger ID",
          minWidth: 100
        },
        {
          align: "left",
          prop: "name",
          label: "CUSTOMER",
          minWidth: 150
        },
        {
          align: "left",
          prop: "transid",
          label: "TRANSACTION ID",
          minWidth: 100
        },
        {
          align: "center",
          prop: "startdate",
          label: "START DATE",
          minWidth: 90
        },
        {
          align: "center",
          prop: "expiredate",
          label: "EXPIRE DATE",
          minWidth: 110
        },
        {
          align: "right",
          prop: "amount",
          label: "AMOUNT",
          minWidth: 150
        }
      ],
      tableData: [],
      dateTimePicker: ""
    };
  },
  methods: {
    submit() {
      this.formTransaction.startDate = this.formTransaction.startDate / 1000;
      axios
        .post(
          "http://103.126.226.54:4000/api/ent/bill/transaction/add",
          this.formTransaction
        )
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/transaction/?id=" +
                this.$store.state.userId +
                this.tempPicker,
              {
                headers: { token: this.$store.state.tokenId }
              }
            )
            .then(response => {
              this.tableData = response.data[0];
              this.getSelect = response.data[1];
            });
        })
        .catch(error => {
          console.log(error);
        });
      this.showForm = false;
      this.formTransaction = {
        loggerID: "",
        package: "",
        startDate: "",
        amount: ""
      };
    },
    cancel() {
      this.showForm = false;
      this.formTransaction = {
        loggerID: "",
        package: "",
        startDate: "",
        amount: ""
      };
    },
    addTransaction() {
      axios
        .get(
          "http://103.126.226.54:4000/api/ent/bill/transaction/list/" +
            this.tempPicker,
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listSubject = response.data;
        });
      this.showForm = true;
    },
    addForm() {
      this.stateForm = true;
    },
    handleClose(tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1);
    },
    handleInputConfirm() {
      let inputValue = this.tags.inputValue;
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue);
      }
      this.tags.inputVisible = false;
      this.tags.inputValue = "";
    },
    isAdminShow() {
      return this.$store.getters.isAdmin;
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "table-secondary";
      }
      return "";
    }
  },
  beforeMount() {
    this.$store.dispatch("removeDroplistCek");
    this.$store.commit("showTitle");
  }
};
</script>
<style lang="scss" scoped>
.card-form-container {
  position: absolute;
  width: 100%;
  z-index: 10;
  .form {
    box-shadow: 0 0 20px -2px rgba(0, 0, 0, 0.15);
    display: block;
    left: 50%;
    margin: auto;
    position: absolute;
    text-align: left;
    top: 4rem;
    transform: translateX(-50%);
    width: 60%;
    .card-header {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .card-footer {
      text-align: right;
    }
  }
}
</style>
<style lang="scss">
.billing-transaction {
  .el-table {
    table {
      thead {
        tr {
          th {
            padding: 4px 8px;
            .cell {
              font-size: 0.5rem;
              padding: 0;
            }
          }
        }
      }
      .cell {
        text-align: inherit;
      }
    }
  }
  .form-group {
    .el-range-separator {
      padding: 0;
      width: 10%;
    }
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
</style>
