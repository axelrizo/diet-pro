<template lang="pug">
b-navbar(toggleable="lg" type="dark" variant="success")
  b-container
    b-navbar-brand(to="/") Diet Pro
    b-navbar-toggle(target="nav-collapse")
    b-collapse#nav-collapse(is-nav="")
      b-navbar-nav.ml-auto
        b-nav-item(to="/") Persons
        b-nav-item(to="/shopping-list") Shopping List
        b-nav-item(to="/plans") Plans
        b-nav-item(to="/days") Days
        b-nav-item(to="/meals") Meals
        b-nav-item(to="/foods") Foods
        b-nav-item(@click="$auth.logout()") Log out
</template>
