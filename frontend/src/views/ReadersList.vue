<template>
  <div class="list-container">
    <div class="header">
      <h2>Lista Czytelników</h2>
      <router-link to="/readers/new" class="add-btn">+ Dodaj Czytelnika</router-link>
    </div>

    <div v-if="errorMessage" class="alert error">
      <span>{{ errorMessage }}</span>
      <button class="close-btn" @click="errorMessage = ''">✖</button>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Nazwisko i Imię</th>
            <th>Email</th>
            <th>Data rejestracji</th>
            <th class="text-center">Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reader in readers" :key="reader.id">
            <td class="name-cell">
              <strong>{{ reader.lastName }}</strong> {{ reader.firstName }}
            </td>
            <td>{{ reader.email }}</td>
            <td>{{ new Date(reader.createdAt).toLocaleDateString() }}</td>

            <td class="actions-cell">
              <!--<button class="btn-icon edit" disabled title="Edycja (wkrótce)">
                ✏️
              </button>-->

              <button @click="deleteReader(reader)"
                      class="btn-icon delete"
                      title="Usuń"
                      :disabled="isDeleting === reader.id">
                {{ isDeleting === reader.id ? '⏳' : '🗑️' }}
              </button>
            </td>
          </tr>

          <tr v-if="readers.length === 0">
            <td colspan="4" class="text-center">Brak czytelników w bazie.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const readers = ref([]);
  const errorMessage = ref('');
  const isDeleting = ref(null); // ID czytelnika, który jest aktualnie usuwany

  // --- Pobieranie Czytelników ---
  const fetchReaders = async () => {
    try {
      const res = await axios.get('/api/readers');
      readers.value = res.data;
    } catch (err) {
      console.error("Błąd pobierania czytelników", err);
      errorMessage.value = "Nie udało się pobrać listy czytelników.";
    }
  };

  // --- Usuwanie Czytelnika ---
  const deleteReader = async (reader) => {
    // 1. Potwierdzenie
    const confirmMsg = `Czy na pewno chcesz usunąć czytelnika:\n${reader.firstName} ${reader.lastName}?\n\nTej operacji nie można cofnąć.`;
    if (!window.confirm(confirmMsg)) return;

    // 2. Start procesu (UI)
    isDeleting.value = reader.id;
    errorMessage.value = '';

    try {
      // 3. Strzał do API
      await axios.delete(`/api/readers/${reader.id}`);

      // 4. Sukces - odświeżamy listę
      // (Można by też usunąć z tablicy lokalnie: readers.value = readers.value.filter(...))
      await fetchReaders();

    } catch (err) {
      // 5. Obsługa Błędów
      if (err.response && err.response.status === 409) {
        errorMessage.value = `BŁĄD: Nie można usunąć czytelnika ${reader.lastName}, ponieważ ma on niezwrócone książki!`;
      } else {
        errorMessage.value = "Wystąpił błąd podczas usuwania użytkownika.";
        console.error(err);
      }
    } finally {
      isDeleting.value = null;
    }
  };

  onMounted(fetchReaders);
</script>

<style scoped>
  .list-container {
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

  tr:hover {
    background-color: #f8f9fa;
  }

  .name-cell {
    color: #2c3e50;
  }

  .text-center {
    text-align: center;
  }

  /* Akcje */
  .actions-cell {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .btn-icon {
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    padding: 6px 10px;
    font-size: 1.1rem;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

    .btn-icon.delete:hover {
      background-color: #ffebee;
      border-color: #f44336;
    }

    .btn-icon.edit:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      background-color: #f0f0f0;
    }

    .btn-icon:disabled {
      cursor: wait;
    }

  /* Alerty */
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
</style>
