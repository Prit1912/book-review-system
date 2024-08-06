<template>
  <div class="book-details">
    <h2>{{ book.title }}</h2>
    <p><strong>Author:</strong> {{ book.author }}</p>
    <p><strong>Genre:</strong> {{ book.genre }}</p>
    <p><strong>Summary:</strong> {{ book.summary }}</p>
    <p><strong>Published Date:</strong> {{ book.publishedDate }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  book: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.book-details {
  margin: 20px 0;
}
</style>
