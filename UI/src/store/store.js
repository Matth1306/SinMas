import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueRouter from "vue-router";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    userId: "ID01",
    roleId: "hq",
    tokenId:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc3YjZkMzdiNDgwMzBmYmNmYzIxNmIiLCJpYXQiOjE2MDc1NzE1NzksImV4cCI6MTYwNzU3NTE3OX0.QgU8nTeKTho6b7Tusf6JEOLQNrQ2j3Z1mRUt8D00ZfM",
    listId: null,
    listName: null,
    titleName: null,
    droplistCek: false,
    titleShow: true,
    listArray: [],
    userName: "Admin Intusi",
    URL: "http://localhost:4000",
    apiURL: "http://localhost:4000/api/",
    auth: {
      admin: "5ff6c5ca6b3a059e91c85a52",
      data: null
    },
    mills: {
      active: "",
      array: []
    },
    isTopNavbarSelect: true,
    isTopNavbarSelectAll: true,
    bus: {
      ncr: {
        entry: true,
        data: null
      }
    }
  },
  mutations: {
    setBusNCRData(state, content) {
      state.bus.ncr.data = content;
    },
    setBusNCREntry(state, content) {
      state.bus.ncr.entry = content;
    },
    setAuthData(state, content) {
      state.auth.data = content;
    },
    setIsTopNavbarSelect(state, content) {
      state.isTopNavbarSelect = content;
    },
    setIsTopNavbarSelectAll(state, content) {
      state.isTopNavbarSelectAll = content;
    },
    setMillsActive(state, content) {
      state.mills.active = content;
    },
    setMillsArray(state, content) {
      state.mills.array = content;
    },
    insertListArray(state, arrayValue) {
      state.listArray = arrayValue.array;
    },
    showTitle(state) {
      state.titleShow = true;
    },
    hideTitle(state) {
      state.titleShow = false;
    },
    setTitle(state, titleData) {
      state.titleName = titleData.data;
    },
    insertDroplist(state) {
      state.droplistCek = true;
    },
    removeDroplist(state) {
      state.droplistCek = false;
    },
    getListData(state, listData) {
      state.listId = listData.list;
      state.listName = listData.name;
    },
    getListDataSecond(state, listDataa) {
      state.listId = listDataa.list;
      state.listName = listDataa.name;
    },
    authUser(state, userData) {
      state.userId = userData.user;
      state.roleId = userData.role;
      state.tokenId = userData.token;
      state.userName = userData.name;
    },
    clearAuthData(state) {
      state.userId = null;
      state.roleId = null;
      state.tokenId = null;
    },
    clearList(state) {
      state.listId = null;
      state.listName = null;
    }
  },
  actions: {
    logout({ commit }) {
      commit("clearAuthData");
    },
    sakSakEJenengOpo({ commit }, authData) {
      commit("authUser", {
        user: authData.user,
        role: authData.role,
        token: authData.token,
        name: authData.name
      });
    },
    tempList({ commit }, listData_) {
      commit("getListData", {
        list: listData_.list,
        name: listData_.name
      });
    },
    tempListSecond({ commit }, listDataa_) {
      commit("getListDataSecond", {
        list: listDataa_.list,
        name: listDataa_.name
      });
    },
    clearListId({ commit }) {
      commit("clearList");
    },
    insertDroplistCek({ commit }) {
      commit("insertDroplist");
    },
    removeDroplistCek({ commit }) {
      commit("removeDroplist");
    },
    getTitle({ commit }, titleData_) {
      commit("setTitle", {
        data: titleData_.data
      });
    }
  },
  getters: {
    findListName(state) {
      for (let i = 0; i < state.listArray.length; i++) {
        if (state.listName === state.listArray[i].label) {
          state.listId = state.listArray[i].value[0];

          return;
        }
      }
    },
    isTitleShowStore(state) {
      return state.titleShow;
    },
    isAdmin(state) {
      return state.roleId === "hq";
    },
    isDistributor(state) {
      return state.roleId === "distributor";
    },
    isReseller(state) {
      return state.roleId === "reseller";
    },
    isIndustri(state) {
      return state.roleId === "industri";
    },
    isToken(state) {
      return state.tokenId !== null;
    },
    activeMills(state) {
      return state.mills.active;
    },
    droplistCheck(state) {
      if (state.droplistCek === true && state.roleId !== "industri") {
        return true;
      } else {
        return false;
      }
    }
  }
});
