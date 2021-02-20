<template lang="pug">
q-layout.bg-grey-1(container style="height: 100vh")
  q-header.text-white(elevated, style="background: #24292e" height-hint="61.59")
    q-toolbar.q-py-sm.q-px-md
      q-btn.q-mr-sm(round dense flat no-caps :ripple="false" size="19px" color="white" icon="mdi-menu")
      q-toolbar-title {{common.title}}
      q-space
      q-btn( v-if="!user.token") login
      div(v-if="user.token && user.name") {{user.name}}
      div.q-pl-sm.q-gutter-sm.row.items-center.no-wrap
        q-btn( v-if="$q.screen.gt.xs" dense flat round size="sm" icon="mdi-bell")
        q-btn( v-if="$q.screen.gt.xs" dense flat)
          div.row.items-center.no-wrap
            q-icon.mdi-24px(name="mdi-plus" size="20px")
            q-icon.mdi-18px(name="mdi-chevron-down" size="16px" style="margin-left: -2px")
        q-menu(auto-close)
          q-list( dense style="min-width: 100px")
            q-item(clickable): q-item-section New repository
            q-item(clickable): q-item-section Import repository
            q-item(clickable): q-item-section New gist
            q-item(clickable): q-item-section New organization
            q-speparator
            q-item-label(header) This repository
            q-item(clickable): q-item-section New issue
  q-page-container.q-ma-xs
    q-page.q-pa-md
      router-view
</template>
<script>
  export default {
    setup() {
      return {
        common: store.common(),
        user: store.user(),
        login: store.isLogin()
      }
    }
  }
</script>
<style scoped>

</style>