const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/tuto',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'v2', component: () => import('pages/TutoPage.vue') },
      {
        path: 'v3', component: () => import('pages/TutoPageVue3.vue')
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'accueil', component: () => import('pages/AccueilPage.vue') }
    ]
  },
  {
    path: '/list/detail/:id',
    component: () => import('pages/DetailList.vue'),
    children: [
    ]
  },
  {
    path: '/task/:id',
    component: () => import('pages/TaskDetail.vue'),
    children: [
    ]
  },
  {
    path: '/task/add/:id',
    component: () => import('pages/TaskAdd.vue'),
    children: [
    ]
  },
  {
    path: '/task/update/:id',
    component: () => import('pages/TaskUpdate.vue'),
    children: [
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
