<template>
  <div class="row">
    <div class="inputWrap">
      <input type="number" pattern="[0-9]*" :placeholder="placeholder" @blur.stop="blur" @input="handleInput"
       class="input" v-model="currentValue" :disabled="disabled" />
    </div>
    <i class="icon-del" v-if="canClear" @click.stop="clearPhone" v-show="this.isView"></i>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '',
      },
      canClear: {
        type: Boolean,
        default: false,
      },
      value: [String, Number],
      disabled: Boolean,
      readonly: Boolean,
      maxlength: {
        type: [String, Number],
        default: 100,
      },
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
        if(value.length > this.maxlength){
          value = value.substring(0, this.maxlength);
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
  }
  .inputWrap{
    flex: 1;
  }

  .input {
    width: 100%;
    font-size: 32px;
    color: #666;
  }

  .mintui-field-error { color: #b1b1b1; font-size: 32px; padding: 10px; }

  .icon-del {
    height: 32px;
    width: 32px;
    background: url(~@/assets/images/common/icon-del.png) no-repeat center;
    background-size: 32px 32px;
  }
</style>
