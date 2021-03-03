<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header" style="margin:-20px 0 -10px 0">
        <h4 class="title">Billing List</h4>
      </div>
      <div class="card-body row">
        <div class="col-sm-6">
          <div class="pull-left">
            <el-tag
              :key="tag"
              v-for="tag in tags.dynamicTags"
              type="primary"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>

            <input
              type="text"
              placeholder="Add new tag"
              class="form-control input-new-tag"
              v-model="tags.inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
            />
            <!-- <fg-input
              class="input-sm"
              placeholder="Search"
              v-model="searchQuery"
              addon-right-icon="nc-icon nc-zoom-split"
            ></fg-input>-->
          </div>
        </div>
        <div class="col-md-6">
          <div class="pull-right col-md-2">
            <el-select class="select-primary" v-model="pagination.perPage" placeholder="Per page">
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
        <div style="margin-left:20px">
          <h6>Filter</h6>
        </div>
        <div class="col-md-12">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <el-date-picker
                  v-model="dateTimePicker"
                  type="datetimerange"
                  range-separator="to"
                  start-placeholder="Start date"
                  end-placeholder="End date"
                ></el-date-picker>
              </div>
            </div>
            <div class="col-md-2">
              <fg-input>
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Select Type"
                  v-model="selects.simple"
                >
                  <el-option
                    v-for="option in selects.industri"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </fg-input>
            </div>
            <div class="col-md-2">
              <fg-input>
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Select Type"
                  v-model="selects.simple"
                >
                  <el-option
                    v-for="option in selects.industri"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </fg-input>
            </div>
            <div class="col-md-2">
              <fg-input>
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Select Type"
                  v-model="selects.simple"
                >
                  <el-option
                    v-for="option in selects.industri"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </fg-input>
            </div>
            <div class="col-md-2">
              <fg-input>
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Select Type"
                  v-model="selects.simple"
                >
                  <el-option
                    v-for="option in selects.industri"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </fg-input>
            </div>
          </div>
        </div>
        <div class="col-sm-12 mt-2">
          <el-table
            :row-class-name="tableRowClassName"
            :cell-style="{padding:'4px'}"
            :data="queriedData"
            border
          >
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              :min-width="column.minWidth"
              :prop="column.prop"
              :label="column.label"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div class="col-sm-6 pagination-info" style="padding-top:20px">
          <p class="category">Showing {{from + 1}} to {{to}} of {{total}} entries</p>
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
</template>
<script>
import Vue from "vue";
import {
  Table,
  TableColumn,
  Select,
  Option,
  Tag,
  Input,
  DatePicker,
  TimeSelect
} from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import TableList from "./TableList.js";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
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
      if (!this.tags.dynamicTags) {
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      let result = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.tags.dynamicTags)) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;
      return result.slice(this.from, this.to);
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
      propsToSearch: [
        "id",
        "reseller",
        "site",
        "transid",
        "paystat",
        "paymethod",
        "startdate",
        "expiredate",
        "amount"
      ],
      tableColumns: [
        {
          prop: "id",
          label: "ID",
          minWidth: 100
        },
        {
          prop: "reseller",
          label: "RESELLER",
          minWidth: 280
        },
        {
          prop: "site",
          label: "SITE",
          minWidth: 240
        },
        {
          prop: "transid",
          label: "TRANSACTION ID",
          minWidth: 90
        },
        {
          prop: "paystat",
          label: "PAYMENT STATUS",
          minWidth: 90
        },
        {
          prop: "paymethod",
          label: "PAYMENT METHOD",
          minWidth: 180
        },
        {
          prop: "startdate",
          label: "START DATE",
          minWidth: 90
        },
        {
          prop: "expiredate",
          label: "EXPIRE DATE",
          minWidth: 110
        },
        {
          prop: "amount",
          label: "AMOUNT",
          minWidth: 150
        }
      ],
      tableData: TableList,
      dateTimePicker: ""
    };
  },
  methods: {
    handleClose(tag) {
      this.tags.dynamicTags.splice(this.tags.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.tags.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.tags.inputValue;
      if (inputValue) {
        this.tags.dynamicTags.push(inputValue);
      }
      this.tags.inputVisible = false;
      this.tags.inputValue = "";
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "table-secondary";
      }
      return "";
    }
  }
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
