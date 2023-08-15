import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomerIndex from '../views/Customer/Index.vue'
import CustomerCreate from '../views/Customer/Create.vue'
import CustomersEdit from '../views/Customer/Edit.vue'
import Login from '../views/Login.vue'
import Create from '../components/Create.vue'
import Edit from '../components/Edit.vue'
import List from '../components/List.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/customers',
      name: 'customers.index',
      component: CustomerIndex
    },
    {
      path: '/customers/create',
      name: 'customers.create',
      component: CustomerCreate
    },
    {
      path: '/customers/edit/:id',
      name: 'customers.edit',
      component: CustomersEdit
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
})

export default router
