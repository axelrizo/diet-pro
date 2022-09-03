<template lang="pug">
b-alert(
  :show="dismissCountDown",
  dismissible,
  :variant="alert.type === 'error' ? 'danger' : 'info'",
  @dismissed="dismissCountDown = 0",
  @dismiss-count-down="countDownChanged"
) {{ alert.message }}
</template>

<script>
export default {
  props: {
    alert: {
      type: Object,
      default () {
        return {
          type: '',
          message: ''
        }
      }
    }
  },

  data () {
    return {
      dismissSecs: 30,
      dismissCountDown: 0
    }
  },

  mounted () {
    this.showAlert()
    setTimeout(() => {
      this.$store.dispatch('alert/remove', this.alert)
    }, 5000)
  },

  methods: {

    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },

    showAlert () {
      this.dismissCountDown = this.dismissSecs
    }
  }
}
</script>
