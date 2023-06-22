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
    },
    {
      path: 'archiving',
      component: () => import('@/views/attendance/historical'),
      name: 'archiving',
      hidden: true,
      meta: {
        title: '归档'
      }
    },
    {
      path: 'report/:month',
      component: () => import('@/views/attendance/report'),
      name: 'reports',
      hidden: true,
      meta: {
        title: '报表'
      }
    }
  ]
}
