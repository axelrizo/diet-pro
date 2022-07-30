<template lang="pug">
div
  PageIndexDashboard(v-if="$auth.loggedIn")
  PageIndexLandingPage(v-else)
</template>
