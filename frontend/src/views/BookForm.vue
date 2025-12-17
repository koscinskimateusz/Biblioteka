<template>
  <div class="container">
    <h2>{{ isEdit ? 'Edytuj Książkę' : 'Nowa Książka' }}</h2>
    <form @submit.prevent="saveBook">
      <div>
        <label>Tytuł:</label>
        <input v-model="form.title" required />
      </div>
      <div>
        <label>Autor:</label>
        <input v-model="form.author" required />
      </div>
      <div>
        <label>ISBN:</label>
        <input v-model="form.isbn" required />
      </div>
      <button type="submit">Zapisz</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const form = ref({ title: '', author: '', isbn: '' });

// Sprawdzamy czy w URL jest ID
const isEdit = computed(() => !!route.params.id);

onMounted(async () => {
  if (isEdit.value) {
    const res = await axios.get(`/api/books/${route.params.id}`);
    form.value = res.data;
  }
});

const saveBook = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`/api/books/${route.params.id}`, form.value);
    } else {
      await axios.post('/api/books', form.value);
    }
    router.push('/');
  } catch (err) {
    alert('Błąd zapisu!');
  }
};
</script>
