<template lang="pug">
div
  PageIndexLandingPage(v-if="!isLoggedTheUser")
  PageIndexDashboard(v-else)
</template>

<script>
export default {
  layout (context) {
    const isLoggedTheUser = context.store.state.user.isLogged
    if (isLoggedTheUser === true) { return 'default' }
    return 'landing'
  },

  computed: {
    isLoggedTheUser () {
      return this.$store.state.user.isLogged
    }
  }
}
</script>
