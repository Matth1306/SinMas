<template>
  <div class="admin-logger">
    <div class="card-form-container">
      <div v-show="stateForm" class="card form p-4">
        <div class="scroll">
          <div class="card-header p-0">Form Data Logger</div>
          <div class="card-body p-0">
            <h4>Sales Information</h4>
            <div class="form-group">
              <label class="control-label">Distributor</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Distributor"
                    v-model="formLogger.associateRole[1]"
                    @change="loadRes"
                  >
                    <el-option
                      v-for="item in listDist"
                      class="select-danger"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Reseller</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Reseller"
                    v-model="formLogger.associateRole[2]"
                    @change="loadSite"
                  >
                    <el-option
                      v-for="item in listRes"
                      class="select-danger"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Site</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Site"
                    v-model="formLogger.associateRole[3]"
                  >
                    <el-option
                      v-for="item in listSite"
                      class="select-danger"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div v-show="isDataValid">
              <h4>Location Information</h4>
              <div class="form-group">
                <label class="control-label">Province</label>
                <div>
                  <fg-input>
                    <el-select
                      class="select-default"
                      size="large"
                      placeholder="Select Province"
                      v-model="formLogger.region.prov"
                      @change="loadKabkot"
                    >
                      <el-option
                        v-for="item in listProv"
                        class="select-danger"
                        :value="item.value"
                        :label="item.label"
                        :key="item.label"
                      ></el-option>
                    </el-select>
                  </fg-input>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">City</label>
                <div>
                  <fg-input>
                    <el-select
                      class="select-default"
                      size="large"
                      placeholder="Select Province"
                      v-model="formLogger.region.kabkot"
                    >
                      <el-option
                        v-for="item in listKabkot"
                        class="select-danger"
                        :value="item.value"
                        :label="item.label"
                        :key="item.label"
                      ></el-option>
                    </el-select>
                  </fg-input>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.location[1]"
                    label="Longitude"
                  ></fg-input>
                </div>
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.location[0]"
                    label="Latitude"
                  ></fg-input>
                </div>
              </div>
              <h4>Sites Information</h4>
              <div class="form-group">
                <label class="control-label">Industry Type</label>
                <div>
                  <fg-input>
                    <el-select
                      class="select-default"
                      size="large"
                      placeholder="Select Industry Type"
                      v-model="formLogger.info.type"
                    >
                      <el-option
                        v-for="item in listType"
                        class="select-danger"
                        :value="item.value"
                        :label="item.label"
                        :key="item.label"
                      ></el-option>
                    </el-select>
                  </fg-input>
                </div>
              </div>
              <h4>Waste Information</h4>
              <div class="row">
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.info.wasteSource"
                    label="Waste Processing Technology"
                  ></fg-input>
                </div>
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.info.techType"
                    label="Waste Type"
                  ></fg-input>
                </div>
              </div>
              <!-- <div class="form-group">
              <div>
                <fg-input v-model="formLogger.techType" label="Waste Processing Technology"></fg-input>
              </div>
              </div>-->
              <h4>Permit Information</h4>
              <div class="row">
                <div class="col-4">
                  <fg-input
                    v-model="formLogger.info.permitStat[0]"
                    label="Permit Number"
                  ></fg-input>
                </div>
                <div class="col-4">
                  <fg-input
                    v-model="formLogger.info.permitStat[1]"
                    label="Permitter"
                  ></fg-input>
                </div>
                <div class="col-4">
                  <label>Permit Date</label>
                  <el-date-picker
                    class="w-100"
                    v-model="formLogger.info.permitStat[2]"
                    type="date"
                    value-format="d MMMM yyyy"
                    placeholder="Pick a day"
                  ></el-date-picker>
                  <!-- <fg-input v-model="formLogger.info.permitStat[2]" label="Permit Date" type="date"></fg-input> -->
                </div>
              </div>
              <h4>Device Information</h4>
              <div class="row">
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.info.brand"
                    label="Brand"
                  ></fg-input>
                </div>
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.info.model"
                    label="Model"
                  ></fg-input>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.info.MACadd"
                    label="MAC Address"
                  ></fg-input>
                </div>
                <div class="col-6">
                  <fg-input
                    v-model="formLogger.info.serialNum"
                    label="Serial Number"
                  ></fg-input>
                </div>
              </div>
              <h4>Sensor Information</h4>
              <div class="row">
                <div
                  class="col-12 row px-0 m-0"
                  v-for="(row, index) in formLogger.paramsRange"
                  :key="index"
                >
                  <div class="col-3">
                    <fg-input
                      v-model="formLogger.paramsRange[index].name"
                      label="Parameter"
                    ></fg-input>
                  </div>
                  <div class="col-3">
                    <fg-input
                      v-model="formLogger.paramsRange[index].range[0]"
                      label="Lower Threshold"
                    ></fg-input>
                  </div>
                  <div class="col-3">
                    <fg-input
                      v-model="formLogger.paramsRange[index].range[1]"
                      label="Upper Threshold"
                    ></fg-input>
                  </div>
                  <div class="col-2">
                    <fg-input
                      v-model="formLogger.paramsRange[index].unit"
                      label="Unit"
                    ></fg-input>
                  </div>
                  <div class="col-1 btnx px-0">
                    <p-button
                      type="danger"
                      icon
                      round
                      @click="deleteParamRow(index)"
                    >
                      <i class="nc-icon nc-simple-remove"></i>
                    </p-button>
                  </div>
                </div>
              </div>
              <p-button type="success" size="sm" @click="addParam"
                >Add Parameter</p-button
              >
            </div>
          </div>
          <div class="card-footer px-0">
            <p-button type="danger" round @click="closeForm">Cancel</p-button>
            <p-button
              class="ml-4"
              v-show="isDataValid"
              type="info"
              round
              @click="submitForm"
              >Submit</p-button
            >
          </div>
        </div>
      </div>
      <div v-show="stateUpdateFormParam" class="card form p-4">
        <div class="scroll">
          <div class="card-header p-0">Update Form Parameter Data Logger</div>
          <div class="card-body p-0">
            <div>
              <h4>Sites Information</h4>
              <div class="form-group">
                <label class="control-label">Industry Type</label>
                <div>
                  <fg-input>
                    <el-select
                      class="select-default"
                      size="large"
                      placeholder="Select Industry Type"
                      v-model="formLoggerUpdateParam.info.type"
                    >
                      <el-option
                        v-for="item in listType"
                        class="select-danger"
                        :value="item.value"
                        :label="item.label"
                        :key="item.label"
                      ></el-option>
                    </el-select>
                  </fg-input>
                </div>
              </div>
              <h4>Waste Information</h4>
              <div class="row">
                <div class="col-6">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.techType"
                    label="Waste Processing Technology"
                  ></fg-input>
                </div>
                <div class="col-6">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.wasteSource"
                    label="Waste Type"
                  ></fg-input>
                </div>
              </div>
              <h4>Permit Information</h4>
              <div class="row">
                <div class="col-4">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.permitStat[0]"
                    label="Permit Number"
                  ></fg-input>
                </div>
                <div class="col-4">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.permitStat[1]"
                    label="Permitter"
                  ></fg-input>
                </div>
                <div class="col-4">
                  <label>Permit Date</label>
                  <el-date-picker
                    class="w-100"
                    v-model="formLoggerUpdateParam.info.permitStat[2]"
                    type="date"
                    placeholder="Pick a day"
                    value-format="d MMMM yyyy"
                  ></el-date-picker>
                </div>
              </div>
              <h4>Device Information</h4>
              <div class="row">
                <div class="col-6">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.brand"
                    label="Brand"
                  ></fg-input>
                </div>
                <div class="col-6">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.model"
                    label="Model"
                  ></fg-input>
                </div>
              </div>
              <div class="row">
                <div class="col-6">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.MACadd"
                    label="MAC Address"
                  ></fg-input>
                </div>
                <div class="col-6">
                  <fg-input
                    v-model="formLoggerUpdateParam.info.serialNum"
                    label="Serial Number"
                  ></fg-input>
                </div>
              </div>
              <h4>Sensor Information</h4>
              <div class="row">
                <div
                  class="col-12 row px-0 m-0"
                  v-for="(row, index) in formLoggerUpdateParam.paramsRange"
                  :key="index"
                >
                  <div class="col-3">
                    <fg-input
                      v-model="formLoggerUpdateParam.paramsRange[index].name"
                      label="Parameter"
                    ></fg-input>
                  </div>
                  <div class="col-3">
                    <fg-input
                      v-model="
                        formLoggerUpdateParam.paramsRange[index].range[0]
                      "
                      label="Lower Threshold"
                    ></fg-input>
                  </div>
                  <div class="col-3">
                    <fg-input
                      v-model="
                        formLoggerUpdateParam.paramsRange[index].range[1]
                      "
                      label="Upper Threshold"
                    ></fg-input>
                  </div>
                  <div class="col-2">
                    <fg-input
                      v-model="formLoggerUpdateParam.paramsRange[index].unit"
                      label="Unit"
                    ></fg-input>
                  </div>
                  <div class="col-1 btnx px-0">
                    <p-button
                      type="danger"
                      icon
                      round
                      @click="deleteParamRowUpdate(index)"
                    >
                      <i class="nc-icon nc-simple-remove"></i>
                    </p-button>
                  </div>
                </div>
              </div>
              <p-button type="success" size="sm" @click="addParamUpdate"
                >Add Parameter</p-button
              >
            </div>
          </div>
          <div class="card-footer px-0">
            <p-button type="danger" round @click="closeForm">Cancel</p-button>
            <p-button
              class="ml-4"
              type="info"
              round
              @click="submitUpdateFormParam"
              >Update</p-button
            >
          </div>
        </div>
      </div>
      <div v-show="stateUpdateFormDrop" class="card form p-4">
        <div class="scroll">
          <div class="card-header p-0">Update Form Parameter Data Logger</div>
          <div class="card-body p-0">
            <h4>Sales Information</h4>
            <div class="form-group">
              <label class="control-label">Distributor</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Distributor"
                    v-model="formLoggerUpdateDrop.associateUser[1]"
                    @change="updateRes"
                  >
                    <el-option
                      v-for="item in listDist"
                      class="select-danger"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Reseller</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Reseller"
                    v-model="formLoggerUpdateDrop.associateUser[2]"
                    @change="updateSite"
                  >
                    <el-option
                      v-for="item in listRes"
                      class="select-danger"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Site</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Site"
                    v-model="formLoggerUpdateDrop.associateUser[3]"
                  >
                    <el-option
                      v-for="item in listSite"
                      class="select-danger"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
          </div>
          <div class="card-footer px-0">
            <p-button type="danger" round @click="closeForm">Cancel</p-button>
            <p-button
              class="ml-4"
              type="info"
              round
              @click="submitUpdateFormDrop"
              >Update</p-button
            >
          </div>
        </div>
      </div>
      <div v-show="stateUpdateFormLoc" class="card form p-4">
        <div class="scroll">
          <div class="card-header p-0">Update Form Parameter Data Logger</div>
          <div class="card-body p-0">
            <h4>Location Information</h4>
            <div class="form-group">
              <label class="control-label">Province</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Province"
                    v-model="formLoggerUpdateLoc.region.prov"
                    @change="updateKabkot"
                  >
                    <el-option
                      v-for="item in listProv"
                      class="select-danger"
                      :value="item.value"
                      :label="item.label"
                      :key="item.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">City</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Province"
                    v-model="formLoggerUpdateLoc.region.kabkot"
                  >
                    <el-option
                      v-for="item in listKabkot"
                      class="select-danger"
                      :value="item.value"
                      :label="item.label"
                      :key="item.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <fg-input
                  v-model="formLoggerUpdateLoc.location[1]"
                  label="Longitude"
                ></fg-input>
              </div>
              <div class="col-4">
                <fg-input
                  v-model="formLoggerUpdateLoc.location[0]"
                  label="Latitude"
                ></fg-input>
              </div>
            </div>
          </div>
          <div class="card-footer px-0">
            <p-button type="danger" round @click="closeForm">Cancel</p-button>
            <p-button
              class="ml-4"
              type="info"
              round
              @click="submitUpdateFormLoc"
              >Update</p-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 card">
        <div class="card-header row px-0 py-2">
          <div class="col-6 d-flex flex-column justify-content-center">
            <h4 class="m-0">Data Logger List</h4>
          </div>
          <div class="col-6 d-flex flex-row justify-content-end">
            <p-button class="btn-round" type="info" @click="addForm"
              >Add Logger</p-button
            >
          </div>
        </div>
        <div class="card-body row p-0">
          <div class="col-sm-6">
            <div class="pull-left">
              <fg-input
                class="input-sm"
                placeholder="Search"
                v-model="searchQuery"
                addon-right-icon="nc-icon nc-zoom-split"
              ></fg-input>
            </div>
          </div>
          <div class="col-md-6">
            <div class="pull-right col-md-2 p-0">
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
              :data="queriedData"
              border
            >
              <el-table-column
                label="Activation"
                min-width="140"
                align="center"
              >
                <!-- <div class="row m-0 w-100 justify-content-between"> -->
                <template slot-scope="saksake">
                  <p-button
                    class="m-1"
                    size="sm"
                    :type="setColor(saksake.$index, saksake.row)"
                    @click="setStatus(saksake.$index, saksake.row)"
                    >{{ setText(saksake.$index, saksake.row) }}</p-button
                  >
                  <p-button
                    class="m-1"
                    size="sm"
                    type="danger"
                    @click="deleteLogger(saksake.$index, saksake.row)"
                    >DELETE</p-button
                  >
                </template>
                <!-- </div> -->
              </el-table-column>
              <el-table-column
                label="UPDATE"
                min-width="250"
                prop="update"
                align="center"
              >
                <!-- <div class="row m-0 w-100 justify-content-between"> -->
                <template slot-scope="updateDelete">
                  <p-button
                    class="m-1"
                    size="sm"
                    type="info"
                    @click="getDistList(updateDelete.$index, updateDelete.row)"
                    >SALES INFO</p-button
                  >
                  <p-button
                    class="m-1"
                    size="sm"
                    type="info"
                    @click="getLocList(updateDelete.$index, updateDelete.row)"
                    >LOCATION</p-button
                  >
                  <p-button
                    class="m-1"
                    size="sm"
                    type="info"
                    @click="
                      updateFormParam(updateDelete.$index, updateDelete.row)
                    "
                    >DETAILS</p-button
                  >
                </template>
                <!-- </div> -->
              </el-table-column>
              <el-table-column
                v-for="header in tableColumn"
                :key="header.label"
                :min-width="header.minWidth"
                :prop="header.prop"
                :label="header.label"
                :align="header.align"
              ></el-table-column>
              <el-table-column
                label="Parameter"
                min-width="230"
                prop="paramsRange"
              >
                <template slot-scope="scope">
                  <template
                    v-for="item in queriedData[scope.$index].paramsRange"
                  >
                    <p-button
                      class="m-1"
                      size="sm"
                      type="info"
                      :key="item.$index"
                    >
                      {{ item.name }}
                    </p-button>
                  </template>
                </template>
              </el-table-column>
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
import {
  Collapse,
  CollapseItem,
  Tabs,
  TabPane,
  Card
} from "src/components/UIComponents";
import Swal from "sweetalert2/dist/sweetalert2.js";
import PSwitch from "src/components/UIComponents/Switch.vue";
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
    TabPane,
    Tabs,
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
          "/logger",
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
    isDataValid() {
      if (this.formLogger.associateRole[3] !== "") {
        return true;
      } else {
        return false;
      }
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
      datePicker: "",
      updateLogger: {
        associateRole: ["5e77b6d37b48030fbcfc216b", "", "", ""],
        // distributor: "Distributor B",
        // reseller: "Reseller B",
        // site: "PT. Intusi",
        info: {
          wasteSource: "",
          techType: "",
          permitStat: [, ,],
          type: ""
        },
        paramsRange: [
          {
            name: "pH",
            range: [,],
            unit: ""
          },
          {
            name: "COD",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "TSS",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "NH3N",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "Debit",
            range: [,],
            unit: "m3/s"
          }
        ],
        loggerID: "",
        region: {
          kabkot: "",
          prov: ""
        },
        location: [,],
        activationStatus: {}
      },
      listDist: {},
      formData: {
        id: "5eb56ddf3273cf3022f36c3c",
        loggerid: "5eb56ddf3273cf3022f36c3c",
        password: "1qaz2wsx3edc4rfv"
      },
      tableColumn: [
        {
          align: "left",
          prop: "loggerID",
          label: "Logger ID",
          minWidth: 220
        },
        {
          align: "left",
          prop: "site",
          label: "Site",
          minWidth: 200
        },
        {
          align: "left",
          prop: "reseller",
          label: "Reseller",
          minWidth: 200
        },
        {
          align: "left",
          prop: "distributor",
          label: "Distributor",
          minWidth: 200
        },
        {
          align: "center",
          prop: "location[1]",
          label: "Longitude",
          minWidth: 120
        },
        {
          align: "center",
          prop: "location[0]",
          label: "Latitude",
          minWidth: 120
        },
        {
          align: "left",
          prop: "region.kabkot",
          label: "City",
          minWidth: 200
        },
        {
          align: "left",
          prop: "region.prov",
          label: "Province",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.type",
          label: "Type",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.wasteSource",
          label: "Waste Source",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.techType",
          label: "Technology",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.permitStat[0]",
          label: "Permit Number",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.permitStat[1]",
          label: "Permitter",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.permitStat[2]",
          label: "Permit Date",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.brand",
          label: "Brand",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.model",
          label: "Model",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.MACadd",
          label: "MAC Address",
          minWidth: 200
        },
        {
          align: "left",
          prop: "info.serialNum",
          label: "Serial Number",
          minWidth: 200
        }
      ],
      tableData: "",
      stateForm: false,
      stateUpdateFormDrop: false,
      stateUpdateFormParam: false,
      stateUpdateFormLoc: false,
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
      propsToSearch: ["id", "name", "email", "address", "phone"],
      tableColumns: [
        {
          prop: "id",
          label: "No",
          minWidth: 100
        },
        {
          prop: "name",
          label: "Name",
          minWidth: 220
        },
        {
          prop: "email",
          label: "email",
          minWidth: 220
        },
        {
          prop: "address",
          label: "Address",
          minWidth: 450
        },
        {
          prop: "phone",
          label: "Phone",
          minWidth: 150
        }
      ],
      listProv: "",
      listType: [
        { value: "Rayon", label: "Rayon" },
        { value: "Pulp dan Kertas", label: "Pulp dan Kertas" },
        { value: "Kertas", label: "Kertas" },
        { value: "Petrokimia Hulu", label: "Petrokimia Hulu" },
        { value: "Oleokimia Dasar", label: "Oleokimia Dasar" },
        { value: "Kelapa Sawit", label: "Kelapa Sawit" },
        { value: "Kilang Minyak", label: "Kilang Minyak" },
        {
          value: "Eksplorasi dan Produksi Minyak dan Gas",
          label: "Eksplorasi dan Produksi Minyak dan Gas"
        },
        {
          value: "Pertambangan Emas dan Tembaga",
          label: "Pertambangan Emas dan Tembaga"
        },
        { value: "Pertambangan Batubara", label: "Pertambangan Batubara" },
        { value: "Tekstil", label: "Tekstil" },
        { value: "Pertambangan Nikel", label: "Pertambangan Nikel" },
        { value: "Pupuk", label: "Pupuk" }
      ],
      listKabkot: "",
      tableData: [],
      dateTimePicker: "",
      listSite: {},
      listRes: "",
      formLogger: {
        associateRole: ["5e77b6d37b48030fbcfc216b", "", "", ""],
        // distributor: "Distributor B",
        // reseller: "Reseller B",
        // site: "PT. Intusi",
        info: {
          wasteSource: "",
          techType: "",
          permitStat: [, ,],
          type: ""
        },
        paramsRange: [
          {
            index: 0,
            name: "pH",
            range: [,],
            unit: ""
          },
          {
            index: 1,
            name: "COD",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 2,
            name: "TSS",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 3,
            name: "NH3N",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 4,
            name: "Debit",
            range: [,],
            unit: "m3/s"
          }
        ],
        loggerID: "",
        region: {
          kabkot: "",
          prov: ""
        },
        location: [,],
        activationStatus: {}
      },
      colorStatus: "danger",
      formLoggerUpdateDrop: {
        associateUser: ["5e77b6d37b48030fbcfc216b", "", "", ""],
        loggerID: ""
      },
      formLoggerUpdateLoc: {
        loggerID: "",
        region: {
          kabkot: "",
          prov: ""
        },
        location: [,],
        info: {
          type: ""
        }
      },
      formLoggerUpdateParam: {
        // distributor: "Distributor B",
        // reseller: "Reseller B",
        // site: "PT. Intusi",
        info: {
          type: "",
          wasteSource: "",
          techType: "",
          permitStat: [, ,],
          brand: "",
          model: "",
          MACadd: "",
          serialNum: ""
        },
        paramsRange: [
          {
            name: "pH",
            range: [,],
            unit: ""
          },
          {
            name: "COD",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "TSS",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "NH3N",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "Debit",
            range: [,],
            unit: "m3/s"
          }
        ],
        loggerID: ""
      }
    };
  },
  methods: {
    addParamUpdate() {
      let addRowParamUpdate = {
        title: "",
        range: [,],
        unit: ""
      };
      this.formLoggerUpdateParam.paramsRange.push(addRowParamUpdate);
    },
    deleteParamRowUpdate(ind) {
      this.formLoggerUpdateParam.paramsRange.splice(ind, 1);
    },
    addParam() {
      let addRowParam = {
        title: "",
        range: [,],
        unit: ""
      };
      this.formLogger.paramsRange.push(addRowParam);
    },
    deleteParamRow(ind) {
      this.formLogger.paramsRange.splice(ind, 1);
    },
    submitUpdateFormLoc() {
      axios
        .put(
          "http://103.126.226.54:4000/api/logger/" +
            this.formLoggerUpdateLoc.loggerID +
            "/update",
          this.formLoggerUpdateLoc,
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/list/" +
                this.$store.state.userId +
                "/logger",
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
        });
      this.stateUpdateFormLoc = false;
    },
    submitUpdateFormDrop() {
      axios
        .put(
          "http://103.126.226.54:4000/api/logger/" +
            this.formLoggerUpdateDrop.loggerID +
            "/update",
          this.formLoggerUpdateDrop,
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/list/" +
                this.$store.state.userId +
                "/logger",
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
        });
      this.stateUpdateFormDrop = false;
    },
    getLocList(row, data) {
      this.stateUpdateFormLoc = true;
      this.formLoggerUpdateLoc = data;
      axios
        .get("http://103.126.226.54:4000/api/loc/prov", {
          headers: { token: this.$store.state.tokenId }
        })
        .then(response => {
          this.listProv = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getDistList(row, data) {
      this.stateUpdateFormDrop = true;
      this.formLoggerUpdateDrop = {
        associateUser: ["5e77b6d37b48030fbcfc216b", "", "", ""],
        loggerID: ""
      };
      this.formLoggerUpdateDrop.loggerID = data.loggerID;

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
    submitUpdateFormParam() {
      axios
        .put(
          "http://103.126.226.54:4000/api/logger/" +
            this.formLoggerUpdateParam.loggerID +
            "/update",
          this.formLoggerUpdateParam,
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/list/" +
                this.$store.state.userId +
                "/logger",
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
        });
      this.stateUpdateFormParam = false;
    },
    updateFormParam(row, data) {
      this.formLoggerUpdateParam = data;
      this.stateUpdateFormParam = true;
    },
    deleteLogger(row, data) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .get(
              "http://103.126.226.54:4000/api/logger/" +
                data.loggerID +
                "/delete",
              {
                headers: { token: this.$store.state.tokenId }
              }
            )
            .then(response => {
              axios
                .get(
                  "http://103.126.226.54:4000/api/ent/bill/list/" +
                    this.$store.state.userId +
                    "/logger",
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
            });
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    setText(hiih, color) {
      if (color.activationStatus.on === true) {
        return "Active";
      } else {
        return "Not Active";
      }
    },
    setColor(hiih, color) {
      if (color.activationStatus.on === true) {
        return "success";
      } else {
        return "danger";
      }
    },
    setStatus(haha, status) {
      if (status.activationStatus.on === true) {
        axios
          .get(
            "http://103.126.226.54:4000/api/logger/" +
              status.loggerID +
              "/deactivate",
            {
              headers: { token: this.$store.state.tokenId }
            }
          )
          .then(response => {
            axios
              .get(
                "http://103.126.226.54:4000/api/ent/bill/list/" +
                  this.$store.state.userId +
                  "/logger",
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
          });
      } else {
        axios
          .get(
            "http://103.126.226.54:4000/api/logger/" +
              status.loggerID +
              "/activate",
            {
              headers: { token: this.$store.state.tokenId }
            }
          )
          .then(response => {
            axios
              .get(
                "http://103.126.226.54:4000/api/ent/bill/list/" +
                  this.$store.state.userId +
                  "/logger",
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
          });
      }
    },
    loadKabkot() {
      this.formLogger.region.kabkot = "";
      axios
        .get(
          "http://103.126.226.54:4000/api/loc/" +
            this.formLogger.region.prov +
            "/kabkot",
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listKabkot = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadSite() {
      this.formLogger.associateRole[3] = "";
      axios
        .get(
          "http://103.126.226.54:4000/api/users/reg-list/" +
            this.formLogger.associateRole[2],
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listSite = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadRes() {
      this.formLogger.associateRole[2] = "";
      this.formLogger.associateRole[3] = "";

      axios
        .get(
          "http://103.126.226.54:4000/api/users/reg-list/" +
            this.formLogger.associateRole[1],
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listRes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateRes() {
      this.formLoggerUpdateDrop.associateUser[2] = "";
      this.formLoggerUpdateDrop.associateUser[3] = "";

      axios
        .get(
          "http://103.126.226.54:4000/api/users/reg-list/" +
            this.formLoggerUpdateDrop.associateUser[1],
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listRes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateSite() {
      this.formLoggerUpdateDrop.associateUser[3] = "";
      axios
        .get(
          "http://103.126.226.54:4000/api/users/reg-list/" +
            this.formLoggerUpdateDrop.associateUser[2],
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listSite = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateKabkot() {
      this.formLoggerUpdateLoc.region.kabkot = "";
      axios
        .get(
          "http://103.126.226.54:4000/api/loc/" +
            this.formLoggerUpdateLoc.region.prov +
            "/kabkot",
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          this.listKabkot = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
      axios
        .get("http://103.126.226.54:4000/api/loc/prov", {
          headers: { token: this.$store.state.tokenId }
        })
        .then(response => {
          this.listProv = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitForm() {
      axios
        .post(
          "http://103.126.226.54:4000/api/logger/register",
          this.formLogger,
          {
            headers: { token: this.$store.state.tokenId }
          }
        )
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/list/" +
                this.$store.state.userId +
                "/logger",
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
      this.formLogger = {
        associateRole: ["5e77b6d37b48030fbcfc216b", "", "", ""],
        distributor: "Distributor B",
        reseller: "Reseller B",
        site: "PT. Intusi",
        info: {
          wasteSource: "",
          techType: "",
          permitStat: [, ,],
          brand: "",
          model: "",
          MACadd: "",
          serialNum: ""
        },
        paramsRange: [
          {
            name: "pH",
            range: [,],
            unit: ""
          },
          {
            name: "COD",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "TSS",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "NH3N",
            range: [,],
            unit: "mg/L"
          },
          {
            name: "Debit",
            range: [,],
            unit: "m3/s"
          }
        ],
        loggerID: "",
        region: {
          kabkot: "",
          prov: ""
        },
        location: [,],
        activationStatus: {}
      };
      this.listDist = {};
      this.listRes = {};
      this.listSite = {};
      this.listKabkot = {};
      this.stateForm = false;
    },
    closeForm() {
      this.stateUpdateFormDrop = false;
      this.stateUpdateFormLoc = false;
      this.stateUpdateFormParam = false;
      this.stateForm = false;
      this.formLogger = {
        associateRole: ["5e77b6d37b48030fbcfc216b", "", "", ""],
        distributor: "Distributor B",
        reseller: "Reseller B",
        site: "PT. Intusi",
        info: {
          wasteSource: "",
          techType: "",
          permitStat: [, ,],
          brand: "",
          model: "",
          MACadd: "",
          serialNum: ""
        },
        paramsRange: [
          {
            index: 0,
            name: "pH",
            range: [,],
            unit: ""
          },
          {
            index: 1,
            name: "COD",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 2,
            name: "TSS",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 3,
            name: "NH3N",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 4,
            name: "Debit",
            range: [,],
            unit: "m3/s"
          }
        ],
        loggerID: "",
        region: {
          kabkot: "",
          prov: ""
        },
        location: [,],
        activationStatus: {}
      };
      this.formLoggerUpdateParam = {
        associateRole: ["5e77b6d37b48030fbcfc216b", "", "", ""],
        // distributor: "Distributor B",
        // reseller: "Reseller B",
        // site: "PT. Intusi",
        info: {
          type: "",
          wasteSource: "",
          techType: "",
          permitStat: [, ,],
          brand: "",
          model: "",
          MACadd: "",
          serialNum: ""
        },
        paramsRange: [
          {
            index: 0,
            name: "pH",
            range: [,],
            unit: ""
          },
          {
            index: 1,
            name: "COD",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 2,
            name: "TSS",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 3,
            name: "NH3N",
            range: [,],
            unit: "mg/L"
          },
          {
            index: 4,
            name: "Debit",
            range: [,],
            unit: "m3/s"
          }
        ],
        loggerID: "",
        region: {
          kabkot: "",
          prov: ""
        },
        location: [,],
        activationStatus: {}
      };
      this.listDist = {};
      this.listRes = {};
      this.listSite = {};
      this.listKabkot = {};
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
.btnx {
  margin-top: 12px;
}
.el-table .td-actions {
  button.btn {
    margin-right: 5px;
  }
}
.card-form-container {
  position: fixed;
  width: calc(100% - 320px);
  z-index: 10;
  .form {
    box-shadow: 0 0 20px -2px rgba(0, 0, 0, 0.15);
    display: block;
    left: 50%;
    margin: auto;
    height: calc(80vh - 4rem - 93px);
    overflow: scroll;
    position: absolute;
    text-align: left;
    top: 4rem;
    transform: translateX(-50%);
    width: 60%;
    .scroll {
      max-height: 100%;
      overflow: scroll;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .card-header {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
    }
    .card-body {
      min-height: 465px;
    }
    .card-footer {
      text-align: right;
    }
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.cell {
  text-align: center;
  padding: 5px;
}
</style>
<style lang="scss">
.admin-logger {
  .el-table {
    table {
      tbody {
        tr {
          td {
            vertical-align: top;
          }
        }
      }
    }
  }
  .cell {
    text-align: inherit;
    vertical-align: top;
    word-break: normal;
  }
}
</style>
