<template>
  <div class="card card-stats">
    <div class="card-body">
      <div class="row">
        <div class="position-absolute">
          <slot name="header">
            <div class="icon-big" :class="`text-${type}`">
              <i :class="icon" class="position-absolute mx-3"></i>
            </div>
          </slot>
        </div>
        <div class="col-12">
          <slot name="content">
            <div class="numbers">
              <p class="card-category">{{ smallTitle }}</p>
              <p class="card-title" style="font-size: 0.7em">{{ avg }}</p>
              <p class="card-title" style="font-size: 0.5em">
                {{ "min. " + min }}
              </p>
              <p class="card-title" style="font-size: 0.5em">
                {{ "max. " + max }}
              </p>
            </div>
          </slot>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <hr />
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "stats-card",
  props: {
    type: {
      type: String,
      description:
        "Card text type (primary|info|danger|default|warning|success)",
    },
    avg: {
      type: String,
      description: "Card value",
    },
    min: {
      type: String,
      description: "Card value",
    },
    max: {
      type: String,
      description: "Card value",
    },
    smallTitle: {
      type: String,
      description: "Card small title",
    },
    icon: {
      type: String,
      description: "Card icon",
    },
  },
};
</script>
<style scoped>
.card-content {
  min-height: 85px;
}
.numbers {
  overflow: hidden;
  white-space: nowrap;
}
.stats {
  overflow: hidden;
  white-space: nowrap;
}
</style>
