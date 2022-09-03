<template lang="pug">
FoodForm(:food="food", @on-submit="onSubmit")
</template>

<script>
import { mixinHandleNotification } from '@/mixins/handleNotification'

export default {
  mixins: [mixinHandleNotification],

  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  methods: {
    async onSubmit (form) {
      try {
        const { name, carbohydrates, protein, fat } = form
        const formToSend = { name, carbohydrates, protein, fat }

        const response = await this.$usersService
          .updateFood(this.food.idFood, formToSend)
          .catch(({ response }) => {
            throw new Error(response.data.message)
          })

        this.$emit('fetch')

        this.mixinHandleNotificationSuccessNotification(response.message)
      } catch (error) {
        this.mixinHandleNotificationErrorNotification(error)
      }
    }
  }
}
</script>
