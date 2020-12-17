
import MainLayout from 'layouts/MainLayout.vue'
import ManageEmployees from 'pages/ManageEmployees.vue'
import Reports from 'pages/Reports.vue'
import Terminal from 'pages/Terminal.vue'
import Settings from 'pages/Settings.vue'
import About from 'pages/About.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '',component: Reports },
      { path: 'Manageemployees',component: ManageEmployees },
      { path: 'terminal',component:  Terminal },
      { path: 'settings',component: Settings },
      { path: 'about',component: About },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
