<template lang="pug">
q-card.q-ma-xs.q-pa-md()
  h2.example hello this is about
  q-btn.example(@click="$router.push('/')", color="primary", label="toMain")
  q-input(:modelValue="user.name", @update:modelValue="setName($event)")
</template>
<script>
  export default {
    name: 'About',
    setup() {
      return {
        user: store.user(),
        setName: s => store.setUserName(s),
      };
    },
    data() {
      return {
        msg: 'world!',
        color: 'blue',
      }
    },
  }
</script>
<style scoped lang="stylus">
  example
    color: v-bind('color')
</style>