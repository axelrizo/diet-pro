export default function ($axios) {
  const service = {
    async singUp (form) {
      return await $axios.$post('/auth/signup', form)
    }
  }
  return service
}
