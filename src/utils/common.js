// 获取渠道号
const channel = () => {
    let {channelCode = '44000123354896454'} = localStorage
    return channelCode;
}

const loginOut = () => {
    let openId = localStorage.openId;
    localStorage.clear();
    sessionStorage.clear();

    sessionStorage.loginOut = true;
    localStorage.openId = openId;
}

/**
 * url追加参数
 */
const updateQueryParam = (uri, key, value) => {
	if(!value) {
		return uri;
	}
	var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
	var separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}

/**
 * 判断是否是基本数据类型
 * @param value
 */
const isPrimitive = (value) => (typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'boolean')


//判断是否是一个js对象
const isObject = (value) => Object.prototype.toString.call(value) === "[object Object]"

/**
 * 深拷贝一个值
 * @param value
 */
const cloneDeep = (value) => {

    // 记录被拷贝的值，避免循环引用的出现
    let memo = {};

    function baseClone(value) {
        let res;
        // 如果是基本数据类型，则直接返回
        if (isPrimitive(value)) {
            return value;
            // 如果是引用数据类型，我们浅拷贝一个新值来代替原来的值
        } else if (Array.isArray(value)) {
            res = [...value];
        } else if (isObject(value)) {
            res = { ...value };
        }

        // 检测我们浅拷贝的这个对象的属性值有没有是引用数据类型。如果是，则递归拷贝
        Reflect.ownKeys(res).forEach(key => {
            if (typeof res[key] === "object" && res[key] !== null) {
                //此处我们用memo来记录已经被拷贝过的引用地址。以此来解决循环引用的问题
                if (memo[res[key]]) {
                    res[key] = memo[res[key]];
                } else {
                    memo[res[key]] = res[key];
                    res[key] = baseClone(res[key])
                }
            }
        })
        return res;
    }

    return baseClone(value)
}

export {
    channel, loginOut, cloneDeep
}
