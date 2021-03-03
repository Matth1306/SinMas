<template>
  <div v-if="token" class="wrapper">
    <side-bar type="sidebar" :sidebar-links="$sidebar.sidebarLinks">
      <user-menu></user-menu>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"></dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
.wrapper::-webkit-scrollbar {
  display: none;
}
.wrapper {
  -ms-overflow-style: none;
}
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import UserMenu from "src/components/UIComponents/SidebarPlugin/UserMenu.vue";

export default {
  computed: {
    token() {
      return this.$store.getters.isToken;
    }
  },

  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    UserMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
  created() {
    const auth = JSON.parse(localStorage.getItem("auth-data"));
    !auth
      ? this.$router.push("/logout")
      : this.$store.dispatch("sakSakEJenengOpo", {
          user: auth._id,
          name: auth.email,
          role: auth.role
        });
    if (auth) {
      this.$store.commit("setAuthData", auth);
      if (auth.associateLogger) {
        this.$store.commit("setMillsActive", auth.associateLogger);
      }
    }
  }
};
</script>
<style lang="scss">
.el-date-editor {
  .el-range-separator {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .el-input__icon {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}
.mista-loading {
  min-height: calc(100vh - 124px);
}
.notification-container {
  top: 0;
  z-index: 10;
  .icon {
    height: 48px;
    width: 48px;
    .part-1 {
      height: 24px;
      width: 10px;
      margin-bottom: 4px;
    }
    .part-2 {
      height: 10px;
      width: 10px;
    }
  }
  .el-table {
    thead {
      tr {
        background-color: #ffffff99;
        th {
          background-color: #ffffff00;
          color: black;
        }
        th.is-left {
          .cell {
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: left;
            text-align: left;
          }
        }
        th.is-right {
          .cell {
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: flex-end;
            text-align: right;
          }
        }
        th.is-center {
          .cell {
            display: flex;
            flex-flow: row;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
        }
      }
    }
    .el-table__body-wrapper {
      height: 36vh;
      overflow: scroll;
    }
    tbody {
      tr {
        background-color: #ffffff66;
        td {
          color: black;
        }
        td.is-left {
          .cell {
            display: flex;
            flex-flow: row;
            justify-content: left;
            text-align: left;
          }
        }
        td.is-right {
          .cell {
            display: flex;
            flex-flow: row;
            justify-content: flex-end;
            text-align: right;
          }
        }
        td.is-center {
          .cell {
            display: flex;
            flex-flow: row;
            justify-content: center;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
