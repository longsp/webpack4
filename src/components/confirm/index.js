import Vue from 'vue'
import Confirm from './Confirm.vue'

const ConfirmBox = Vue.extend(Confirm);

Confirm.show = (content,options) => {
  if( content === undefined){
    content = '';
    options = {}
  } else if ( typeof content === 'object'){
    options = content;
    content = '';
  }


  options = Object.assign({
    content: content,
  }, options);

  let instance = new ConfirmBox({
    data: options
  }).$mount();

  document.body.appendChild(instance.$el);

  return instance.init();
};

Confirm.hide = function(){
    let confirmWrap = document.querySelector('.confirm-wrap');
    if(confirmWrap){
        document.body.removeChild(confirmWrap);
    }
};

export default Confirm
