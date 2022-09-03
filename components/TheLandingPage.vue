<template lang="pug">
b-container.index
  b-row.index__hero
    b-col(cols="3" md="6").align-items-center.d-flex
      b-img.hidden.index__principal-image(
        :src="require('~/assets/images/landing-image-1.png')"
      )
    b-col(cols="9" md="6").align-items-center.d-flex
      div
        p.display-4.text-center.d-md-none.d-block Diet Pro
        h4.text-center.d-md-none.d-block Do not suffer more by dieting.
        p.display-1.text-center.d-none.d-md-block Diet Pro
        h4.text-center.d-none.d-md-block.px-3 Do not suffer more by dieting, get organized and know the possibilities.
        div.text-center.mt-4
          b-button(variant="success" size="lg" v-b-modal.signupModal) Sign up
  b-container.my-5
    b-row.index__card
      b-col(cols="9" md="6")
        h3 If you have tried everything and it has not worked for you.
      b-col(cols="3" md="6")
        b-img.hidden.index__image.index__image--left.position-absolute.ml-lg-5(
          :src="require('~/assets/images/landing-image-2.png')"
        )
    b-row.index__card
      b-col(cols="3" md="6")
        b-img.hidden.index__image.position-absolute.mr-lg-5(
          :src="require('~/assets/images/landing-image-3.png')"
        )
      b-col(cols="9" md="6")
        h3 Anti-diet as a way of life.
    b-row.index__card
      b-col(cols="9" md="6")
        h3 Add your favorite foods and only worry about the quantities
      b-col(cols="3" md="6")
        b-img.hidden.index__image.index__image--left.position-absolute.ml-lg-5(
          :src="require('~/assets/images/landing-image-4.png')"
        )
  b-container.my-5
    .text-center.d-flex.justify-content-center.mb-4
      b-img.hidden(
        :src="require('~/assets/images/landing-image-5.png')"
      )
    h3.text-center.mb-4 What are you waiting to start
    .text-center
      b-button(variant="success" size="lg" v-b-modal.signupModal) Sign up
</template>

<script>
export default {
  mounted () {
    const index = document.querySelector('.index')
    const images = index.querySelectorAll('img')
    images.forEach((image) => {
      image.addEventListener('load', () => {
        image.classList.remove('hidden')
      })
      setTimeout(() => {
        image.classList.remove('hidden')
      }, 700)
    })
  }
}
</script>

<style lang="scss" scoped>
.index {
  &__hero {
    height: 100vh;
  }

  &__principal-image {
    transition: opacity .3s;
    position: absolute;
    right: 0;
  }

  &__image{
    transition: opacity .3s;
    right: 0;
    top: 0;
    transform: translateY(-50%);
    &--left {
      left: 0;
    }
  }
}

.index__card{
  height: 400px;
  align-items: center;
}

.hidden{
  opacity: 0;
}
</style>
