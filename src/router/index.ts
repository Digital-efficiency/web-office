import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/editor'
    },
    {
      path: '/editor/:filename?',
      name: 'editor',
      component: () => import('../views/EditorView.vue'),
      props: true
    },
    {
      path: '/preview/:filename?',
      name: 'preview',
      component: () => import('../views/PreviewView.vue'),
      props: true
    }
  ]
})

export default router
