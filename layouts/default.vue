<template lang="pug">
div.app
  AlertWrapper
  TheNavbar(v-if="$auth.loggedIn")
  div(v-else)
    TheLandingNavbar
    LogInModal
    SignUpModal
  Nuxt
</template>

<style lang="scss" scoped>
.app{
  overflow-x: hidden;
}
</style>
