<template>
  <div class='lay-r lay-h'>
    <input type="date" :value='value' @input='input' class="pd-xl-h wd-max" :disabled='disabled'>
    <label class='ht-s wd-s float-nw cl-disabled'>
      <icon name='calendar'></icon>
    </label>
    <button class='open float-ne' type='circle-s' v-if='!disabled'>
      <icon name='chevron-circle-down'></icon>
    </button>
  </div>
</template>
<style scoped>
button {
  pointer-events: none;
}

input {
  color: var(--cl-prim);
}

svg {
  fill: var(--cl-hint);
  transition: all 0.4s ease;
}

input:hover ~ * svg,
input:focus ~ * svg {
  fill: var(--cl-sec) !important;
}
</style>
<script>
export default {
  props: ["value", "max", "disabled"],
  data() {
    return {
      invalid: false
    };
  },
  methods: {
    clear(ev) {
      this.$emit("input", "");
      this.invalid = false;
    },
    input(ev) {
      this.$emit("input", ev.target.value);
    }
  },
  mounted() {
    var inp = this.$pd.find("input", this.$el);
    inp.setAttribute("spellcheck", false);
    inp.setAttribute("required", "required");
  }
};
</script>
