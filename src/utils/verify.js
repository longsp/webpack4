//空字符串
const isEmptyString = (str) => {
    return typeof str !== 'string' || (typeof str === 'string' && str.trim() === '')
}

//手机号码
const isMobile = (mobile) => /^[0-9]{11}$/.test(mobile)

//固定电话
const isFixedPhone = (phone) => /(0[1-9]\d{1,2}-)?[1-9]\d{6,7}/.test(phone)

//银行卡号
const isBankCard = (card) => /^(\d{16}|\d{19})$/.test(card)

//交易密码
let isDealPwd = (str) => /\d{6}/.test(str)

//邮箱
const isEmail =  (email) => /^(\w+)(\.\w+)*@(\w+)(\.\w+)*.(\w+)$/.test(email)

//url
let isUrl = (str) => new RegExp('(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]').test(str);

//身份证-位数限制
let isIdentity = (num) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(num)

//身份证号-严格
let isIdCard = (id) => {
	if (id.length != 18) return false;

	const coefficient = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];	//系数
	const parity = [ 1, 0, 'x', 9, 8, 7, 6, 5, 4, 3, 2 ];	//校验位
	let total = 0;
	for (let i = 0; i < coefficient.length; i++) {
		if (isNaN(id[i])) return false;
		total += id[i]*coefficient[i];
	}

	if (parity[total%11] != id[17].toLowerCase()) return false;

	return true;
}


//微信
let isWeixin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        if (window.__wxjs_environment === "miniprogram") {
            //小程序
            return false;
        } else {
            //微信公众号
            return true;
        }
    } else {
        // 走不在微信的逻辑
        return false;
    }
}

export {
    isEmptyString,
    isMobile,
    isFixedPhone,
    isBankCard,
    isEmail,
    isIdentity,
    isIdCard,
    isUrl,
    isWeixin, //微信
    isDealPwd,
}
