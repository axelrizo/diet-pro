<template lang="pug">
b-navbar(toggleable="lg" type="dark" variant="success")
  b-container
    b-navbar-brand(to="/") Diet Pro
    b-navbar-toggle(target="nav-collapse")
    b-collapse#nav-collapse(is-nav="")
      b-navbar-nav.ml-auto
        b-nav-item(to="/") Persons
        b-nav-item(href="/plan/all") Plans
        b-nav-item(href="/day/all") Days
        b-nav-item(href="/meal/all") Meals
        b-nav-item(href="/food/all") Foods
        b-nav-item(@click="$auth.logout()") Log out
</template>
