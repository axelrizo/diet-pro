<template lang="pug">
b-container
  b-row.index__hero
    b-col(cols="6").align-items-center.d-flex
      b-img.index__principal-image(
        :src="require('~/components/page/index/assets/example-image.png')"
      )
    b-col(cols="6").align-items-center.d-flex
      div
        h4.text-center.d-md-none.d-block Do not suffer more by dieting.
        h4.text-center.d-none.d-md-block Do not suffer more by dieting, get organized and know the possibilities.
        div.text-center.mt-4
          b-button(variant="success" size="lg") Sign up
  b-container.my-5
    b-row.index__card
      b-col(cols="6")
        b-img.index__image(
          :src="require('~/components/page/index/assets/example-image.png')"
        )
      b-col(cols="6")
        h3 If you have tried everything and it has not worked for you.
    b-row.index__card
      b-col(cols="6")
        h3 Anti-diet as a way of life.
      b-col(cols="6")
        b-img.index__image.index__image--left(
          :src="require('~/components/page/index/assets/example-image.png')"
        )
    b-row.index__card
      b-col(cols="6")
        b-img.index__image(
          :src="require('~/components/page/index/assets/example-image.png')"
        )
      b-col(cols="6")
        h3 Add your favorite foods and only worry about the quantities
  b-container.my-5
    .text-center.d-flex.justify-content-center.mb-4
      b-img(
        :src="require('~/components/page/index/assets/example-image.png')"
      )
    h3.text-center.mb-4 What are you waiting to start
    .text-center
      b-button(variant="success" size="lg") Sign up
</template>

<style lang="scss" scoped>
.index {
  &__hero {
    height: 100vh;
  }

  &__principal-image {
    position: absolute;
    right: 0;
  }

  &__image{
    position: absolute;
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
</style>
