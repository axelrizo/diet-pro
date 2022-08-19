<template lang="pug">
div.app
  LayoutAlertContainer
  LayoutNavbar(v-if="$auth.loggedIn")
  div(v-else)
    LayoutLandingNavbar
    LayoutLogInModal
    LayoutSignUpModal
  Nuxt
</template>

<style lang="scss" scoped>
.app{
  overflow-x: hidden;
}
</style>
