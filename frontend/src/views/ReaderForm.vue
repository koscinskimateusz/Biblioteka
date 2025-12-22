<template>
  <div class="form-container">
    <div class="card">
      <h2>Rejestracja Czytelnika</h2>

      <div v-if="serverError" class="alert error">
        {{ serverError }}
      </div>

      <form @submit.prevent="saveReader">

        <div class="form-group">
          <label for="firstName">Imię *</label>
          <input id="firstName"
                 v-model="form.firstName"
                 type="text"
                 placeholder="np. Jan"
                 :class="{ 'invalid': errors.firstName }"
                 @input="clearError('firstName')" />
          <span v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</span>
        </div>

        <div class="form-group">
          <label for="lastName">Nazwisko *</label>
          <input id="lastName"
                 v-model="form.lastName"
                 type="text"
                 placeholder="np. Kowalski"
                 :class="{ 'invalid': errors.lastName }"
                 @input="clearError('lastName')" />
          <span v-if="errors.lastName" class="error-msg">{{ errors.lastName }}</span>
        </div>

        <div class="form-group">
          <label for="email">Adres Email *</label>
          <input id="email"
                 v-model="form.email"
                 type="email"
                 placeholder="np. jan.kowalski@example.com"
                 :class="{ 'invalid': errors.email }"
                 @input="clearError('email')" />
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <div class="actions">
          <router-link to="/readers" class="btn btn-secondary">Anuluj</router-link>

          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">Zapisywanie...</span>
            <span v-else>Zarejestruj</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';

  const router = useRouter();

  // Stan formularza
  const form = ref({
    firstName: '',
    lastName: '',
    email: ''
  });

  // Stany UI
  const isSubmitting = ref(false);
  const serverError = ref('');
  const errors = ref({}); // Lokalne błędy walidacji

  // Czyszczenie błędów przy pisaniu
  const clearError = (field) => {
    if (errors.value[field]) errors.value[field] = '';
    serverError.value = '';
  };

  // Prosta walidacja adresu email (regex)
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Walidacja frontendowa
  const validateLocal = () => {
    const errs = {};
    if (!form.value.firstName.trim()) errs.firstName = "Imię jest wymagane.";
    if (!form.value.lastName.trim()) errs.lastName = "Nazwisko jest wymagane.";

    if (!form.value.email.trim()) {
      errs.email = "Email jest wymagany.";
    } else if (!isValidEmail(form.value.email)) {
      errs.email = "Podaj poprawny format adresu email.";
    }

    errors.value = errs;
    return Object.keys(errs).length === 0;
  };

  const saveReader = async () => {
    // 1. Walidacja lokalna
    if (!validateLocal()) return;

    isSubmitting.value = true;
    serverError.value = '';

    try {
      // 2. Wysłanie do API
      await axios.post('/api/readers', form.value);

      // 3. Sukces -> powrót do listy
      router.push('/readers');

    } catch (err) {
      // 4. Obsługa błędów
      if (err.response) {
        const { status, data } = err.response;

        // Konflikt (Duplikat emaila)
        if (status === 409) {
          serverError.value = data.message;
          // Opcjonalnie: podświetl pole email
          errors.value.email = "Ten email jest zajęty.";
        }
        // Błędy walidacji (400 Bad Request)
        else if (status === 400 && Array.isArray(data.message)) {
          serverError.value = "Formularz zawiera błędy. Sprawdź poprawność danych.";
          // Tutaj można by mapować błędy z backendu na pola,
          // ale walidacja lokalna zazwyczaj wyłapuje to wcześniej.
        }
        else {
          serverError.value = "Wystąpił błąd serwera. Spróbuj ponownie później.";
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
  /* Te same style co w BookForm dla spójności */
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
    box-sizing: border-box;
  }

    input:focus {
      border-color: #42b883;
      outline: none;
    }

    input.invalid {
      border-color: #e74c3c;
      background-color: #fdf0ef;
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
