<template lang="pug">
div.collapse-container
  div(@click="collapseVisible=!collapseVisible")
    slot(name="button")
      b-button( block size="lg" variant="primary") Default button
  b-collapse(:visible="collapseVisible")
    slot(name="content")
      p Default Content
</template>

<script>
export default {
  data () {
    return {
      collapseVisible: false
    }
  }
}
</script>

<style lang="scss" scoped>
.collapse-container{
  border: solid 1px gray;
  border-radius: .25rem;
}
</style>
