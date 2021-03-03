<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="card-header">
        <h4 class="title">Data Table</h4>
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
        <div class="col-sm-6">
          <div class="pull-right">
            <el-select class="select-defaultt" v-model="pagination.perPage" placeholder="Per page">
              <el-option
                class="select-defaultt"
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="col-sm-12 mt-2">
          <el-table :cell-style="{padding:'4px'}" :data="tempTable" border>
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
import { Table, TableColumn, Select, Option, Tag } from "element-ui";
import PPagination from "src/components/UIComponents/Pagination.vue";
import users from "./users";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  components: {
    PPagination,
    [Tag.name]: Tag
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
        "time",
        "ph",
        "cod",
        "tss",
        "nh3n",
        "debit",
        "bebancod",
        "bebantss"
      ],
      tableColumns: [
        {
          prop: "id",
          label: "No",
          minWidth: 60
        },
        {
          prop: "time",
          label: "Time",
          minWidth: 160
        },
        {
          prop: "ph",
          label: "pH",
          minWidth: 80
        },
        {
          prop: "cod",
          label: "COD",
          minWidth: 90
        },
        {
          prop: "tss",
          label: "TSS",
          minWidth: 90
        },
        {
          prop: "nh3n",
          label: "NH3N",
          minWidth: 90
        },
        {
          prop: "debit",
          label: "Debit",
          minWidth: 90
        },
        {
          prop: "bebancod",
          label: "Beban COD",
          minWidth: 110
        },
        {
          prop: "bebantss",
          label: "Beban TSS",
          minWidth: 100
        }
      ],
      tableData: users,
      tempTable: []
    };
  },
  beforeMount() {
    this.tempTable = this.tableData.slice(this.from, this.to);
  },
  methods: {
    queriedData() {
      if (this.tags.dynamicTags.length === 0) {
        this.pagination.total = this.tempTable.length;
        return this.pagedData;
      }

      let result = this.tempTable.filter(row => {
        let isIncluded = false;

        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();

          if (
            rowValue.includes(
              this.tags.dynamicTags[this.tags.dynamicTags.length - 1]
            )
          ) {
            isIncluded = true;
          }
        }
        return isIncluded;
      });
      this.pagination.total = result.length;

      this.tempTable = result.slice(this.from, this.to);
    },
    search(items, constraints) {
      return items.filter(item =>
        constraints.every(constraint =>
          item.tags.some(obj => obj.value === constraint)
        )
      );
    },
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
      this.queriedData();
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
