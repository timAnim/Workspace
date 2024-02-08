<template>
  <div class='lay-h lay-r' :class="{icon:icon}">

    <input class="wd-max pd-xl-h cl-prim" type="text" :value='value' @input.stop.prevent='input' @change.prevent.stop='valid(value)' :class='{has_value:has_value}' :disabled='disabled' ref='inp'>
    
    <span class='hint ht-s fs-s' v-if='placeholder&&!disabled' :alert='invalid'>{{ placeholder }}</span>

    <label class="ht-s wd-s float-nw">
      <icon :name='icon' v-if='icon'></icon>
    </label>

    <label v-if='value&&!disabled' class='float-ne ht-s wd-s pointer clear' type='circle-s' @click.stop.prevent='clear'>
      <icon name='times-circle'></icon>
    </label>
  </div>
</template>
<style scoped>
svg {
  fill: var(--cl-hint);
  transition: all 0.6s ease;
}

.hint {
  position: absolute;
  top: 0;
  left: 0.4rem;
  transition: all 0.4s ease;
  color: var(--cl-hint);
  pointer-events: none;
  z-index: 10;
}

div .hint[alert="true"] {
  color: var(--cl-alert);
}

div .hint[alert="true"] ~ label svg {
  fill: var(--cl-alert);
}

input:focus ~ .hint,
.has_value ~ .hint {
  top: 100%;
  left: 0.08rem;
  margin-top: -0.08rem;
}

input:hover ~ label svg,
input:focus ~ label svg {
  fill: var(--cl-sec);
}
</style>
<script>
export default {
  props: ["icon", "placeholder", "value", "max", "reg","disabled"],
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
    },
    valid(_v) {
      var valid = new RegExp(this.reg).test(_v);
      this.invalid = !valid;
    }
  },
  mounted() {
    this.$refs.inp.setAttribute("spellcheck", false);
  },
  computed: {
    has_value() {
      return this.value ? true : false;
    }
  }
};
</script>
