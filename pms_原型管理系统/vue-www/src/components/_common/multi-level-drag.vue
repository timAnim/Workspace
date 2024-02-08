<template>
  <div class='drag-outer'>
    <child :children='_list' @init='initFn'></child>
  </div>
</template>
<style lang='scss'>
.drag-outer {
  .open>.drag_caret>.fa-icon {
    transform: rotate(90deg) !important;
  }

  .drag_caret,
  ._check {
    margin: 0 !important;
    flex: 0 0 0.32rem;
    text-align: center;
    cursor: pointer;
  }

  .drag_caret>.fa-icon {
    transition: transform 0.1s ease;
    fill: #424242;
  }

  .drag_item {
    cursor: move;
  }

  .drag_title {
    pointer-events: none;
    transition: transform 0.2s ease;
  }

  div[end] .drag_caret svg {
    visibility: hidden;
  }

  #drag-outer {
    overflow: hidden;
  }

  li {
    position: relative;
  }

  li[_start] {
    opacity: 0.5;
    background-color: #f5f5f5;
  }

  li:after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 0.4rem;
    background-color: #c5e1a5;
    visibility: hidden;
    pointer-events: none;
    transition: transform 0.2s ease;
    transform-origin: 50% 50%;
  }

  li[_drag="move-before"]>.drag_title {
    transform: translateY(20%);
    color: #8bc34a;
    font-weight: 800;
  }

  li[_drag="move-after"]>.drag_title {
    transform: translateY(-20%);
    color: #8bc34a;
    font-weight: 800;
  }

  li[_drag="move-before"]:after {
    visibility: visible;
    transform: translateY(-35%) scale(1, 0.3);
  }

  li[_drag="move-in"]:after {
    visibility: visible;
    transform: translateX(0.24rem) scale(1, 1);
    opacity: 0.5;
    border-radius: 0.2rem 0 0 0.2rem;
  }

  li[_drag="move-after"]:after {
    visibility: visible;
    transform: translateY(35%) scale(1, 0.3);
  }
}

</style>
<script>
import Child from "./multi-level-drag-child.vue";
export default {
  props: ["initData"],
  mounted() {
    this.initFn();
  },
  methods: {
    init(arr) {
      // 递归标记终端节点end为true
      this.setEnd(arr);
      return arr;
    },
    initFn() {
      console.log("init");
      this.setEnd(this._list);
    },
    // 抽离出来方便递归
    setEnd(arr) {
      for (var i = arr.length - 1; i >= 0; i--) {
        arr[i].show = true;
        if (!arr[i].next) {
          arr[i].next = [];
          arr[i].end = true;
        } else if (arr[i].next.length === 0) {
          arr[i].end = true;
        } else {
          arr[i].end = false;
          this.setEnd(arr[i].next);
        }
      }
    }
  },
  components: {
    child: Child
  },
  data() {
    return {
      inited: JSON.parse(JSON.stringify(this.init(this.initData)))
    };
  },
  computed: {
    _list: {
      get() {
        return this.inited;
      },
      set(_d) {
        this._list = _d;
      }
    }
  }
};

</script>
