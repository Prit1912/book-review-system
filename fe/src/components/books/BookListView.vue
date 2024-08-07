<template>
  <div class="card my-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h3 class="card-title">{{ book.title }}</h3>
          <p class="card-text">Author: {{ book.author }}</p>
          <p class="card-text">Genre: {{ book.genre }}</p>
          <p class="card-text summary">Summary: {{ book.summary }}</p>
          <p class="card-text">
            Published Date:
            {{ new Date(book.publishedDate).toLocaleDateString() }}
          </p>
        </div>
        <div>
          <i class="fas fa-eye text-info me-3" @click="viewBook"></i>
          <i class="fas fa-edit text-primary me-3" @click="editBook"></i>
          <i
            class="fas fa-trash-alt text-danger"
            @click="confirmDeleteBook"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import api from "../../services/api"; // Adjust the import path according to your project structure

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["bookDeleted"]);

const router = useRouter();

const viewBook = () => {
  router.push(`/books/${props.book.id}`);
};

const editBook = () => {
  router.push(`/books/${props.book.id}/edit`);
};

const deleteBook = async () => {
  try {
    await api.delete(`/v1/books/${props.book.id}`);
    emit("bookDeleted", props.book.id);
  } catch (error) {
    console.error("Failed to delete the book", error);
  }
};

const confirmDeleteBook = () => {
  if (confirm("Are you sure you want to delete this book?")) {
    deleteBook();
  }
};
</script>

<style scoped>
.card-title {
  margin-bottom: 0.5rem;
  font-size: 1.25rem; /* Adjust font size as needed */
  font-weight: bold;
  overflow: hidden; /* Ensures text doesn't overflow */
  text-overflow: ellipsis; /* Adds ellipsis for overflowed text */
  white-space: nowrap; /* Prevents wrapping */
}

.card-text {
  margin-bottom: 0.3rem;
  overflow: hidden; /* Ensures text doesn't overflow */
  text-overflow: ellipsis; /* Adds ellipsis for overflowed text */
  white-space: nowrap; /* Prevents wrapping */
}

.card-body {
  padding: 1rem; /* Add padding to prevent text from sticking to edges */
}

.fas:hover {
  cursor: pointer;
}

.card-text.summary {
  margin-bottom: 0.3rem;
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Add ellipsis */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Adjust the number of lines to show */
  -webkit-box-orient: vertical;
  white-space: normal; /* Allow wrapping */
}
</style>
