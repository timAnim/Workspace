<template>
  <div class='lay-r lay-h icon'>
    <input type="text" :value='value' @input='input' spellcheck="false" class="pd-xl-h wd-max">
    <span class="wd-s float-nw ht-s align-c">
      <icon name='file' class='label cl-disabled'></icon>
    </span>
    <span class='placeholder' v-if='placeholder' :alert='invalid'>{{ placeholder }}</span>
    <button class='upload sd-theme float-ne' @click='select'>
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
      default: "image/jpeg,image/jpg,image/png,image/gif,image/svg"
    },
    flag: [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
    maxSize: {
      type: Number,
      default: 0
    },
    placeholder: {
      default: false
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
      let file = event.target.files[0];
      const self = this;
      const flag = this.flag;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        self.$http
          .post("/api/upload/file", formData, {
            progress(event) {
              self.$emit(
                "progress",
                parseFloat((event.loaded / event.total) * 100),
                flag
              );
            }
          })
          .then(
            res => {
              if (res.body) {
                self.$emit("input", res.body.resPath);
                self.$pd.toast("上传成功");
                event.target.value = null;
              } else {
                self.$emit("complete", 500, result, flag);
              }
            },
            error => self.$emit("complete", 500),
            flag
          );
      }
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
