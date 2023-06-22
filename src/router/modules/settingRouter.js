import Layout from '@/layout/index.vue'

export default {
  path: '/setting',
  meta: {
    id: 'settings'
  },
  component: Layout,
  children: [
    {
      path: '',
      name: 'setting',
      component: () => import('@/views/setting/index.vue'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}
