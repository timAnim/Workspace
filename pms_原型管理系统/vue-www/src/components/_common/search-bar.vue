<template>
  <div class='search-bar lay-h radius-m bg-light'>
    <input class="radius-m wd-auto pd-m-h" v-model='inp' :placeholder="placeholder" @keyup.enter='keyup' />
    <button @click='search' class="radius-m sd-cut wd-l">
      <span v-if='!inp'><icon name='search' class='in-pop'></icon></span>
      <icon v-else name='times-circle' class='in-pop'></icon>
    </button>
  </div>
</template>
<script>
export default {
  name: "search",
  methods: {
    search() {
      if (this.inp) {
        this.$emit("clear", false);
        this.inp = "";
      } else {
        this.$emit("search", this.inp);
      }
    },
    keyup() {
      this.$emit("search", this.inp);
    }
  },
  data() {
    return {
      inp: ""
    };
  },
  props: ["placeholder"]
};

</script>
