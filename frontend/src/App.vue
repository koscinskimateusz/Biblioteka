<script setup>
  import { RouterLink, RouterView, useRouter } from 'vue-router'
  import { isLoggedIn, logoutUser } from './authState';
  import { ref, computed } from 'vue';

  const router = useRouter();
  
  

  const logout = () => {
    
    logoutUser();
    router.push('/login');
  };
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Książki</RouterLink>
        <RouterLink to="/readers">Czytelnicy</RouterLink>
        <RouterLink to="/loans">Wypożyczenia</RouterLink>

        
          <button v-if="isLoggedIn" @click="logout" class="btn-logout">Wyloguj</button>
          <RouterLink v-else to="/login">Zaloguj</RouterLink>
        
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  
  header {
    background-color: #f8f9fa;
    padding: 1rem;
    border-bottom: 1px solid #ddd;
    margin-bottom: 2rem;
  }

  nav {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

    nav a {
      text-decoration: none;
      color: #2c3e50;
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }

      nav a:hover {
        background-color: #e9ecef;
      }

      
      nav a.router-link-active {
        color: #42b883;
        background-color: #e2f7ed;
      }
</style>
