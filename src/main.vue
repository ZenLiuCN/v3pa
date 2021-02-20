<template lang="pug">
h2 hello
h2 hello
q-btn(@click="$router.push('/about')") toAbout
</template>
<script>
  export default {
    name: 'Main',
    data() {
      return {
        msg: 'world!',
        color: 'blue',
      }
    }
  }
</script>
<style scoped>
  .example {
    color: v-bind('color')
  }
</style>