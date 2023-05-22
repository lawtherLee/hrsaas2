import Layout from '@/layout/index.vue'

export default {
  path: '/salarys',
  meta: {
    id: 'salarys'
  },
  component: Layout,
  children: [
    {
      path: '',
      name: 'salarys',
      component: () => import('@/views/salary/index.vue'),
      meta: {
        title: '薪资管理',
        icon: 'money'
      }
    }
  ]
}
