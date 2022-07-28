<template lang="pug">
b-navbar(toggleable="lg" type="dark" variant="success")
  b-container
    b-navbar-brand(href="#") Diet Pro
    b-navbar-toggle(target="nav-collapse")
    b-collapse#nav-collapse(is-nav="")
      b-navbar-nav.ml-auto
        b-nav-item(href="#") Dashboard
        b-nav-item(href="#") Users
        b-nav-item(href="#") Plans
        b-nav-item(href="#") Days
        b-nav-item(href="#") Dishes
        b-nav-item(href="#") Foods
        b-nav-item(href="#") Log out
</template>
