import Vue from 'vue';
import Router from 'vue-router';

/** page目录下 **/
let r = require.context("@/page", true, /\.router\.js/);
let routerArr = [];
r.keys().forEach((key) => {
    routerArr = routerArr.concat(r(key).default);
})

let otherRouters = [
    // {
    //     path: '*',
    //     redirect: '/productList'
    // },
];

let router = new Router({
    mode: 'history',
    base: '/',
    routes: [
        ...routerArr,
        ...otherRouters
    ]
});
Vue.use(Router);

router.beforeEach((to, from, next) => {
    //  路由发生变化修改页面title
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})

export default router
