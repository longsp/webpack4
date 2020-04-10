<template>
  <div class="row">
    <div class="inputWrap">
      <input type="number" pattern="[0-9]*" :placeholder="placeholder" maxlength="11" @blur.stop="blur" @input="handleInput"
       class="input" v-model="currentValue" :disabled="disabled" />
    </div>
    <i class="icon-del"  v-if="canClear" @click.stop="clearPhone" v-show="this.isView"></i>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入手机号码',
      },
      canClear: {
        type: Boolean,
        default: true,
      },
      value: [String, Number],
      disabled: Boolean,
      readonly: Boolean,
    },
    watch: {
      'value'(val, oldValue) {
        this.setCurrentValue(val);
      }
    },
    data () {
      return {
        currentValue: this.value,
        isView: false,
      }
    },
    methods: {
      blur(){
        this.$emit('blur');
      },

      clearPhone(){
        this.currentValue = '';
      },

      handleInput(event) {
        let value = event.target.value;
        if(value.length > 11){
          value = value.substring(0,11);
        }
        this.isView = value.length > 0 ? true : false;
        this.setCurrentValue(value);
        this.$emit('input', value);
      },

      setCurrentValue(value) {
        if (value === this.currentValue) return;
        this.currentValue = value;
      },

      clearPhone(){
        this.currentValue = "";
        this.$emit('input', "");
      }
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
    height: 100px;
  }
  .inputWrap{
    flex: 1;
  }

  .input {
    width: 100%;
    font-size: 32px;
    color: #666;
  }

  .icon-del {
    height: 32px;
    width: 32px;
    background: url(~@/assets/images/common/icon-del.png) no-repeat center;
    background-size: 32px 32px;
  }
</style>
