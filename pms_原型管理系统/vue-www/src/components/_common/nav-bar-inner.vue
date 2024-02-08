<template>
  <nav :type='"inner"'>
    <span
    v-for='nav in navs'
    :checked="nav.id===cur"
    :key = 'nav.id'
    @click='href(nav)'>
      {{ nav.name }}
    </span>
  </nav>
</template>
<script>
export default {
  props: {
    navs: {
      default: []
    },
    cur: {
      default: ""
    }
  },
  methods: {
    href(nav) {
      this.$emit("nav", nav.id);
    }
  }
};

</script>
