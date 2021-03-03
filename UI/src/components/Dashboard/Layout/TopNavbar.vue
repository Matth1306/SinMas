<template>
  <navbar v-model="showNavbar">
    <div class="navbar-wrapper">
      <div class="navbar-minimize">
        <button
          id="minimizeSidebar"
          class="btn btn-icon btn-round"
          @click="minimizeSidebar"
        >
          <i
            class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"
          ></i>
          <i
            class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"
          ></i>
        </button>
      </div>
      <div class="navbar-toggle">
        <navbar-toggle-button
          @click.native="toggleSidebar"
        ></navbar-toggle-button>
      </div>
      <div>
        <a class="navbar-brand p-0">SPARING</a>
        <span v-show="true" class="navbar-dash px-2 d-none d-md-inline">-</span>
        <a v-show="true" class="navbar-site-name d-block d-md-inline">{{
          $route.name
        }}</a>
      </div>
    </div>

    <template slot="navbar-menu">
      <div class="select-site p-0" v-if="$store.state.isTopNavbarSelect">
        <fg-input>
          <el-select
            class="select-default"
            size="large"
            placeholder="Pilih Mill"
            v-model="form.mills"
            @change="setMillsActive()"
          >
            <el-option
              v-if="$store.state.isTopNavbarSelectAll"
              class="select-default"
              value=""
              label="All Mills"
            ></el-option>
            <el-option
              v-for="item in $store.state.mills.array"
              :key="item.id"
              class="select-default"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </fg-input>
      </div>
    </template>
  </navbar>
</template>
<script>
import {
  DatePicker,
  TimeSelect,
  Slider,
  Tag,
  Input,
  Button,
  Select,
  Option
} from "element-ui";
import { Navbar, NavbarToggleButton } from "src/components/UIComponents";
import PProgress from "src/components/UIComponents/Progress.vue";
import PSwitch from "src/components/UIComponents/Switch.vue";
import axios from "axios";

export default {
  components: {
    Navbar,
    NavbarToggleButton,
    [Input.name]: Input,
    [Button.name]: Button,
    [Option.name]: Option,
    [Select.name]: Select,
    PSwitch,
    PProgress
  },
  data() {
    return {
      form: {
        mills: ""
      },
      // titleAppear: true,
      titleSite: "",
      // droplistValue: false,
      nameList: "PT. Distributor",
      activeNotifications: false,
      showNavbar: false,
      listValue: "0",
      selects: {
        sites: [
          {
            value:
              "http://103.126.226.54:4000/api/ind/dashboard/overview/5e77c8bc03b1f31155e617e4",
            label: "PT Industri"
          }
        ],
        multiple: "ARS"
      }
    };
  },
  computed: {
    activeMills() {
      return this.$store.state.mills.active;
    }
  },
  watch: {
    activeMills(newActive, oldActive) {
      this.form.mills = newActive;
    }
  },
  created() {
    this.getMillsArray();
  },
  methods: {
    getMillsArray() {
      const auth = JSON.parse(localStorage.getItem("auth-data"));
      axios
        .get(this.$store.state.apiURL + "logger/list/" + auth._id)
        .then(response => {
          // console.log(response.data);
          let data = response.data;
          let array = [];
          for (let index = 0; index < data.length; index++) {
            array.push({
              id: data[index]._id,
              name: data[index].milsName
            });
          }
          this.$store.commit("setMillsArray", array);
        });
    },
    setMillsActive() {
      this.$store.commit("setMillsActive", this.form.mills);
    },
    listValueChange() {
      this.$store.dispatch("tempList", {
        list: this.listValue[0],
        name: this.listValue[1]
      });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    minimizeSidebar() {
      this.$sidebar.toggleMinimize();
    },
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar-wrapper {
  .navbar-dash,
  .navbar-site-name {
    color: #66615b;
  }
}
</style>
