<template>
  <div class='outer lay-h  lay-r icon'>
    <input type="text" :code='code' :value='value' @input='input' spellcheck="false" class="pd-xl-h wd-max" :disabled='disabled'>
    <span class="wd-s float-nw ht-s align-c">
      <icon name='file' class='label cl-disabled'></icon>
    </span>
    <span class='placeholder' v-if='placeholder&& !disabled' :alert='invalid'>{{ placeholder }}</span>
    <button class='upload sd-theme float-ne' @click='select' v-if='!disabled'>
      <icon name='upload'></icon>
    </button>
    <input type="file" :id='cid' :accept="accepts" @change="upload">
  </div>
</template>
<style scoped>
.label {
  transform: scale(0.8);
}

input[type="file"] {
  display: none;
}
input {
  color: var(--cl-prim);
}

input:hover ~ .label,
input:focus ~ .label {
  fill: var(--cl-sec);
}

.placeholder {
  position: absolute;
  left: 0.32rem;
  transition: all 0.4s ease;
  line-height: 0.24rem;
  color: var(--cl-hint);
  pointer-events: none;
  top: 0;
}

.placeholder[alert="true"] {
  color: var(--cl-alert);
}

.placeholder[alert="true"] ~ .label {
  fill: var(--cl-alert);
}

input:focus ~ .placeholder,
input:valid ~ .placeholder {
  top: 100%;
  margin-top: -0.02rem;
  left: 0.08rem;
  transform: scale(0.8);
  transform-origin: left top;
}
</style>
<script>
export default {
  props: {
    value: {
      default: null
    },
    accepts: {
      type: String,
      default: "application/x-zip-compressed"
    },
    code: {
      type: String
    },
    maxSize: {
      type: Number,
      default: 0
    },
    placeholder: {
      default: false
    },
    type: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
  data() {
    return {
      invalid: false,
      cid: this.$pd.randId(4)
    };
  },
  methods: {
    input(ev) {
      this.$emit("input", ev.target.value);
    },
    upload(event) {
      // this.$pd.toast("请稍后，不要离开页面");
      this.$emit("start", true);
      let file = event.target.files[0];
      const self = this;
      const formData = new FormData();
      if (!file || !self.code || !self.type) return;
      formData.append("file", file);
      formData.append("code", self.code);
      formData.append("type", self.type);
      self.$http
        .post("/api/upload/zip", formData, {
          progress(ev) {
            var num = new Number((ev.loaded / ev.total) * 100);
            self.$emit("progress", num.toFixed(2));
          }
        })
        .then(
          res => {
            if (res.body.code) {
              self.$emit("complete", false, res.body.msg);
            } else {
              self.$emit("input", res.body.data.entrance);
              event.target.value = null;
              self.$emit("complete", true, res.body.data);
            }
          },
          error => self.$emit("complete", false)
        );
    },
    select() {
      this.$pd.id(this.cid).click();
    }
  },
  mounted() {
    var inp = this.$pd.find("input", this.$el);
  }
};
</script>
