<template>
  <transition name="fade">
    <div class="confirm-wrap" v-if="visible">
      <div class="confirm">
        <div class="hd" v-if="title">{{title}}</div>
        <div class="bd">
          <i v-if="type!=''" class="icon-type iconfont" :class="'icon-'+type"></i>
          <span v-html="content"></span>
        </div>
        <div class="ft">
          <a href="javascript:void(0)" class="btn btn-default" @click="handleAction('cancel')" v-if="showCancel">{{cancelText}}</a>
          <a href="javascript:void(0)" class="btn btn-primary" @click="handleAction('yes')">{{confirmText}}</a>
        </div>
      </div>
      <div class="backdrop" @click="handleAction('close')"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MyConfirm",
  data() {
    return {
      visible: false,
      title: "",
      content: "",
      confirmText: "好的",
      cancelText: "下次再说",
      type: "",
      showCancel: true
    };
  },
  watch: {
    visible: function(curVal) {
      // if(curVal&&document.body.scrollHeight > window.innerHeight){
      //   document.body.addClass('backdrop-open');
      // }else{
      //   document.body.removeClass('backdrop-open');
      // }
    }
  },
  methods: {
    init() {
      let _this = this;
      this.visible = true;
      return {
        hide: function() {
          document.body.removeChild(document.querySelector(".confirm-wrap"));
        }
      };
    },
    handleAction(action) {
      this.visible = false;
      if (action == "yes") {
        if (typeof this.confirm === "function") {
          this.confirm();
        }
      } else {
        if (typeof this.cancel === "function") {
          this.cancel();
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.confirm-wrap {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;

    background: rgba(0, 0, 0, .7);
}

.confirm {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9;

    border-radius: 20px;
    /*margin-top: -30px;
    padding-top: 79px;*/
    padding-top: 50px;
    width: 600px;

    background-color: #fff;

    transform: translate(-50%, -50%);
}

.hd {
    margin-bottom: 24px;

    font-size: 36px;
    text-align: center;

    color: #575757;
}

.bd {
    margin: 0 auto 40px;
    width: 475px;

    font-size: 28px;
    line-height: 42px;

    color: #666;
}

// .ft {
//   border-top: 1px solid #e8e8e8;
//   display: flex;
//   overflow: hidden;
//   border-radius: 0 0 20px 20px;
// }
// .btn {
//   flex: 1;
//   height: 88px;
//   line-height: 88px;
//   text-align: center;
//   font-size: 32px;
//   color: #3a65c1;
//   background-color: #fff;
//   border-left: 1px solid #e8e8e8;

//   &:first-child {
//     border-left: 0;
//   }
// }

.ft {
    padding-bottom: 54px;

    text-align: center;
}

.btn {
    display: inline-flex;

    border-radius: 6px;
    width: 380px;
    height: 68px;

    font-size: 28px;

    color: #fff;
    background-color: #3a65c1;

    align-items: center;
    justify-content: center;
}

.skin-red {
    .btn {
        background-color: #f66660;
    }
}


</style>
