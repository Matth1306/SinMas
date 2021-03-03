<template>
  <div class="content" style="min-height: calc(100vh - 86px)">
    <transition name="fade" mode="out-in">
      <!-- your content here -->
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}

.fade-enter,
  .fade-leave-to
    /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
