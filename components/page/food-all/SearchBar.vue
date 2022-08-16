<template lang="pug">
BaseSearchBar(@submitSearch="submitSearch")
</template>

<script>
export default {
  methods: {
    submitSearch (form) {
      console.log(form)
    }
  }
}
</script>
