<template>
  <div class="user">
    <div class="photo">
      <!-- <img src="static/img/faces/janto.jpg" alt="user avatar" /> -->
    </div>
    <div class="info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click="toggleMenu"
        href="#"
      >
        <span>
          {{ this.$store.state.userName }}
          <b class="caret"></b>
        </span>
      </a>
      <div class="clearfix"></div>
      <div>
        <collapse-transition>
          <ul class="nav nav-menu" v-show="!isClosed">
            <li>
              <a href="#">
                <i class="nc-icon nc-simple-remove"></i>
                <span class="sidebar-normal" @click="onLogout">LOG OUT</span>
              </a>
            </li>
            <!-- <li>
              <a href="#">
                <span class="sidebar-mini-icon">Ep</span>
                <span class="sidebar-normal">Edit Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="sidebar-mini-icon">S</span>
                <span class="sidebar-normal">Settings</span>
              </a>
            </li>-->
          </ul>
        </collapse-transition>
      </div>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";

export default {
  created() {
    this.userName_ = this.$store.state.userName;
  },
  components: {
    CollapseTransition,
  },
  data() {
    return {
      userName_: "",
      isClosed: true,
    };
  },
  methods: {
    toggleMenu() {
      this.isClosed = !this.isClosed;
    },
    onLogout() {
      // function end of token here
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.nav.nav-menu {
  margin-top: 0;
}
</style>
