<template>
  <div class="mo-upload pointer" @click='select'>
    <input class="hidden" type="file" :id='cid' :accept="accepts" @change="upload">
    <slot class='pd-s-h'></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cid: this.$pd.randId(4)
    };
  },
  props: {
    accepts: {
      type: String,
      default: "image/jpeg,image/jpg,image/png,image/gif,image/svg"
    },
    flag: [String, Number], //当前上传标识,以便于在同一个监听函数中区分不同的上传域
    maxSize: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 0
    }
  },
  methods: {
    upload(event) {
      let file = event.target.files[0];
      const self = this;
      const flag = this.flag;
      if (file) {
        // if (this.maxSize) {
        //todo filter file
        // }
        //filter file, 文件大小,类型等过滤
        //如果是图片文件
        // const reader = new FileReader()
        // const imageUrl = reader.readAsDataURL(file)
        // img.src = imageUrl //在预览区域插入图片

        const formData = new FormData();
        formData.append("file", file);
        formData.append("size", this.size);
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
                self.$emit("complete", res.body);
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
  }
};
</script>
