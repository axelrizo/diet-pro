<template lang="pug">
b-navbar(toggleable="lg" type="dark" variant="success")
  b-container
    b-navbar-brand(href="#") Diet pro
    b-navbar-nav.flex-row
      b-button(variant="primary" v-b-modal.signup).mr-3 Sign up
      b-button(variant="secondary" v-b-modal.login) Log in
</template>
