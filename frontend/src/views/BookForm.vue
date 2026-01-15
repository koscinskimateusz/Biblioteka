<template>
  <div class="form-container">
    <div class="card">
      <h2>{{ isEdit ? 'Edycja Książki' : 'Dodaj Nową Książkę' }}</h2>

      <div v-if="serverError" class="alert error">
        {{ serverError }}
      </div>

      <form @submit.prevent="saveBook">

        <div class="form-group">
          <label for="title">Tytuł książki *</label>
          <input id="title"
                 v-model="form.title"
                 type="text"
                 placeholder="np. Władca Pierścieni"
                 :class="{ 'invalid': errors.title }"
                 @input="clearError('title')" />
          <span v-if="errors.title" class="error-msg">{{ errors.title }}</span>
        </div>

        <div class="form-group">
          <label for="author">Autor *</label>
          <input id="author"
                 v-model="form.author"
                 type="text"
                 placeholder="np. J.R.R. Tolkien"
                 :class="{ 'invalid': errors.author }"
                 @input="clearError('author')" />
          <span v-if="errors.author" class="error-msg">{{ errors.author }}</span>
        </div>

        <div class="form-group">
          <label for="isbn">Numer ISBN *</label>
          <input id="isbn"
                 v-model="form.isbn"
                 type="text"
                 placeholder="Unikalny numer identyfikacyjny"
                 :class="{ 'invalid': errors.isbn }"
                 @input="clearError('isbn')"
                 :disabled="isEdit" />
          <small v-if="isEdit">Numeru ISBN nie można edytować.</small>
          <span v-if="errors.isbn" class="error-msg">{{ errors.isbn }}</span>
        </div>

        <div class="form-group">
          <label for="count">Liczba egzemplarzy</label>
          <input id="count"
                 v-model.number="form.availableCount"
                 type="number"
                 min="0" />
        </div>

        <div class="actions">
          <router-link to="/" class="btn btn-secondary">Anuluj</router-link>

          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">Zapisywanie...</span>
            <span v-else>Zapisz Książkę</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';

  const route = useRoute();
  const router = useRouter();

  // Stan formularza
  const form = ref({
    title: '',
    author: '',
    isbn: '',
    availableCount: 1
  });

  // Stany UI
  const isSubmitting = ref(false);
  const serverError = ref(''); // Błąd ogólny (np. z bazy)
  const errors = ref({}); // Błędy walidacji poszczególnych pól

  // Sprawdzamy tryb edycji
  const isEdit = computed(() => !!route.params.id);

  // Pobranie danych przy edycji
  onMounted(async () => {
    if (isEdit.value) {
      try {
        const res = await axios.get(`/books/${route.params.id}`);
        form.value = res.data;
      } catch (err) {
        serverError.value = "Nie udało się pobrać danych książki.";
      }
    }
  });

  // Czyszczenie błędów przy wpisywaniu
  const clearError = (field) => {
    if (errors.value[field]) {
      errors.value[field] = '';
    }
    serverError.value = '';
  };

  // Prosta walidacja frontendowa (dla szybkości interakcji)
  const validateLocal = () => {
    const errs = {};
    if (!form.value.title.trim()) errs.title = "Tytuł jest wymagany.";
    if (!form.value.author.trim()) errs.author = "Autor jest wymagany.";
    if (!form.value.isbn.trim()) errs.isbn = "ISBN jest wymagany.";

    errors.value = errs;
    return Object.keys(errs).length === 0;
  };

  const saveBook = async () => {
    // 1. Walidacja lokalna
    if (!validateLocal()) return;

    isSubmitting.value = true;
    serverError.value = '';

    try {
      if (isEdit.value) {
        await axios.put(`/books/${route.params.id}`, form.value);
      } else {
        await axios.post('/books', form.value);
      }
      // Sukces -> powrót do listy
      router.push('/');

    } catch (err) {
      // 2. Obsługa błędów z Backendu
      if (err.response) {
        const { status, data } = err.response;

        // Konflikt (Duplikat ISBN) - obsłużony w serwisie NestJS
        if (status === 409) {
          serverError.value = data.message;
        }
        // Błędy walidacji (400 Bad Request z ValidationPipe)
        else if (status === 400 && Array.isArray(data.message)) {
          // Mapujemy tablicę błędów z NestJS na nasz obiekt errors
          data.message.forEach(msg => {
            // NestJS zwraca np: "title must be a string".
            // Prostym sposobem jest wyświetlenie wszystkiego w serverError
            // lub parsowanie stringów. Tutaj dla uproszczenia:
            serverError.value = "Formularz zawiera błędy. Sprawdź poprawność danych.";
          });
          console.error(data.message);
        }
        else {
          serverError.value = "Wystąpił nieoczekiwany błąd serwera.";
        }
      } else {
        serverError.value = "Problem z połączeniem internetowym.";
      }
    } finally {
      isSubmitting.value = false;
    }
  };
</script>

<style scoped>
  .form-container {
    display: flex;
    justify-content: center;
    padding: 40px 20px;
  }

  .card {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 500px;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #2c3e50;
    text-align: center;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #34495e;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    transition: border-color 0.3s;
    box-sizing: border-box; /* Ważne, żeby padding nie rozpychał inputa */
  }

    input:focus {
      border-color: #42b883;
      outline: none;
    }

    input.invalid {
      border-color: #e74c3c;
      background-color: #fdf0ef;
    }

    input:disabled {
      background-color: #f8f9fa;
      color: #999;
      cursor: not-allowed;
    }

  .error-msg {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 5px;
    display: block;
  }

  .alert {
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }

    .alert.error {
      background-color: #fde8e8;
      color: #c0392b;
      border: 1px solid #f9d6d5;
    }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    font-family: inherit;
    transition: background 0.2s;
  }

  .btn-secondary {
    background-color: #ecf0f1;
    color: #7f8c8d;
  }

    .btn-secondary:hover {
      background-color: #bdc3c7;
    }

  .btn-primary {
    background-color: #42b883;
    color: white;
  }

    .btn-primary:hover:not(:disabled) {
      background-color: #3aa876;
    }

    .btn-primary:disabled {
      opacity: 0.7;
      cursor: wait;
    }
</style>
