import Layout from '@/layout/index.vue'

export default {
  path: '/permission',
  meta: {
    id: 'permissions'
  },
  component: Layout,
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}
