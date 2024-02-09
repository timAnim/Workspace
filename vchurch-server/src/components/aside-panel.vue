<template>
	<aside>
	  <header class="sd-dark">
	    <li>
	      <span class="wd-m"></span>
	      <div>威盛小工具</div>
	    </li>
	  </header>
	  <content>
	    <li @click='pptGen()'>
	      <label class='wd-m'>
	        <i class="fa fa-file-powerpoint-o"></i>
	      </label>
	      <div>崇拜幻灯片生成</div>
	    </li>
	    <li @click='notYet'>
	      <label class='wd-m'>
	        <i class="fa fa-file-powerpoint-o"></i>
	      </label>
	      <div>月刊生成</div>
	    </li>
	  </content>
	</aside>
</template>
<script>
export default {
  name: "aside-panel",
  methods: {
    pptGen() {
			var url = this.$store.state.cur
      this.$router.push("/gen-ppt/" + url);
    },
    notYet(){
      pd.toast('建设中')
    }
  }
};
</script>