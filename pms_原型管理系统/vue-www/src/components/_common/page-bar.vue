<template>
	<li>
        <button>第{{ 12 }}页 <icon name='caret-down'></icon></button>
		<pre></pre>
        <button class='icon'><icon name='angle-left'></icon></button>
        <p>{{ 2 }} / {{ 12 }}</p>
        <button class='icon'><icon name='angle-right'></icon></button>
        <label></label>
    </li>
</template>
<style scoped>
li {
  background: #fafafa;
}
button {
  flex: 0 1 8rem;
  text-align: center;
  border: 1px solid #eee;
  background: white;
}
p {
  display: inline;
  flex: 0 1 auto;
  margin: 0 0.8rem;
}
.icon {
  flex: 0 0 2.8rem;
  margin: 0;
  border-radius: 50%;
}
svg {
  fill: #9e9e9e;
  transform: translateY(-10%);
}
</style>
<script>
export default {
  props: ["asides"],
  methods: {
    _switch(ev) {
      //处理收缩状态
      var target = ev.target;
      while (target.tagName != "LI") {
        target = target.parentNode;
      }
      let type = target.getAttribute("type");
      this.scroller.scrollToElement(target, 500);
      switch (type) {
        case "MENU":
          this.asides.forEach(item => {
            if (item.children) {
              if (item.id == target.id) this.$set(item, "opened", !item.opened);
              else this.$set(item, "opened", false);
            }
          });
          setTimeout(() => {
            this.scroller.refresh();
          }, 300);
          break;
        case "CHILD":
          this.asides.forEach(item => {
            if (item.children) {
              item.children.forEach(child => {
                this.$set(child, "checked", target.id == child.id);
              });
            }
          });
          this.$router.replace(target.id);
          this.$emit("href", target.id);
          break;
        case "HREF":
          this.$router.replace(target.id);
          this.$emit("href", target.id);
          break;
      }
    }
  }
};
</script>