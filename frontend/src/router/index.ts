import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../views/BooksList.vue'
import BookForm from '../views/BookForm.vue'
import ReadersList from '../views/ReadersList.vue'
import ReaderForm from '../views/ReaderForm.vue'
import LoansList from '../views/LoansList.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: BooksList },
    { path: '/books/new', component: BookForm },
    { path: '/books/:id/edit', component: BookForm },
    { path: '/readers', component: ReadersList },
    { path: '/readers/new', component: ReaderForm },
    { path: '/loans', component: LoansList },
    { path: '/login', component: LoginView },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/']; // Strony dostępne bez logowania
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  // Jeśli strona wymaga logowania, a nie mamy tokena -> idź do logowania
  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router
