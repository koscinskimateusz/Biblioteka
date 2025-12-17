<template>
  <div class="books-container">
    <div class="header">
      <h2>Biblioteka Książek</h2>
      <router-link to="/books/new" class="add-btn">+ Dodaj nową</router-link>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th class="text-center">Dostępne</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.isbn }}</td>
            <td class="text-center">{{ book.availableCount }}</td>
          </tr>

          <tr v-if="books.length === 0">
            <td colspan="4" class="text-center">Brak książek w bazie.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination" v-if="lastPage > 1">
      <button :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
              class="page-btn">
        &laquo; Poprzednia
      </button>

      <span class="page-info">
        Strona <strong>{{ currentPage }}</strong> z {{ lastPage }}
      </span>

      <button :disabled="currentPage === lastPage"
              @click="changePage(currentPage + 1)"
              class="page-btn">
        Następna &raquo;
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  // --- ZMIENNE STANU ---
  const books = ref([]);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const limit = 5; // Ustawmy 5, żeby łatwo zobaczyć paginację na 15 elementach

  // --- FUNKCJA POBIERANIA DANYCH ---
  const fetchBooks = async (page) => {
    try {
      // Wywołujemy nasz endpoint z parametrami
      const response = await axios.get(`/api/books?page=${page}&limit=${limit}`);

      // Backend zwraca teraz obiekt: { data: [], total: ..., lastPage: ... }
      books.value = response.data.data;
      currentPage.value = response.data.page;
      lastPage.value = response.data.lastPage;

    } catch (error) {
      console.error("Błąd pobierania książek:", error);
      alert("Nie udało się pobrać listy książek.");
    }
  };

  // --- OBSŁUGA ZMIANY STRONY ---
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage.value) {
      fetchBooks(newPage);
    }
  };

  // --- START ---
  onMounted(() => {
    fetchBooks(1); // Pobierz pierwszą stronę na starcie
  });
</script>

<style scoped>
  /* Prosty i czytelny styl */
  .books-container {
    max-width: 800px;
    margin: 40px auto;
    font-family: Arial, sans-serif;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .add-btn {
    background-color: #2c3e50;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
  }

  .table-wrapper {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  .text-center {
    text-align: center;
  }

  /* Style Paginacji */
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    gap: 15px;
  }

  .page-btn {
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }

    .page-btn:hover:not(:disabled) {
      background-color: #eee;
      border-color: #bbb;
    }

    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

  .page-info {
    font-size: 0.9rem;
    color: #666;
  }
</style>
