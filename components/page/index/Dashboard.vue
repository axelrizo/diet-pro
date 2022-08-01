<template lang="pug">
b-container.pt-5
  PageIndexNewPersonModal
  h3 {USER1}
  b-form(inline).mt-4.mb-2
    label.mr-sm-2(for="inline-form-custom-select-pref") Upload last weight:
    b-input-group(append="kg").ml-sm-3.mt-2.mt-sm-0
      b-form-input(type="number" id="inline-form-custom-select-pref")
    b-button(type="submit").ml-sm-3.mt-2.mt-sm-0 Save
  h5 last weight: {96} kg {20-may-22}
  h1 {GRAPH}
  b-button More information
  div.mt-5
    b-button(v-b-modal.newPersonModal) Add other user
</template>
