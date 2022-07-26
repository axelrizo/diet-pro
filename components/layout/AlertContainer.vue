<template lang="pug">
.container-alert
  LayoutAlertContainerAlert(
    v-for="(alert, index) in alerts",
    :key="index",
    :alert="alert"
  )
</template>

<script>
export default {
  computed: {
    alerts () {
      return this.$store.state.alert.alerts
    }
  }
}
</script>

<style lang="scss" scoped>
.container-alert {
  position: fixed;
  z-index: 10000;
  top: 50px;
  height: 50px;
  width: 100%;
  left: 0;
  padding: 30px;
}
</style>
