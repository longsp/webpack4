<template>
  <div class="password" :class="isIOS ? 'isIOS' : ''">
    <input type="number" class="passwordInput" ref="password" pattern="[0-9]*"
            maxlength="6" v-model="password" v-on:input="passwordInput"
            oninput="if(value.length > 6)value = value.slice(0, 6)"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isIOS: undefined,

        password: '',
      }
    },
    methods: {
      passwordInput(){
        let password = this.password;
        this.$emit("passwordInput", password);
      },
      judgeIOS(){
        var u = navigator.userAgent;
        this.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      }
    },
    created() {
      this.judgeIOS();
    },
    mounted() {
      this.$refs['password'].focus()
    }
  }
</script>

<style scoped>
  .password{
    margin: 50px auto 0;
    position: relative;
    width: 504px;
    background: url("~@/assets/images/common/password_bg.png") no-repeat left bottom;
    background-size: 504px 2px;
    padding-bottom: 2px;
  }

  .passwordInput{
    width: 502px;
    height: 72px;
    font-size: 30px;
    overflow: hidden;
    -webkit-text-security: disc;
    text-security: disc;
    line-height: 72px;
    padding-left: 34px;
    letter-spacing: 72px;
    font-family: "microsoft yahei";
  }

  .isIOS .passwordInput{
    padding-left: 30px;
    letter-spacing: 66px;
  }
</style>
