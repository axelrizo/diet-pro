<template lang="pug">
b-container.d-lg-flex.justify-content-between
  b-card.card.my-5.flex-fill.mx-lg-4.mx-auto
    b-card-body
      h3.mb-4 Inicia sesión
      b-form
        b-form-group(label="Email:")
          b-form-input(type="email")
        b-form-group(label="Password:")
          b-form-input(type="password")
        b-button(type="submit" variant="primary") Iniciar sesión
  b-card.card.my-5.flex-fill.mx-lg-4.mx-auto
    b-card-body
      h3.mb-4 Regístrate
      b-form
        b-form-group(label="Email:")
          b-form-input(type="email")
        b-form-group(label="Password:")
          b-form-input(type="password")
        b-form-group(label="Repite la contraseña:")
          b-form-input(type="password")
        b-button(type="submit" variant="primary") Registrarme
</template>

<script>
export default {
  layout: 'login'
}
</script>

<style lang="scss" scoped>
.card{
  max-width: 500px;
}
</style>
