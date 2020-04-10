import router from '@/router'
import {$config} from '@/config/config'

const appId = $config.appId;
const redirect_uri = `${$config.baseUrl}asset/wechat/autoLogin`;
const needWxLogin = false; //是否需要微信登录


//是否为微信公众号环境
function isWeixin() {
    if(!needWxLogin){
        return false;
    }

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

function getWxUrl() {
    let redirectUrl = encodeURIComponent(redirect_uri);
    const wxUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
    return wxUrl;
}


//获取openId---微信跳转方式
export function getOpenId() {
    if (isWeixin()) {
        goWeixin();
    }
}

/**
 * @微信注册流程
 * 未登录 => 微信 =>后台(code, token, openId, 微信自动登录)
 */
export function goWeixin() {
    let wxUrl = getWxUrl();
    window.location.href = wxUrl;
}

/**
 * 去登录 1.微信环境  2.非微信环境
 */
export function goLogin(redirectUrl = window.location.href) {
    sessionStorage.setItem("redirectUrl", redirectUrl); //登陆返回的url

    let {channelCode, referrer} = router.history.current.query;
    channelCode && localStorage.setItem("channelCode", channelCode);
    referrer && localStorage.setItem("referrer", referrer);

    if (isWeixin()) {
        goWeixin();
    } else {
        router.push("/messageLogin");
    }
}

