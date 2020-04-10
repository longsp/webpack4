//银行卡号脱敏
export const formatIdCard = (val) => {
  if(!val){
    return '';
  }
  var beforeSub = val.toString().substring(0,4);
  var afterSub = val.toString().substr(-4);
  return beforeSub+" **** **** "+afterSub;
}

//手机号码脱敏
export const formatPhone = (val) => {
    if(!val){
      return '';
    }
    var beforeSub = val.toString().substring(0,3);
    var afterSub = val.toString().substr(-3);
    return beforeSub+"****"+afterSub;
}

//姓名脱敏
export const formatName = (val) => {
    if(!val){
      return '';
    }
    let beforeSub = val.toString().substring(0,1);
    let afterSub = val.length > 2 ? '**' : '*';
    return  beforeSub+afterSub;
}

//时间格式转换 yyyy-mm-dd hh:mm
export const formatTime = (val) => {
    var date = new Date(val);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = month > 9 ? month : "0"+month;
    var day = date.getDate();
    day = day > 9 ? day : "0"+day;
    var hour = date.getHours();
    hour = hour > 9 ? hour : "0"+hour;
    var minute = date.getMinutes();
    minute = minute > 9 ? minute : "0"+minute;

    return `${year}-${month}-${day} ${hour}:${minute}`;
};

//时间格式转换 yyyy-mm-dd
export const formatDate = (val) => {
    var date = new Date(val);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    month = month > 9 ? month : "0"+month;
    var day = date.getDate();
    day = day > 9 ? day : "0"+day;
    var hour = date.getHours();
    hour = hour > 9 ? hour : "0"+hour;
    var minute = date.getMinutes();
    minute = minute > 9 ? minute : "0"+minute;

    return `${year}-${month}-${day}`;
};

//0.02转成2%
export const formatPercent = (val) => {
    let num = Math.round(val * 10000) / 100;
    return parseFloat(num.toFixed(10));
};

//修复精度问题
export const formatBug = (val) => parseFloat(val.toFixed(10))
