const mixinHandleNotification = {
  methods: {
    mixinHandleNotificationSuccessNotification (message) {
      this.$store.dispatch('alert/add', {
        type: null,
        message
      })
    },

    mixinHandleNotificationErrorNotification (message) {
      this.$store.dispatch('alert/add', {
        type: 'error',
        message
      })
    }
  }
}

export {
  mixinHandleNotification
}
