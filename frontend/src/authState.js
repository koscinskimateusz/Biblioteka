import { ref } from 'vue';


export const isLoggedIn = ref(!!localStorage.getItem('token'));


export function loginUser(token) {
  localStorage.setItem('token', token);
  isLoggedIn.value = true;
}


export function logoutUser() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
}
