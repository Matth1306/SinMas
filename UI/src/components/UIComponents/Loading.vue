<template>
  <div class="mista-loading d-flex flex-column justify-content-center text-center">
    <div class="d-flex flex-row justify-content-center">
      <letter-cube></letter-cube>
    </div>
    <p>Loading</p>
  </div>
</template>

<script>
import { LetterCube } from "vue-loading-spinner";
export default {
  name: "mista-loading",
  components: {
    LetterCube
  }
};
</script>