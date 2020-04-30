<template>
  <main>
      hello world!

      <icon-svg name="arrow-right" />
      <icon-svg name="check" />
      <icon-svg name="info" />
      

      <!-- <el-alert
            title="错误提示的文案"
            type="error">
        </el-alert> -->
  </main>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  created() {
    console.log(DEBUG);
    console.log(VERSION);
    console.log(CONFIG);
  }
};
</script>

<style scoped lang="less">
.icon-svg {
    font-size: 50px;
    color: #000;
}
</style>
