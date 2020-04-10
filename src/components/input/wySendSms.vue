<template>
<main>
  <div class="row">
    <div class="inputWrap">
      <input type="number" pattern="[0-9]*" placeholder="短信验证码" v-model="currentValue" class="input" @input="handleInput" >
    </div>
    <span class="getCode" :class="disabledSend? '': 'canSendSms'" v-if="countDownNum==0" @click="handleSendSms">获取验证码</span>
    <span class="countDown" v-else>{{countDownNum}}s</span>

    <!--滑动解锁弹出框-->
    <div id="captcha"></div>
  </div>
</main>
</template>

<script>
import {Toast, Indicator} from 'mint-ui'
import {isMobile} from '@/utils/verify.js'

  export default {
    props: {
      phoneNum: {
        type: String,
      },
      value: [String, Number],
      disabledSend: {
        type: Boolean,
        default: false,
      },
      disabledTip: {
        type: String
      },
      smsType: {
        type: String,
        default: '1',
      },
      sendRightNow: {
        type: Boolean,
        default: false,
      }
    },
    data () {
      return {
        captchaIns: undefined, //返回网易易盾实例参数
        currentValue: this.value, //短信验证码

        //倒计时
        countDownNum: 0, //剩余时间
        timer: undefined, //计时器
        isSendCode: false, //是否点击获取短信验证码
      }
    },
    methods: {
      handleInput(event) {
        const value = event.target.value;
        this.$emit('input', value);
      },
      //倒计时
      countDown(){
        if(this.timer){
          clearInterval(this.timer);
        }

        this.countDownNum = 120;
        this.timer = setInterval(() => {
          if (this.countDownNum > 0) {
            this.countDownNum--;
          } else {
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      },
      //发送短信验证码
      sendVerifyCode(data){
        if(this.isSendCode){
          return;
        } else {
          this.isSendCode = true;
        }

        this.$http.sendMsg({
          mobilePhone: this.phoneNum,
          type: this.smsType,
          NECaptchaValidate: data.validate,
          //NECaptchaValidate: '123456',
        }).then(res => {
          this.isSendCode = false;
          if (res.responseCode == '0000') {
            this.countDown();
            this.$emit('sendBack', true);
          }
        }).catch(err => {
          this.isSendCode = false;
        })
      },
      //开始发送短信验证码
      handleSendSms(){
        if(this.disabledSend){
          if(this.disabledTip){
            Toast(this.disabledTip);
          }

          return;
        }
        if(!this.phoneNum){
          Toast("请输入手机号码");
          return;
        }
        if(!isMobile(this.phoneNum)){
          Toast("请输入正确的手机号码");
          return;
        }

        this.captchaIns && this.captchaIns.popUp()
      },
    },
    created() {

    },
    mounted() {
      let that = this;
      initNECaptcha({
        element: '#captcha',
        captchaId: this.$config.captchaId,
        mode: 'popup',
        width: '320px',
        onClose: function () {
          //弹出关闭结束后将会触发该函数
        },
        onVerify: function (err, data) {
          if(err){
            return;
          }

          setTimeout(()=>{
            that.captchaIns.refresh();
          },1000);
          that.sendVerifyCode(data);
        }
      }, function (instance) {
        //console.log(instance);
        // 初始化成功后得到验证实例instance，可以调用实例的方法
        that.captchaIns = instance

        if(that.sendRightNow && !that.disabledSend){
            that.handleSendSms();
        }
      }, function (err) {
        // 初始化失败后触发该函数，err对象描述当前错误信息
      })
    },
    beforeDestroy() {
        this.captchaIns.destroy()
    },
  }
</script>

<style scoped>
  .row{
    display: flex;
    align-items: center;
    height: 110px;
    padding-top: 30px;
    font-size: 32px;
    border-bottom: 1PX solid #dedede;
  }
  .inputWrap{
    flex: 1;
  }

  .input {
    width: 100%;
    font-size: 32px;
    color: #666;
  }

  .getCode {
    font-size: 22px;
    color: #ccc;
    width: 140px;
    height: 48px;
    background-color: #3a65c1;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .getCode.canSendSms{
    color: #fff;
  }

  .countDown {
    font-size: 32px;
    color: #2f5bbe;
  }
</style>
