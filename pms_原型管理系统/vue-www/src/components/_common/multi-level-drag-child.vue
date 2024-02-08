<template>
  <div>
    <div v-for='(a,index) in children' style='margin-left:0.16rem' :end='a.end' :key='index'>
      <li :class='{open:a.show,drag_item:true}' draggable='true' @dragstart='onStart($event,a,index,children)' @dragover.prevent='onOver($event, a)' @dragenter='onEnter($event, a)' @dragleave='onLeave' @drop='onDrop($event,a,index,children)' @dragend='onEnd($event, a)' style='border-bottom:1px solid #eee'>
        <label @click.stop='open($event,a)' class='drag_caret'>
          <svg version="1.1" role="presentation" width="6" height="16" viewBox="0 0 640 1792" class="fa-icon">
            <path d="M576 896q0 26-19 45l-448 448q-19 19-45 19t-45-19-19-45v-896q0-26 19-45t45-19 45 19l448 448q19 19 19 45z"></path>
          </svg>
        </label>
        <div class='drag_title'>{{a.name}}</div>
      </li>
      <transition name='expand'>
        <child :children='a.next' v-show='a.show& !a.end' @init='$emit("init")'></child>
      </transition>
    </div>
  </div>
</template>
<script>
import store from "@/store";
export default {
  store,
  name: "child",
  props: ["children"],
  data() {
    return {
      boundery: []
    };
  },
  methods: {
    open(ev, item) {
      item.show = item.show === true ? false : true;
    },
    onStart(ev, item, index, next) {
      ev.currentTarget.setAttribute("_start", true);
      this.itemFrom = item;
      this.indexFrom = index;
      this.arrFrom = next;
      setTimeout(t => (item.show = false), 200);
    },
    onOver(ev, item) {
      if (item == this.itemFrom) return false;
      if (ev.y < this.boundery[0]) {
        ev.currentTarget.setAttribute("_drag", "move-before");
        this.tend = "move-before";
      } else if ((ev.y > this.boundery[0]) & (ev.y < this.boundery[1])) {
        ev.currentTarget.setAttribute("_drag", "move-in");
        this.tend = "move-in";
        item.show = true;
      } else {
        ev.currentTarget.setAttribute("_drag", "move-after");
        this.tend = "move-after";
      }
    },
    onEnter(ev, item) {
      if (item === this.itemFrom) return false;
      var ele = ev.currentTarget;
      var unit =
        (ele.getBoundingClientRect().bottom - ele.getBoundingClientRect().top) /
        3;
      this.boundery = [
        ele.getBoundingClientRect().top + unit,
        ele.getBoundingClientRect().top + 2 * unit
      ];
    },
    onLeave(ev) {
      ev.currentTarget.removeAttribute("_drag");
    },
    onDrop(ev, item, index, arrTo) {
      if (item == this.itemFrom) return false;
      ev.currentTarget.removeAttribute("_drag");
      switch (this.tend) {
        case "move-after":
          arrTo.splice(index + 1, 0, this.itemFrom);
          for (var i = 0; i < this.arrFrom.length; i++) {
            if (this.arrFrom[i] == this.itemFrom) {
              this.arrFrom.splice(i, 1);
              break;
            }
          }
          break;
        case "move-before":
          arrTo.splice(index, 0, this.itemFrom);
          for (var i = this.arrFrom.length - 1; i >= 0; i--) {
            if (this.arrFrom[i] == this.itemFrom) {
              this.arrFrom.splice(i, 1);
              break;
            }
          }
          break;
        case "move-in":
          this.arrFrom.splice(this.indexFrom, 1);
          item.next.push(this.itemFrom);
          break;
      }
      this.$emit("init");
    },
    onEnd(ev, item) {
      item.show = true;
      ev.currentTarget.removeAttribute("_start");
    }
  },
  computed: {
    itemFrom: {
      get() {
        return this.$store.state.itemFrom;
      },
      set(val) {
        this.$store.commit("setItemFrom", val);
      }
    },
    indexFrom: {
      get() {
        return this.$store.state.indexFrom;
      },
      set(val) {
        this.$store.commit("setIndexFrom", val);
      }
    },
    arrFrom: {
      get() {
        return this.$store.state.arrFrom;
      },
      set(val) {
        this.$store.commit("setArrFrom", val);
      }
    }
  }
};

</script>
