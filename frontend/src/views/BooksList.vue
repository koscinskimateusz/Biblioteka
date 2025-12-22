<template>
  <div class="books-container">
    <div class="header">
      <h2>Biblioteka Książek</h2>
      <router-link to="/books/new" class="add-btn">+ Dodaj nową</router-link>
    </div>

    <div v-if="errorMessage" class="alert error">
      <span>{{ errorMessage }}</span>
      <button class="close-btn" @click="errorMessage = ''">✖</button>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th class="text-center">Dostępne</th>
            <th class="text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.isbn }}</td>

            <td class="text-center">
              <span :class="{'out-of-stock': book.availableCount === 0}">
                {{ book.availableCount }}
              </span>
            </td>

            <td class="actions-cell">
              <router-link :to="`/books/${book.id}/edit`" class="btn-icon edit" title="Edytuj">
                ✏️
              </router-link>

              <button @click="deleteBook(book)"
                      class="btn-icon delete"
                      title="Usuń"
                      :disabled="isDeleting === book.id">
                {{ isDeleting === book.id ? '⏳' : '🗑️' }}
              </button>
            </td>
          </tr>

          <tr v-if="books.length === 0">
            <td colspan="5" class="text-center">Brak książek w bazie.</td>
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


  const books = ref([]);
  const currentPage = ref(1);
  const lastPage = ref(1);
  const limit = 5; 

  
  const errorMessage = ref('');
  const isDeleting = ref(null); 

  
  const fetchBooks = async (page) => {
    try {
      const response = await axios.get(`/api/books?page=${page}&limit=${limit}`);

      
      books.value = response.data.data;
      currentPage.value = response.data.page;
      lastPage.value = response.data.lastPage;

    } catch (error) {
      console.error("Błąd pobierania książek:", error);
      errorMessage.value = "Nie udało się pobrać listy książek.";
    }
  };

  
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage.value) {
      fetchBooks(newPage);
    }
  };

  
  const deleteBook = async (book) => {
    
    const confirmed = window.confirm(`Czy na pewno chcesz usunąć książkę: "${book.title}"?\nTej operacji nie można cofnąć.`);
    if (!confirmed) return;

    
    isDeleting.value = book.id;
    errorMessage.value = '';

    try {
      await axios.delete(`/api/books/${book.id}`);

      
      if (books.value.length === 1 && currentPage.value > 1) {
        currentPage.value--;
      }

     
      await fetchBooks(currentPage.value);

    } catch (err) {
      
      if (err.response && (err.response.status === 409 || err.response.status === 400)) {
        
        errorMessage.value = `BŁĄD: Nie można usunąć książki "${book.title}", ponieważ jest ona aktualnie wypożyczona lub wystąpił konflikt!`;
      } else {
        errorMessage.value = "Wystąpił nieoczekiwany błąd podczas usuwania.";
        console.error(err);
      }
    } finally {
      isDeleting.value = null;
    }
  };

  
  onMounted(() => {
    fetchBooks(1);
  });
</script>

<style scoped>
  .books-container {
    max-width: 900px; 
    margin: 40px auto;
    font-family: Arial, sans-serif;
    padding: 0 10px;
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
    transition: background 0.3s;
  }

    .add-btn:hover {
      background-color: #42b883;
    }

  
  .table-wrapper {
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    border-radius: 8px;
    overflow: hidden;
    background: white;
  }

  table {
    width: 100%;
    border-collapse: collapse;
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
    background-color: #f8f9fa;
  }

  .text-center {
    text-align: center;
  }

  
  .out-of-stock {
    color: #e74c3c;
    font-weight: bold;
  }

  
  .actions-cell {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .btn-icon {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    padding: 6px 10px;
    font-size: 1.1rem;
    transition: all 0.2s;
    text-decoration: none; 
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

    .btn-icon.edit:hover {
      background-color: #e3f2fd;
      border-color: #2196f3;
    }

    .btn-icon.delete:hover {
      background-color: #ffebee;
      border-color: #f44336;
    }

    .btn-icon:disabled {
      opacity: 0.5;
      cursor: wait;
    }

  
  .alert.error {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #ef9a9a;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-btn {
    background: none;
    border: none;
    color: inherit;
    font-weight: bold;
    cursor: pointer;
    font-size: 1.2rem;
  }

 
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
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
