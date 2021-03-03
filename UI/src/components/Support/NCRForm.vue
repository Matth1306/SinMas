<template>
  <div class="ncr-form">
    <div class="card">
      <div class="card-header px-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <h4>Form</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body px-3 pb-4">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6">
              <fg-input
                v-if="isEntry"
                v-model="form.id"
                label="LK Number"
                placeholder="Masukan nomor LK"
                @change="dummyCheck"
              ></fg-input>
              <template v-else>
                <label>LK Number</label>
                <p>{{ form.id }}</p>
              </template>
            </div>
            <div class="col-6">
              <fg-input v-if="isEntry" label="Release Data">
                <el-date-picker
                  v-model="form.date"
                  type="date"
                  placeholder="Pilih tanggal terbit"
                  format="yyyy/MM/dd"
                  value-format="timestamp"
                ></el-date-picker>
              </fg-input>
              <template v-else>
                <label>Release Date</label>
                <p>{{ momentTS(form.date) }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <fg-input v-if="isEntry" label="Mills / Unit">
                <el-select
                  class="select-default w-100"
                  size="large"
                  placeholder="Pilih mills / unit"
                  v-model="form.site"
                >
                  <el-option
                    v-for="(item, index) in select.site"
                    :key="index"
                    class="select-default"
                    :value="item.value"
                    :label="item.label"
                  ></el-option></el-select
              ></fg-input>
              <template v-else>
                <label>Mills / Unit</label>
                <p>{{ getMillsName(form.site) }}</p>
              </template>
            </div>
            <div v-if="false" class="col-6">
              <fg-input v-if="isEntry" label="Status">
                <el-select
                  class="select-default w-100"
                  size="large"
                  placeholder="Pilih status"
                  v-model="form.status"
                >
                  <el-option
                    v-for="(item, index) in select.status"
                    :key="index"
                    class="select-default"
                    :value="index"
                    :label="item"
                  ></el-option>
                </el-select>
              </fg-input>
              <template v-else>
                <label>Status</label>
                <p>{{ select.status[form.status] }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <fg-input v-if="isEntry" label="Condition">
                <el-select
                  class="select-default w-100"
                  size="large"
                  placeholder="Pilih kondisi"
                  v-model="form.condition"
                  @change="inputCheckCondition"
                >
                  <el-option
                    v-for="(item, index) in select.condition"
                    :key="index"
                    class="select-default"
                    :value="index"
                    :label="item"
                  ></el-option>
                </el-select>
              </fg-input>
              <template v-else>
                <label>Condition</label>
                <p>{{ select.condition[form.condition] }}</p>
              </template>
            </div>
          </div>
          <!-- <div v-if="form.condition == 0" class="row"> -->
          <div class="row">
            <div class="col-12">
              <fg-input v-if="isEntry" label="Abnormal Condition">
                <el-select
                  class="select-default w-100"
                  size="large"
                  placeholder="Pilih detail kondisi tidak normal"
                  v-model="form.abnormal"
                  :disabled="form.condition != 0"
                  @change="inputCheckAbnormal"
                >
                  <el-option
                    v-for="(item, index) in select.abnormal"
                    :key="index"
                    class="select-default"
                    :value="index"
                    :label="item"
                  ></el-option>
                </el-select>
              </fg-input>
              <template v-else>
                <label>Abnormal Condition</label>
                <p>
                  {{
                    select.abnormal[form.abnormal]
                      ? select.abnormal[form.abnormal]
                      : "Invalid"
                  }}
                </p>
              </template>
            </div>
          </div>
          <!-- <div v-if="form.abnormal == 2" class="row"> -->
          <div class="row">
            <div class="col-12">
              <fg-input v-if="isEntry" label="Other Abnormal Condition">
                <el-select
                  class="select-default w-100"
                  size="large"
                  placeholder="Pilih detail kondisi lain"
                  v-model="form.otherAbnormality"
                  :disabled="form.abnormal != 2"
                >
                  <el-option
                    v-for="(item, index) in select.otherAbnormality"
                    :key="index"
                    class="select-default"
                    :value="index"
                    :label="item"
                  ></el-option>
                </el-select>
              </fg-input>
              <template v-else>
                <label>Other Abnormal Condition</label>
                <p>
                  {{
                    select.otherAbnormality[form.otherAbnormality]
                      ? select.otherAbnormality[form.otherAbnormality]
                      : "Invalid"
                  }}
                </p>
              </template>
            </div>
          </div>
          <!-- <div v-if="form.condition == 1" class="row"> -->
          <div class="row">
            <div class="col-12">
              <fg-input v-if="isEntry" label="Emergency Condition">
                <el-select
                  class="select-default w-100"
                  size="large"
                  placeholder="Pilih detail kondisi darurat"
                  v-model="form.emergency"
                  :disabled="form.condition != 1"
                >
                  <el-option
                    v-for="(item, index) in select.emergency"
                    :key="index"
                    class="select-default"
                    :value="index"
                    :label="item"
                  ></el-option>
                </el-select>
              </fg-input>
              <template v-else>
                <label>Emergency Condition</label>
                <p>
                  {{
                    select.emergency[form.emergency]
                      ? select.emergency[form.emergency]
                      : "Invalid"
                  }}
                </p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <fg-input v-if="isEntry" label="Facility/Unit">
                <el-select
                  class="select-default w-100"
                  size="large"
                  placeholder="Pilih fasilitas/unit"
                  v-model="form.unit"
                  @change="inputCheckUnit"
                >
                  <el-option
                    v-for="(item, index) in select.unit"
                    :key="index"
                    class="select-default"
                    :value="index"
                    :label="item"
                  ></el-option>
                </el-select>
              </fg-input>
              <template v-else>
                <label>Facility/Unit</label>
                <p>{{ select.unit[form.unit] }}</p>
              </template>
            </div>
          </div>
          <!-- <div v-if="form.unit == 3" class="row"> -->
          <div class="row">
            <div class="col-12">
              <fg-input v-if="isEntry" label="Other Facility/Unit">
                <textarea
                  v-model="form.otherUnit"
                  class="form-control"
                  rows="1"
                  :disabled="form.unit != 3"
                ></textarea>
              </fg-input>
              <template v-else>
                <label>Other Facility/Unit</label>
                <p>{{ form.otherUnit }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group">
              <template v-if="isEntry">
                <label>Description</label>
                <textarea
                  v-model="form.description"
                  class="form-control"
                  rows="5"
                ></textarea>
              </template>
              <template v-else>
                <label>Description</label>
                <p>{{ form.description }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group">
              <template v-if="isEntry">
                <label>Root Problem Analytic</label>
                <textarea
                  v-model="form.rootProblem"
                  class="form-control"
                  rows="5"
                ></textarea>
              </template>
              <template v-else>
                <label>Root Problem Analytic</label>
                <p>{{ form.rootProblem }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-12 form-group">
              <template v-if="isEntry">
                <label>Repair Actions and Preventions</label>
                <textarea
                  v-model="form.action"
                  class="form-control"
                  rows="5"
                ></textarea>
              </template>
              <template v-else>
                <label>Repair Actions and Preventions</label>
                <p>{{ form.action }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <fg-input v-if="isEntry" label="Date">
                <el-date-picker
                  v-model="form.actionDate"
                  type="date"
                  placeholder="Pilih tanggal terbit"
                  format="yyyy/MM/dd"
                  value-format="timestamp"
                ></el-date-picker>
              </fg-input>
              <template v-else>
                <label>Date</label>
                <p>{{ form.actionDate }}</p>
              </template>
            </div>
            <div class="col-6">
              <fg-input v-if="isEntry" label="Complete Target">
                <el-date-picker
                  v-model="form.actionDue"
                  type="date"
                  placeholder="Pilih tanggal selesai"
                  format="yyyy/MM/dd"
                  value-format="timestamp"
                ></el-date-picker>
              </fg-input>
              <template v-else>
                <label>Complete Target</label>
                <p>{{ form.actionDue }}</p>
              </template>
            </div>
          </div>
          <div v-if="false" class="row">
            <div class="col-12 form-group">
              <template v-if="isEntry">
                <label>Verification</label>
                <textarea
                  v-model="form.verification"
                  class="form-control"
                  rows="5"
                ></textarea>
              </template>
              <template v-else>
                <label>Verification</label>
                <p>{{ form.verification }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <fg-input v-if="isEntry" label="Date">
                <el-date-picker
                  v-model="form.verificationDate"
                  type="date"
                  placeholder="Pilih tanggal"
                  format="yyyy/MM/dd"
                  value-format="timestamp"
                ></el-date-picker>
              </fg-input>
              <template v-else>
                <label>Date</label>
                <p>{{ form.verificationDate }}</p>
              </template>
            </div>
            <div class="col-6">
              <fg-input
                v-if="isEntry"
                v-model="form.verificationStatus"
                label="Closing Status"
                placeholder=""
              ></fg-input>
              <template v-else>
                <label>Closing Status</label>
                <p>{{ form.verificationStatus }}</p>
              </template>
            </div>
          </div>
          <div class="row">
            <div class="col pt-4">
              <template v-if="isEntry">
                <input
                  type="file"
                  id="file"
                  ref="file"
                  @change="inputFileHandle"
                />
                <div>
                  <label>{{ form.file.name }}</label>
                  <div>
                    <img :src="form.file.path" />
                  </div>
                </div>
              </template>
              <template v-else>
                <label>{{ form.file.name }}</label>
                <div>
                  <img :src="form.file.preview" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col text-right pb-4">
              <p-button v-if="isEntry" type="info" @click="submitHandle" round
                >Submit</p-button
              >
              <p-button v-else type="info" @click="sendEmail(form)" round
                >Edit</p-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="popup.show"
      class="position-fixed vw-100 vh-100 d-flex align-items-center"
      style="
        background-color: rgba(0, 0, 0, 0.2);
        top: 0px;
        left: 0px;
        z-index: 1000;
      "
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div v-if="popup.state == 0" class="card p-4 bg-danger text-center">
              <div class="card-header p-0">
                <h2>Failed</h2>
              </div>
              <div class="card-body p-0">
                <p>
                  Make sure to fill every input required for registering data.
                </p>
                <p-button
                  v-if="isEntry"
                  class="m-0"
                  type="default"
                  round
                  @click="
                    () => {
                      popup.show = false;
                    }
                  "
                  >Close</p-button
                >
              </div>
            </div>
            <div v-if="popup.state == 1" class="card p-4 text-center">
              <div class="card-header p-0">
                <h2>Upload</h2>
              </div>
              <div class="card-body p-0">
                <p>Data is ready to be uploaded. Confirm to submit data.</p>
                <p-button
                  v-if="isEntry"
                  class="mx-2 my-0"
                  type="danger"
                  round
                  @click="
                    () => {
                      popup.show = false;
                    }
                  "
                  >Close</p-button
                >
                <p-button
                  v-if="isEntry"
                  class="mx-2 my-0"
                  type="default"
                  round
                  @click="submitData"
                  >Confirm</p-button
                >
              </div>
            </div>
            <div v-if="popup.state == 2" class="card p-4 bg-info text-center">
              <div class="card-header p-0">
                <h2>Uploading</h2>
              </div>
              <div class="card-body p-0">
                <p>Please wait. Data is being upload.</p>
              </div>
            </div>
            <div
              v-if="popup.state == 3"
              class="card p-4 bg-success text-center"
            >
              <div class="card-header p-0">
                <h2>Success</h2>
              </div>
              <div class="card-body p-0">
                <p>Data is uploaded. Confirm to open NCR List page.</p>
                <p-button
                  v-if="isEntry"
                  class="m-0"
                  type="default"
                  round
                  @click="
                    () => {
                      popup.show = false;
                      $router.push('list');
                    }
                  "
                  >Confirm</p-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import swal from "sweetalert2/dist/sweetalert2.js";
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
import PSwitch from "src/components/UIComponents/Switch.vue";
import axios from "axios";
import moment from "moment";

var jsonQuery = require("json-query");

export default {
  components: {
    [Tag.name]: Tag,
    [Option.name]: Option,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Select.name]: Select,
    [Input.name]: Input,
    PSwitch
  },
  data() {
    return {
      isEntry: true,
      form: {
        id: null,
        date: null,
        site: null,
        status: 0,
        condition: null,
        abnormal: null,
        otherAbnormality: null,
        emergency: null,
        unit: null,
        otherUnit: null,
        description: null,
        rootProblem: null,
        action: null,
        actionDate: null,
        actionDue: null,
        verification: null,
        verificationDate: null,
        verificationStatus: null,
        file: {
          name: null,
          path: null,
          temp: null
        }
      },
      popup: {
        show: false,
        state: 0
      },
      select: {
        site: [
          { label: "Mill Alpha", value: "1" },
          { label: "Mill Bravo", value: "2" },
          { label: "Mill Charlie", value: "3" },
          { label: "Mill Delta", value: "4" }
        ],
        status: ["Open", "Closed"],
        condition: ["Kondisi tidak normal", "Kondisi darurat"],
        abnormal: [
          "Penghentian sementara dan penyalaan kembali operasi produksi",
          "Kalibrasi peralatan",
          "Kondisi lain yang menyebabkan SPARING tidak dapat digunakan secara optimal"
        ],
        otherAbnormality: [
          "Perbaikan IPAL (Perlu diperhatikan bahwa pada saat startup dan shutdown IPAL akan ber-pengaruh terhadap nilai kadar/kualitas air limbah)",
          "Perbaikan produksi",
          "Gangguan supply listrik"
        ],
        emergency: [
          "Bencana alam dapat berupa banjir, gempa bumi, gunung meletus, gangguan binatang, dan lain sebagainya",
          "Gangguan keamanan, dapat berupa pencurian, perusakan, dan lain sebagainya"
        ],
        unit: [
          "Alat Sparing",
          "Alat IPAL",
          "Alat Sparing dan Alat IPAL",
          "Lainnya"
        ]
      }
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage() {
      this.$store.commit("setIsTopNavbarSelect", false);
      this.getMillsArray();
    },
    dummyCheck() {
      if (this.form.id === "generate()") {
        this.dummy();
      }
    },
    dummy() {
      var num = Math.floor(Math.random() * 9999);
      let tex = "";
      if (num < 10) {
        tex = "000" + num;
      } else if (num < 100) {
        tex = "00" + num;
      } else if (num < 1000) {
        tex = "0" + num;
      } else {
        tex = num.toString();
      }
      var site = this.select.site[
        Math.floor(Math.random() * this.select.site.length)
      ];
      var year = new Date().getFullYear();
      var date = Date.now();
      this.form = {
        id: tex + "/LK/SPARING/" + site.label + "/" + year,
        date: date,
        site: site.value,
        status: 0,
        condition: Math.floor(Math.random() * this.select.condition.length),
        abnormal: Math.floor(Math.random() * this.select.abnormal.length),
        otherAbnormality: Math.floor(
          Math.random() * this.select.otherAbnormality.length
        ),
        emergency: Math.floor(Math.random() * this.select.emergency.length),
        unit: Math.floor(Math.random() * this.select.unit.length),
        otherUnit: "Dummy",
        description: "Dummy",
        rootProblem: "Dummy",
        action: "Dummy",
        actionDate: date,
        actionDue: date,
        verification: "Dummy",
        verificationDate: date,
        verificationStatus: "Dummy",
        file: {
          name: null,
          path: null,
          temp: null
        }
      };
    },
    submitData() {
      this.popup.state = 2;
      let formData = new FormData();
      formData.append("file", this.form.file.temp);
      let that = this;
      axios
        .post(this.$store.state.apiURL + "file", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          // console.log("SUCCESS UPLOAD IMAGE", response);
          let data = that.form;
          data.file.path = response.data.path;
          delete data.file.temp;
          axios
            .post(that.$store.state.apiURL + "ncr", data, {
              headers: {
                "Content-Type": "application/json"
              }
            })
            .then(response => {
              // console.log("SUCCESS SUBMIT FORM", response);
              that.popup.state = 3;
            })
            .catch(error => {
              // console.log("FAILURE", error);
              that.popup.state = 0;
            });
        })
        .catch(error => {
          // console.log("FAILURE", error);
          that.popup.state = 0;
        });
    },
    submitHandle() {
      if (
        this.form.action == null ||
        this.form.actionDate == null ||
        this.form.actionDue == null ||
        this.form.condition == null ||
        this.form.date == null ||
        this.form.description == null ||
        this.form.file.name == null ||
        this.form.id == null ||
        this.form.rootProblem == null ||
        this.form.site == null ||
        this.form.unit == null ||
        // this.form.verification == null ||
        this.form.verificationDate == null
      ) {
        this.popup.state = 0;
        this.popup.show = true;
      } else {
        this.popup.state = 1;
        this.popup.show = true;
      }
    },
    inputFileHandle() {
      // var file = e.target.files || e.dataTransfer.files;
      // var image = file[0];
      // console.log(image.name);
      // if (!file.length) return;
      // this.form.file.name = image.name;
      // this.createImage(file[0]);
      var image = this.$refs.file.files[0];
      this.form.file.temp = image;
      this.form.file.name = image.name;
      this.form.file.path = URL.createObjectURL(image);
    },
    createImage(file) {
      var preview = new Image();
      var reader = new FileReader();
      var vm = this.form.file;

      reader.onload = e => {
        vm.preview = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.image = "";
    },
    inputCheckCondition() {
      if (this.form.condition == 0) {
        this.form.emergency = null;
      } else {
        this.form.abnormal = null;
        this.form.otherAbnormality = null;
      }
    },
    inputCheckAbnormal() {
      if (this.form.abnormal != 2) {
        this.form.otherAbnormality = null;
      }
    },
    inputCheckUnit() {
      if (this.form.unit != 3) {
        this.form.otherUnit = null;
      }
    },
    momentTS(time) {
      return moment(time).format("YYYY/M/D");
    },
    getMillsName(id) {
      let data = {
        array: this.select.site
      };
      return jsonQuery(`array[value=${id}].label`, { data: data }).value;
    },
    getMillsArray() {
      axios
        .get(
          this.$store.state.apiURL +
            "logger/list/" +
            this.$store.state.auth.data._id
        )
        .then(response => {
          // console.log(response.data);
          let data = response.data;
          let array = [];
          for (let index = 0; index < data.length; index++) {
            array.push({
              label: data[index].milsName,
              value: data[index]._id
            });
          }
          this.select.site = array;
        });
    },
    sendEmail(data) {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be send an email",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, sent it!"
      }).then(result => {
        if (result.value) {
          var kirim = {
            subject: data.subject,
            text:
              "From: " +
              data.from +
              "\n" +
              "Name: " +
              data.name +
              "\n\n" +
              data.message
          };
          axios
            .post("http://103.126.226.54:4000/api/support/mail", kirim, {
              headers: { token: this.$store.state.tokenId }
            })
            .then(response => {});
          Swal.fire("Sent!", "Your message has been sent.", "success");
        }
      });
    }
  }
};
</script>

<style lang="scss">
.message {
  height: 300px;
}
.ncr-form {
  .el-select {
    .is-disabled {
      .el-input__inner {
        background: lightgray;
        border: none;
        cursor: not-allowed !important;
        &:hover {
          background: lightgray;
        }
      }
      .el-input__suffix {
        display: none;
      }
    }
  }
}
</style>
