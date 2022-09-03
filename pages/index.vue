<template lang="pug">
div
  PersonsDashboard(v-if="$auth.loggedIn")
  TheLandingPage(v-else)
</template>
