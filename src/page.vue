<template lang="pug">
keep-alive: component(:is="comp")
</template>
<script>
  export default {
    name: 'DynamicPage',
    computed: {
      comp() {
        const com = this.$route.params.page;
        return asyncVue(com);
      }
    },
    props: ['page']
  }
</script>
