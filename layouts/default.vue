<template lang="pug">
div.app
  LayoutAlertContainer
  LayoutLandingLogInModal
  LayoutLandingSignUpModal
  LayoutNavbar(v-if="$auth.loggedIn")
  LayoutLandingNavbar(v-else)
  Nuxt
</template>

<style lang="scss" scoped>
.app{
  overflow-x: hidden;
}
</style>
