import _import from '@/router/_import';

export default [
    {
        path: '/',
        redirect: '/demo'
    },
    {
        path: '/demo',
        name: 'demo',
        component: _import('demo/demo'),
        meta: {
            title: "案例",
        }
    },

]
