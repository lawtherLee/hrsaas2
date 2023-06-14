import Layout from '@/layout/index.vue'

export default {
  path: '/import',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '',
      component: () => import('@/views/import'),
      meta: { hidden: true }
    }
  ]
}
