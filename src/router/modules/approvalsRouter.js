import Layout from '@/layout/index.vue'

export default {
  path: '/approvals',
  component: Layout,
  meta: {
    id: 'approvals'
  },
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approval/index.vue'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }
  ]
}
