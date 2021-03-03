<template>
  <div class="admin-reseller">
    <div class="card-form-container">
      <div v-if="stateForm" class="card form p-4">
        <div class="card-header mb-4">Form Reseller</div>
        <div class="card-body p-0">
          <label class="control-label">Select Distributor</label>
          <el-select
            class="select-default w-100"
            v-model="formReseller.associateRole[1]"
            placeholder="Select Distributor"
          >
            <el-option
              class="select-danger"
              v-for="item in listDist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <div class="row">
            <div class="col-6">
              <fg-input
                label="Email"
                type="email"
                v-model="formReseller.email"
              ></fg-input>
            </div>
            <div class="col-6">
              <fg-input
                label="Password"
                type="password"
                v-model="formReseller.password"
              ></fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <fg-input
                v-model="formReseller.fullName"
                label="Full Name"
              ></fg-input>
            </div>
            <div class="col-6">
              <fg-input
                label="Company Name"
                v-model="formReseller.compName"
              ></fg-input>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <fg-input
                label="Company Address"
                v-model="formReseller.compAddress"
              ></fg-input>
            </div>
            <div class="col-6">
              <fg-input
                label="Company Phone"
                v-model="formReseller.compTlp"
              ></fg-input>
            </div>
          </div>
        </div>
        <div class="card-footer px-0">
          <p-button class="mr-2" type="danger" round @click="closeForm"
            >Cancel</p-button
          >
          <p-button type="info" round @click="submitForm">Submit</p-button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 card">
        <div class="card-header row px-0 py-2">
          <div class="col-6 d-flex flex-column justify-content-center">
            <h4 class="m-0">Reseller List</h4>
          </div>
          <div
            v-if="isAdminShow"
            class="col-6 d-flex flex-row justify-content-end"
          >
            <p-button type="info" @click="addForm" round>Add Reseller</p-button>
          </div>
        </div>
        <div class="card-body row p-0">
          <!-- <div class="col-xl-12" style="margin-left:20px">
          <h6>Filter</h6>
          </div>-->
          <div class="col-sm-6">
            <div class="pull-left">
              <!-- <el-tag
              :key="tag"
              v-for="tag in tags.dynamicTags"
              type="primary"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)"
              >{{tag}}</el-tag>-->

              <!-- <input
              type="text"
              placeholder="Add new tag"
              class="form-control input-new-tag"
              v-model="tags.inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter="handleInputConfirm"
              @blur="handleInputConfirm"
              />-->
              <fg-input
                class="input-sm"
                placeholder="Search"
                v-model="searchQuery"
                addon-right-icon="nc-icon nc-zoom-split"
              ></fg-input>
            </div>
          </div>
          <div class="col-md-6">
            <div class="pull-right col-md-2 p-0" style="width: 111px">
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
// import FileInput from "./FileInput";
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
import users from "./users";
import axios from "axios";
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
  created() {
    axios
      .get(
        "http://103.126.226.54:4000/api/ent/bill/list/" +
          this.$store.state.userId +
          "/res",
        {
          headers: { token: this.$store.state.tokenId }
        }
      )
      .then(response => {
        this.tableData = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
    isAdminShow() {
      return this.$store.getters.isAdmin;
    },
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
        this.pagination.total = this.tableData.length;
        return this.pagedData;
      }
      let result = this.tableData.filter(row => {
        let isIncluded = false;
        for (let key of this.propsToSearch) {
          let rowValue = row[key].toString();
          if (rowValue.includes && rowValue.includes(this.searchQuery)) {
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
      listDist: {},
      formReseller: {
        email: "",
        password: "",
        fullName: "",
        compName: "",
        compAddress: "",
        compTlp: "",
        role: "reseller",
        associateRole: ["5e77b6d37b48030fbcfc216b", ""]
      },
      stateForm: false,
      modelValidations: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          min: 5
        },
        confirmPassword: {
          required: true,
          confirmed: "password"
        },
        compName: {
          required: true
        },
        compAddress: {
          required: true
        },
        compTlp: {
          required: true
        }
      },

      pagination: {
        perPage: 15,
        currentPage: 1,
        perPageOptions: [15, 30, 45, 60],
        total: 0
      },
      searchQuery: "",
      propsToSearch: ["id", "name", "email", "address", "phone", "distributor"],
      tableColumns: [
        {
          align: "left",
          prop: "id",
          label: "No",
          minWidth: 100
        },
        {
          align: "left",
          prop: "name",
          label: "Name",
          minWidth: 220
        },
        {
          align: "left",
          prop: "distributor",
          label: "Distributor",
          minWidth: 220
        },
        {
          align: "left",
          prop: "email",
          label: "email",
          minWidth: 220
        },
        {
          align: "left",
          prop: "address",
          label: "Address",
          minWidth: 450
        },
        {
          align: "left",
          prop: "phone",
          label: "Phone",
          minWidth: 150
        },
        {
          align: "left",
          prop: "sumind",
          label: "Total Sites",
          minWidth: 130
        }
      ],
      tableData: [],
      dateTimePicker: ""
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    filesChange(files) {
      this.inputs.file = files;
    },
    addForm() {
      this.stateForm = true;
      axios
        .get(
          "http://103.126.226.54:4000/api/users/reg-list/5e77b6d37b48030fbcfc216b",
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listDist = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm() {
      axios
        .post(
          "http://103.126.226.54:4000/api/users/register",
          this.formReseller
        )
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/list/" +
                this.$store.state.userId +
                "/res",
              {
                headers: { token: this.$store.state.tokenId }
              }
            )
            .then(response => {
              this.tableData = response.data;
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(err => {
          console.log(error);
        });

      this.stateForm = false;
    },
    closeForm() {
      this.stateForm = false;
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
.el-table .td-actions {
  button.btn {
    margin-right: 5px;
  }
}
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
.admin-reseller {
  .cell {
    text-align: inherit;
    vertical-align: top;
    word-break: normal;
  }
}
</style>
