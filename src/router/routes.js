const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('pages/PageHome.vue'),
            },
            {
                path: '/search',
                name: 'Search',
                component: () => import('pages/PageSearch.vue'),
            },
            {
                path: '/editor',
                name: 'Editor',
                component: () => import('pages/PageEditor.vue'),
            },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
