<template>
  <nav>
    <span class='cl-sec'
      v-for='(nav,i) in navs'
      :key='i'
      :checked="nav.id===cur"
      v-show='!nav.hidden'
      @click='href(nav)'>
      {{ nav.name }}
    </span>
  </nav>
</template>
<script>
export default {
  props: {
    navs: {
      default: [],
    },
    cur: {
      default: '',
    }
  },
  methods: {
    href(nav) {
      this.$emit('nav', nav.id)

    },
  }
}

</script>
