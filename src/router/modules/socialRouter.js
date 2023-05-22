import Layout from '@/layout/index.vue'

export default {
  path: '/social',
  meta: {
    id: 'social_securitys'
  },
  component: Layout,
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social/index.vue'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }

  ]
}
