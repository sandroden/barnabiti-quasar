import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    // name: 'layout',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        props: { slug: 'Home' },
        alias: '/home',
        component: () => import('pages/WikiPage.vue'),
      },
      {
        path: 'disegni',
        name: 'disegni',
        component: () => import('src/pages/DisegnoList.vue'),
        children: [
          {
            path: ':id',
            name: 'disegni',
            // props: route => ({ filter: route.params.id }),
            component: () => import('pages/DisegnoDetail.vue'),
            props: true,
          },
        ],
      },
      {
        path: 'autori',
        name: 'autori',
        component: () => import('src/pages/AutoreList.vue'),
      },
      {
        path: 'archivi',
        name: 'archivi',
        // props: { slug: 'archivi' },
        component: () => import('pages/CollocazioniList.vue'),
      },
      {
        path: 'collegi',
        name: 'collegi',
        // props: { slug: 'collegi' },
        component: () => import('pages/CollegiList.vue'),
      },
      {
        path: 'cerca',
        name: 'cerca',
        props: { slug: 'cerca' },
        component: () => import('pages/WikiPage.vue'),
      },
      {
        path: 'guida',
        name: 'guida',
        props: { slug: 'Guida' },
        component: () => import('pages/WikiPage.vue'),
      },
      {
        path: 'contatti',
        name: 'contatti',
        props: { slug: 'Contatti' },
        component: () => import('pages/WikiPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
