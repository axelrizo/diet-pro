<template lang="pug">
b-navbar(toggleable="lg" type="dark" variant="success")
  b-container
    b-navbar-brand(to="/") Diet pro
    b-navbar-nav.flex-row
      b-nav-item(to="/about") About
      b-button(variant="primary" v-b-modal.signupModal).mr-3 Sign up
      b-button(variant="secondary" v-b-modal.loginModal) Log in
</template>
