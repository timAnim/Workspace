<template>
    <dl class="mg-m">
        <div id="register" class="wd-max" style="height:560px;">

        </div>
    </dl>
</template>
<script>
import ThreeDbar from "@/components/_chart/3d-bar";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$http.post("/api/wxapp/getAnalysisUserPortrait").then(res => {
      var list = res.body.data.visit_uv;
      var bars = ThreeDbar.init(
        list.province,
        document.getElementById("register")
      );
      this.$emit("change", 20, "register");
    });
  }
};
</script>

