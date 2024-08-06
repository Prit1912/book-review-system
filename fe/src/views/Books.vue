<template>
  <div class="container my-5">
    <h2>Books List</h2>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!loading">
      <div v-for="book in books" :key="book._id">
        <BookListView
          :book="book"
          class="bookListView"
          @bookDeleted="removeBook"
        />
      </div>
      <div v-if="!books?.length">No books available</div>

      <!-- Pagination Controls -->
      <div class="d-flex justify-content-between mt-4">
        <button
          class="btn btn-secondary"
          :disabled="currentPage === 1"
          @click="fetchBooks(currentPage - 1)"
        >
          Previous
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          class="btn btn-secondary"
          :disabled="currentPage === totalPages"
          @click="fetchBooks(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import BookListView from "../components/books/BookListView.vue";

const store = useStore();
const books = ref([]);
const loading = ref(true);
const error = ref("");
const currentPage = ref(1);
const totalPages = ref(1);
const limit = 10; // Number of items per page

const fetchBooks = async (page) => {
  if (page < 1 || page > totalPages.value) return; // Validate page number

  loading.value = true;
  try {
    const response = await store.dispatch("book/fetchBooks", { page, limit });
    books.value = response.books;
    currentPage.value = response.currentPage;
    totalPages.value = response.totalPages;
  } catch (err) {
    console.log(err);
    error.value = "Failed to load books";
  } finally {
    loading.value = false;
  }
};

const removeBook = async () => {
  await fetchBooks(1);
};

onMounted(async () => {
  await fetchBooks(currentPage.value);
});
</script>

<style scoped>
.spinner-border {
  display: block;
  margin: auto;
}
</style>
