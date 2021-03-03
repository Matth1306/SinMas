<template>
  <div class="admin-logger">
    <div class="card-form-container">
      <div v-if="stateForm" class="card form p-4">
        <div class="scroll">
          <div class="card-header p-0">Form Activation</div>
          <div class="card-body p-0">
            <h4>Activation Information</h4>
            <div class="form-group">
              <label class="control-label">ID</label>
              <div>
                <input
                  type="text"
                  :placeholder="formData.id"
                  disabled
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Perlu kah Logger ID?</label>
              <div>
                <input
                  type="text"
                  :placeholder="formData.loggerid"
                  disabled
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Perlu kah Password?</label>
              <div>
                <input
                  type="password"
                  :placeholder="formData.password"
                  disabled
                  class="form-control"
                />
              </div>
            </div>
            <h4>Site Information</h4>
            <div class="form-group">
              <label class="control-label">Province</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Province"
                    v-model="selects.simple"
                  >
                    <el-option
                      v-for="option in selects.countries"
                      class="select-danger"
                      :value="option.value"
                      :label="option.label"
                      :key="option.label"
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
                    placeholder="Select City"
                    v-model="selects.simple"
                  >
                    <el-option
                      v-for="option in selects.countries"
                      class="select-danger"
                      :value="option.value"
                      :label="option.label"
                      :key="option.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <fg-input label="Longitude"></fg-input>
              </div>
              <div class="col-4">
                <fg-input label="Latitude"></fg-input>
              </div>
              <div class="col-4">
                <fg-input label="Zoom"></fg-input>
              </div>
            </div>
            <h4>Sales Information</h4>
            <div class="form-group">
              <label class="control-label">Distributor</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Distributor"
                    v-model="selects.simple"
                  >
                    <el-option
                      v-for="option in selects.countries"
                      class="select-danger"
                      :value="option.value"
                      :label="option.label"
                      :key="option.label"
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
                    v-model="selects.simple"
                  >
                    <el-option
                      v-for="option in selects.countries"
                      class="select-danger"
                      :value="option.value"
                      :label="option.label"
                      :key="option.label"
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
                    v-model="selects.simple"
                  >
                    <el-option
                      v-for="option in selects.countries"
                      class="select-danger"
                      :value="option.value"
                      :label="option.label"
                      :key="option.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <h4>Technology Information</h4>
            <div class="form-group">
              <label class="control-label">Waste Processing Technology</label>
              <div>
                <fg-input>
                  <el-select
                    class="select-default"
                    size="large"
                    placeholder="Select Waste Processing Technology"
                    v-model="selects.simple"
                  >
                    <el-option
                      v-for="option in selects.countries"
                      class="select-danger"
                      :value="option.value"
                      :label="option.label"
                      :key="option.label"
                    ></el-option>
                  </el-select>
                </fg-input>
              </div>
            </div>
            <h4>Permit Information</h4>
            <div class="row">
              <div class="col-4">
                <fg-input label="Permit Number"></fg-input>
              </div>
              <div class="col-4">
                <fg-input label="Permitter"></fg-input>
              </div>
              <div class="col-4">
                <fg-input label="Permit Date"></fg-input>
              </div>
            </div>
            <h4>Device Information</h4>
            <div class="row">
              <div class="col-4">
                <fg-input label="Brand"></fg-input>
              </div>
              <div class="col-4">
                <fg-input label="Model"></fg-input>
              </div>
              <div class="col-4">
                <fg-input label="Serial Number"></fg-input>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <fg-input label="MAC Address"></fg-input>
              </div>
              <div class="col-6">
                <fg-input label="API Version"></fg-input>
              </div>
            </div>
            <h4>Sensor Information</h4>
            <div class="row">
              <div class="col-11 row px-0 m-0">
                <div class="col-3">
                  <fg-input label="Parameter"></fg-input>
                </div>
                <div class="col-3">
                  <fg-input label="Lower Threshold"></fg-input>
                </div>
                <div class="col-3">
                  <fg-input label="Upper Threshold"></fg-input>
                </div>
                <div class="col-3">
                  <fg-input label="Unit"></fg-input>
                </div>
              </div>
              <div class="col-1 m-0 pt-3 px-0 row justify-content-around">
                <p-button type="danger" icon round>
                  <i class="nc-icon nc-simple-remove"></i>
                </p-button>
              </div>
            </div>
            <p-button type="default" size="sm">Add Parameter</p-button>
          </div>
          <div class="card-footer px-0">
            <p-button class="mr-4" type="danger" round @click="closeForm"
              >Cancel</p-button
            >
            <p-button type="info" round @click="submitForm">Submit</p-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 card">
        <div class="card-header row px-0 py-2">
          <div class="col-6 d-flex flex-column justify-content-center">
            <h4 class="m-0">Activation List</h4>
          </div>
          <div class="col-6 d-flex flex-row justify-content-end">
            <p-button class="btn-round" type="info" @click="addForm"
              >Add Activation</p-button
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
                v-for="header in tableDataDummy[0]"
                :key="header.label"
                :min-width="header.minWidth"
                :prop="header.prop"
                :label="header.label"
                :align="header.align"
              ></el-table-column>
              <el-table-column
                label="Parameter"
                min-width="400"
                prop="parameters"
              >
                <template slot-scope="scope">
                  <template v-for="item in queriedData[scope.$index].parameter">
                    <p-button class="m-1" size="sm" type="info">{{
                      item.name
                    }}</p-button>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                label="Action"
                min-width="100"
                prop="action"
                align="center"
              >
                <div class="row m-0 w-100 justify-content-between">
                  <p-button size="sm" type="info" icon round @click="addForm">
                    <i class="nc-icon nc-settings-gear-65"></i>
                  </p-button>
                  <p-button size="sm" type="danger" icon round>
                    <i class="nc-icon nc-simple-remove"></i>
                  </p-button>
                </div>
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
          "/dis",
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
    pagedData() {
      return this.tableDataDummy[1].slice(this.from, this.to);
    },
    /***
     * Searches through table data and returns a paginated array.
     * Note that this should not be used for table with a lot of data as it might be slow!
     * Do the search and the pagination on the server and display the data retrieved from server instead.
     * @returns {computed.pagedData}
     */
    queriedData() {
      if (!this.searchQuery) {
        this.pagination.total = this.tableDataDummy[1].length;
        return this.pagedData;
      }
      let result = this.tableDataDummy[1].filter(row => {
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
      this.pagination.total = this.tableDataDummy[1].length;
      return this.tableDataDummy[1].length;
    }
  },
  data() {
    return {
      formData: {
        id: "5eb56ddf3273cf3022f36c3c",
        loggerid: "5eb56ddf3273cf3022f36c3c",
        password: "1qaz2wsx3edc4rfv"
      },
      selects: {
        simple: "",
        countries: [
          { value: "Bahasa Indonesia", label: "Bahasa Indonesia" },
          { value: "Bahasa Melayu", label: "Bahasa Melayu" },
          { value: "Català", label: "Català" },
          { value: "Dansk", label: "Dansk" },
          { value: "Deutsch", label: "Deutsch" },
          { value: "English", label: "English" },
          { value: "Español", label: "Español" },
          { value: "Eλληνικά", label: "Eλληνικά" },
          { value: "Français", label: "Français" },
          { value: "Italiano", label: "Italiano" },
          { value: "Magyar", label: "Magyar" },
          { value: "Nederlands", label: "Nederlands" },
          { value: "Norsk", label: "Norsk" },
          { value: "Polski", label: "Polski" },
          { value: "Português", label: "Português" },
          { value: "Suomi", label: "Suomi" },
          { value: "Svenska", label: "Svenska" },
          { value: "Türkçe", label: "Türkçe" },
          { value: "Íslenska", label: "Íslenska" },
          { value: "Čeština", label: "Čeština" },
          { value: "Русский", label: "Русский" },
          { value: "ภาษาไทย", label: "ภาษาไทย" },
          { value: "中文 (简体)", label: "中文 (简体)" },
          { value: 'W">中文 (繁體)', label: 'W">中文 (繁體)' },
          { value: "日本語", label: "日本語" },
          { value: "한국어", label: "한국어" }
        ],
        multiple: "ARS"
      },
      tableDataDummy: [
        [
          {
            align: "left",
            prop: "id",
            label: "ID",
            minWidth: 200
          },
          {
            align: "left",
            prop: "loggerid",
            label: "Logger ID",
            minWidth: 200
          },
          {
            align: "left",
            prop: "password",
            label: "Password",
            minWidth: 200
          },
          {
            align: "left",
            prop: "province",
            label: "Province",
            minWidth: 200
          },
          {
            align: "left",
            prop: "city",
            label: "City",
            minWidth: 200
          },
          {
            align: "center",
            prop: "longitude",
            label: "Longitude",
            minWidth: 120
          },
          {
            align: "center",
            prop: "latitude",
            label: "Latitude",
            minWidth: 120
          },
          {
            align: "center",
            prop: "zoom",
            label: "Zoom",
            minWidth: 100
          },
          {
            align: "left",
            prop: "distributor",
            label: "Distributor",
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
            prop: "site",
            label: "Site",
            minWidth: 200
          },
          {
            align: "left",
            prop: "technology",
            label: "Technology",
            minWidth: 200
          },
          {
            align: "left",
            prop: "permitid",
            label: "Permit Number",
            minWidth: 200
          },
          {
            align: "left",
            prop: "permitter",
            label: "Permitter",
            minWidth: 200
          },
          {
            align: "left",
            prop: "permitdate",
            label: "Permit Date",
            minWidth: 200
          },
          {
            align: "left",
            prop: "brand",
            label: "Brand",
            minWidth: 200
          },
          {
            align: "left",
            prop: "model",
            label: "Model",
            minWidth: 200
          },
          {
            align: "left",
            prop: "sn",
            label: "Serial Number",
            minWidth: 200
          },
          {
            align: "left",
            prop: "mac",
            label: "MAC Address",
            minWidth: 200
          },
          {
            align: "left",
            prop: "api",
            label: "API Version",
            minWidth: 100
          }
        ],
        [
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          },
          {
            id: "5eb56ddf3273cf3022f36c3c",
            loggerid: "5eb56ddf3273cf3022f36c3c",
            password: "1qaz2wsx3edc4rfv",
            province: "DKI Jakarta",
            city: "Bekasi",
            longitude: -6.187466,
            latitude: 106.985316,
            zoom: 12,
            distributor: "PT Intusi Distribution Indonesia",
            reseller: "PT Intusi Reselling Indonesia",
            site: "PT Intusi Industry Indonesia",
            technology: "Recycling",
            permitid: "5eb56ddf3273cf3022f36c3c",
            permitter: "PT Intusi Regulation Indonesia",
            permitdate: "30/12/2020",
            brand: "Intusi Brand",
            model: "Intusi Model",
            sn: "INTUSI-SN17081945",
            mac: "1Q-2W-3E-4R-5T-6Y",
            api: "v1.1.0",
            parameter: [
              {
                name: "Alpha",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Bravo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Charlie",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Delta",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Echo",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Foxtrot",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Golf",
                range: [12, 34],
                unit: "param/unit"
              },
              {
                name: "Hotel",
                range: [12, 34],
                unit: "param/unit"
              }
            ]
          }
        ]
      ],
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
    },
    submitForm() {
      axios
        .post(
          "http://103.126.226.54:4000/api/users/register",
          this.formDistributor
        )
        .then(response => {
          axios
            .get(
              "http://103.126.226.54:4000/api/ent/bill/list/" +
                this.$store.state.userId +
                "/dis",
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
  position: fixed;
  width: calc(100% - 320px);
  z-index: 1;
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
    z-index: 10;
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
