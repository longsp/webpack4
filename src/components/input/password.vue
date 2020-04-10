<template>
  <div class="row">
    <div class="password">
      <input class="passwordInput" :type="pwdType" :placeholder="placeholder" maxlength="20" v-model="currentValue"
       autocomplete="new-password" @input="handleInput"
        />
    </div>
    <i class="eye" :class="isView ? 'show' : 'hide' " @click="eyeClick" v-if="canView"></i>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入密码',
      },
      value: [String, Number],
      //是否有查看密码
      canView: {
        type: Boolean,
        default: true,
      },
      //输入内容之后，placeholder是否上移显示
      canUp: {
        type: Boolean,
        default: false,
      },
      canClose: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        pwdType: 'password',

        currentValue: this.value,
        isView: false,
      }
    },
    methods: {
      eyeClick(){
        this.isView = !this.isView;
        this.pwdType = this.isView ? 'text' : 'password';
      },
      handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value);
      },
    },
    created() {

    },
    mounted() {

    }
  }
</script>

<style scoped>
  .row{
    display: flex;
    align-items: center;
    height: 110px;
    padding-top: 30px;
    border-bottom: 1PX solid #dedede;
  }
  .password{
    flex: 1;
  }

  .passwordInput{
    width: 100%;
    font-size: 32px;
    color: #666;
  }

  .eye {
    width: 50px;
    height: 90px;
    background-position: right center;
    background-repeat: no-repeat;
  }
  .eye.show {
    height: 24px;
    width: 42px;
    background: url(~@/assets/images/common/icon-eye-open.png) no-repeat center;
    background-size: 42px 24px;
  }
  .eye.hide {
    height: 15px;
    width: 40px;
    background: url(~@/assets/images/common/icon-eye-close.png) no-repeat center;
    background-size: 40px 15px;
  }
</style>
