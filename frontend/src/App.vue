<script setup>
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Książki</RouterLink>
        <RouterLink to="/readers">Czytelnicy</RouterLink>
        <RouterLink to="/loans">Wypożyczenia</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  /* Proste style dla nawigacji */
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

      /* Styl dla aktywnego linku (Vue dodaje tę klasę automatycznie) */
      nav a.router-link-active {
        color: #42b883;
        background-color: #e2f7ed;
      }
</style>
