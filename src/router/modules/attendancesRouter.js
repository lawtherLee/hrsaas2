import Layout from '@/layout/index.vue'

export default {
  path: '/attendances',
  meta: {
    id: 'attendances'
  },
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendance/index.vue'),
      meta: {
        title: '考勤',
        icon: 'skill'
      }
    }
  ]
}
