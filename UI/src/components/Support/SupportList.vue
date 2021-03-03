<template>
  <div class="support-list">
    <div class="card col-6 ml-auto mr-auto">
      <div class="card-header">
        <h5 class="card-title">Support Contact</h5>
      </div>
      <div class="card-body col">
        <div class="row">
          <div class="col-6">
            <fg-input v-model="formEmail.from" label="Your Email"></fg-input>
          </div>

          <div class="col-6">
            <fg-input v-model="formEmail.name" label="Your Name"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <fg-input v-model="formEmail.subject" label="Subject"></fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-12 form-group">
            <label>Message</label>
            <textarea
              v-model="formEmail.message"
              class="form-control"
              rows="5"
            ></textarea>
            <!-- <fg-input v-model="formEmail.message" label="Message"></fg-input> -->
          </div>
        </div>
      </div>
      <div class="card-footer" style="text-align:right;margin:10px">
        <p-button type="info" @click="sendEmail(formEmail)" round
          >Submit</p-button
        >
      </div>
    </div>
    <div v-if="false">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Active Support List</h5>
        </div>
        <div class="card-body row p-2">
          <div class="col-sm-12 m-0">
            <el-table :data="tableData[1]" stripe>
              <el-table-column min-width="30">
                <div
                  slot-scope="scope"
                  v-if="tableData[1][scope.$index].solved"
                  class="indicator solved"
                ></div>
                <div v-else class="indicator"></div>
              </el-table-column>
              <el-table-column
                v-for="header in tableData[0]"
                :key="header.label"
                :label="header.label"
                :property="header.prop"
                :min-width="header.width"
                :align="header.align"
              ></el-table-column>
              <el-table-column align="right" min-width="32">
                <div class="pull-left" slot-scope="props">
                  <p-button
                    type="info"
                    size="sm"
                    icon
                    @click="handleLike(props.$index, props.row)"
                    round
                  >
                    <i class="nc-icon nc-settings-gear-65"></i>
                  </p-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Completed Support List</h5>
        </div>
        <div class="card-body row p-2">
          <div class="col-sm-12 m-0">
            <el-table :data="tableData[1]" stripe>
              <el-table-column min-width="30">
                <div
                  slot-scope="scope"
                  v-if="tableData[1][scope.$index].solved"
                  class="indicator solved"
                ></div>
                <div v-else class="indicator"></div>
              </el-table-column>
              <el-table-column
                v-for="header in tableData[0]"
                :key="header.label"
                :label="header.label"
                :property="header.prop"
                :min-width="header.width"
                :align="header.align"
              ></el-table-column>
              <el-table-column align="right" min-width="32">
                <div class="pull-left" slot-scope="props">
                  <p-button
                    type="info"
                    size="sm"
                    icon
                    @click="handleLike(props.$index, props.row)"
                    round
                  >
                    <i class="nc-icon nc-settings-gear-65"></i>
                  </p-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
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
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
export default {
  created() {
    this.$store.commit("setIsTopNavbarSelect", false);
  },
  methods: {
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
  },
  data() {
    return {
      formEmail: {
        from: "",
        name: "",
        subject: "",
        message: ""
      },
      tableData: [
        [
          {
            align: "left",
            label: "ID",
            prop: "id",
            width: 64
          },
          {
            align: "left",
            label: "Site",
            prop: "site",
            width: 180
          },
          {
            align: "left",
            label: "Type",
            prop: "type",
            width: 120
          },
          {
            align: "left",
            label: "Description",
            prop: "description",
            width: 400
          },
          {
            align: "left",
            label: "Reporter",
            prop: "reporter",
            width: 120
          },
          {
            align: "center",
            label: "Reported Time",
            prop: "reportedTime",
            width: 72
          },
          {
            align: "center",
            label: "Resolved Time",
            prop: "resolvedTime",
            width: 72
          }
        ],
        [
          {
            solved: true,
            id: "ID123456",
            site: "Very Very Very Long Site Name",
            type: "Very Longn Item Type",
            description:
              "Very Long Item Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            reporter: "Intusi Reporter",
            reportedTime: "30/12/2020",
            resolvedTime: "30/12/2020"
          },
          {
            solved: false,
            id: "ID123456",
            site: "Very Very Very Long Site Name",
            type: "Very Longn Item Type",
            description:
              "Very Long Item Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            reporter: "Intusi Reporter",
            reportedTime: "30/12/2020",
            resolvedTime: "30/12/2020"
          },
          {
            solved: true,
            id: "ID123456",
            site: "Very Very Very Long Site Name",
            type: "Very Longn Item Type",
            description:
              "Very Long Item Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            reporter: "Intusi Reporter",
            reportedTime: "30/12/2020",
            resolvedTime: "30/12/2020"
          },
          {
            solved: true,
            id: "ID123456",
            site: "Very Very Very Long Site Name",
            type: "Very Longn Item Type",
            description:
              "Very Long Item Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            reporter: "Intusi Reporter",
            reportedTime: "30/12/2020",
            resolvedTime: "30/12/2020"
          },
          {
            solved: false,
            id: "ID123456",
            site: "Very Very Very Long Site Name",
            type: "Very Longn Item Type",
            description:
              "Very Long Item Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            reporter: "Intusi Reporter",
            reportedTime: "30/12/2020",
            resolvedTime: "30/12/2020"
          },
          {
            solved: true,
            id: "ID123456",
            site: "Very Very Very Long Site Name",
            type: "Very Longn Item Type",
            description:
              "Very Long Item Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            reporter: "Intusi Reporter",
            reportedTime: "30/12/2020",
            resolvedTime: "30/12/2020"
          },
          {
            solved: true,
            id: "ID123456",
            site: "Very Very Very Long Site Name",
            type: "Very Longn Item Type",
            description:
              "Very Long Item Description. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            reporter: "Intusi Reporter",
            reportedTime: "30/12/2020",
            resolvedTime: "30/12/2020"
          }
        ]
      ],
      productsTable: [
        {
          image: "static/img/tables/agenda.png",
          title: "Notebook",
          subTitle: "Most beautiful agenda for the office.",
          price: 49,
          quantity: 1
        },
        {
          image: "static/img/tables/stylus.jpg",
          title: "Stylus",
          subTitle:
            "Design is not just what it looks like and feels like. Design is how it works.",
          price: 499,
          quantity: 2
        },
        {
          image: "static/img/tables/evernote.png",
          title: "Evernote iPad Stander",
          subTitle:
            "A groundbreaking Retina display. All-flash architecture. Fourth-generation Intel processors.",
          price: 799,
          quantity: 1
        }
      ]
    };
  },
  beforeMount() {
    this.$store.dispatch("removeDroplistCek");
    this.$store.commit("showTitle");
  }
};
</script>

<style lang="scss">
.message {
  height: 300px;
}
.support-list {
  .card .card-header {
    padding: 15px 15px 0;
  }
  .el-table {
    font-size: 10px;
    table {
      thead {
        tr {
          th {
            font-size: 10px;
            padding: 0;
            .cell {
              padding: 0 4px;
            }
          }
        }
      }
      tbody {
        tr {
          td {
            vertical-align: top;
          }
        }
      }
    }
    .cell {
      padding: 0;
      text-align: inherit;
      word-break: break-word;
    }
    .td-actions {
      button.btn {
        margin-right: 50px;
      }
    }
  }
  .indicator {
    background-color: red;
    border-radius: 50%;
    height: 1rem;
    width: 1rem;
  }
  .solved {
    background-color: green;
  }
}
</style>
