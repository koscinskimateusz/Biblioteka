import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../views/BooksList.vue'
import BookForm from '../views/BookForm.vue'
import ReadersList from '../views/ReadersList.vue'
import ReaderForm from '../views/ReaderForm.vue'
import LoansList from '../views/LoansList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BooksList },
    { path: '/books/new', component: BookForm },
    { path: '/books/:id/edit', component: BookForm },
    { path: '/readers', component: ReadersList },
    { path: '/readers/new', component: ReaderForm },
    { path: '/loans', component: LoansList },
  ]
})

export default router
