// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有非本地环境使用懒加载
let _import;

if( process.env.NODE_ENV == 'dev' ){
    _import = file => require('@/page/' + file + '.vue').default
} else {
    _import = file => () => import('@/page/' + file + '.vue')
}

module.exports = _import;
