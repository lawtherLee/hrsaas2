import Layout from '@/layout'

export default {
  path: '/departments',
  component: Layout,
  meta: {
    id: 'departments'
  },
  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/department/index.vue'),
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}
