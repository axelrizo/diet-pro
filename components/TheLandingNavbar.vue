<template lang="pug">
b-navbar(toggleable="lg" type="dark" variant="success").px-1.px-sm-4
  b-container
    b-navbar-brand(to="/") Diet pro
    b-navbar-nav.flex-row
      b-nav-item.mr-2.mr-sm-3(to="/about") About
      b-button(variant="primary" v-b-modal.signupModal).px-1.px-sm-2.mr-2.mr-sm-3 Sign up
      b-button(variant="secondary" v-b-modal.loginModal).px-1.px-sm-2 Log in
</template>
