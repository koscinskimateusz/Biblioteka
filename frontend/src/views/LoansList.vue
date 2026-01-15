<template>
  <div class="loans-container">
    <div class="header">
      <h2>Wypożyczenia</h2>
    </div>

    <div class="loan-form-card">
      <h3>Nowe Wypożyczenie</h3>

      <div v-if="errorMessage" class="alert error">
        {{ errorMessage }}
        <button class="close-btn" @click="errorMessage = ''">✖</button>
      </div>

      <form @submit.prevent="createLoan" class="loan-form">
        <div class="form-group">
          <label>Wybierz Czytelnika:</label>
          <select v-model="form.readerId" required :disabled="loadingData">
            <option disabled value="">-- Wybierz z listy --</option>
            <option v-for="reader in readers" :key="reader.id" :value="reader.id">
              {{ reader.lastName }} {{ reader.firstName }} ({{ reader.email }})
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Wybierz Książkę:</label>
          <select v-model="form.bookId" required :disabled="loadingData">
            <option disabled value="">-- Wybierz dostępną książkę --</option>
            <option v-for="book in availableBooks"
                    :key="book.id"
                    :value="book.id">
              "{{ book.title }}" - {{ book.author }} (Dostępne: {{ book.availableCount }})
            </option>
          </select>
          <div v-if="availableBooks.length === 0 && !loadingData" class="hint">
            Brak dostępnych książek do wypożyczenia.
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="isSubmitting || !form.bookId || !form.readerId">
          {{ isSubmitting ? 'Przetwarzanie...' : 'Zatwierdź Wypożyczenie' }}
        </button>
      </form>
    </div>

    <h3>Aktywne i Zakończone Wypożyczenia</h3>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Książka</th>
            <th>Czytelnik</th>
            <th>Data Wypożyczenia</th>
            <th>Data Zwrotu</th>
            <th class="text-center">Akcja</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id" :class="{'returned': loan.returnedAt}">
            <td>
              <strong>{{ loan.book?.title }}</strong><br>
              <small>{{ loan.book?.author }}</small>
            </td>
            <td>{{ loan.reader?.lastName }} {{ loan.reader?.firstName }}</td>
            <td>{{ formatDate(loan.borrowedAt) }}</td>
            <td>
              <span v-if="loan.returnedAt" class="success-text">{{ formatDate(loan.returnedAt) }}</span>
              <span v-else class="pending-text">W trakcie</span>
            </td>
            <td class="text-center">
              <button v-if="!loan.returnedAt"
                      @click="returnBook(loan.id)"
                      class="btn-small return-btn"
                      title="Zwróć książkę">
                Zwróć ⏎
              </button>
              <span v-else>✅</span>
            </td>
          </tr>
          <tr v-if="loans.length === 0">
            <td colspan="5" class="text-center">Brak historii wypożyczeń.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';

  // Dane
  const loans = ref([]);
  const readers = ref([]);
  const books = ref([]);
  const loadingData = ref(true);

  // Formularz
  const form = ref({ bookId: '', readerId: '' });
  const isSubmitting = ref(false);
  const errorMessage = ref('');

  // Computed: filtrujemy książki, żeby pokazać tylko te, które mają availableCount > 0
  const availableBooks = computed(() => {
    return books.value.filter(b => b.availableCount > 0);
  });

  // Formatowanie daty
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleString('pl-PL', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  // Pobieranie wszystkich danych potrzebnych do widoku
  const loadAllData = async () => {
    loadingData.value = true;
    try {
      const [loansRes, booksRes, readersRes] = await Promise.all([
        axios.get('/loans'),
        axios.get('/books?limit=1000'), // Pobieramy dużo, żeby mieć listę do selecta
        axios.get('/readers')
      ]);

      loans.value = loansRes.data;
      // Backend zwraca paginację dla książek w .data, więc bierzemy .data.data
      books.value = booksRes.data.data ? booksRes.data.data : booksRes.data;
      readers.value = readersRes.data;
    } catch (err) {
      console.error(err);
      errorMessage.value = "Błąd ładowania danych systemu.";
    } finally {
      loadingData.value = false;
    }
  };

  // --- TWORZENIE WYPOŻYCZENIA ---
  const createLoan = async () => {
    isSubmitting.value = true;
    errorMessage.value = '';

    try {
      await axios.post('/loans', form.value);

      // Reset formularza
      form.value = { bookId: '', readerId: '' };

      // Odśwież dane (to ważne, bo musimy pobrać zaktualizowany stan magazynowy książek!)
      await loadAllData();

    } catch (err) {
      if (err.response && err.response.data.message) {
        errorMessage.value = err.response.data.message; // Np. "Brak dostępnych egzemplarzy"
      } else {
        errorMessage.value = "Wystąpił błąd podczas wypożyczania.";
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  // --- ZWROT KSIĄŻKI ---
  const returnBook = async (id) => {
    if (!confirm("Potwierdzasz zwrot książki?")) return;

    try {
      await axios.patch(`/loans/${id}/return`);
      await loadAllData(); // Odśwież, aby zaktualizować stany magazynowe
    } catch (err) {
      alert("Błąd podczas zwrotu książki.");
    }
  };

  onMounted(loadAllData);
</script>

<style scoped>
  .loans-container {
    max-width: 900px;
    margin: 40px auto;
    font-family: Arial, sans-serif;
    padding: 0 10px;
  }

  .loan-form-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    margin-bottom: 30px;
  }

  h3 {
    margin-top: 0;
    color: #2c3e50;
  }

  .loan-form {
    display: flex;
    gap: 15px;
    align-items: flex-end;
    flex-wrap: wrap;
  }

  .form-group {
    flex: 1;
    min-width: 250px;
  }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      font-size: 0.9rem;
    }

  select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  .btn-primary {
    background-color: #42b883;
    color: white;
    padding: 11px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    height: 42px; /* Wyrównanie do selecta */
  }

    .btn-primary:disabled {
      background-color: #a8dcc5;
      cursor: not-allowed;
    }

  .hint {
    font-size: 0.8rem;
    color: #e74c3c;
    margin-top: 5px;
  }

  /* Tabela */
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

  /* Styl dla zwróconych wierszy */
  tr.returned {
    background-color: #fcfcfc;
    color: #999;
  }

    tr.returned strong {
      color: #777;
    }

  .success-text {
    color: #42b883;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .pending-text {
    color: #e67e22;
    font-weight: bold;
    font-size: 0.9rem;
  }

  .btn-small {
    padding: 5px 10px;
    background-color: white;
    border: 1px solid #42b883;
    color: #42b883;
    border-radius: 4px;
    cursor: pointer;
  }

    .btn-small:hover {
      background-color: #42b883;
      color: white;
    }

  .alert.error {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #ef9a9a;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }

  .close-btn {
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }

  .text-center {
    text-align: center;
  }
</style>
