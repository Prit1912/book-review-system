<template>
  <div class="container my-5">
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="!loading && book">
      <BookDetails :book="book" />
      <button
        class="btn btn-primary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#reviewModal"
      >
        Add Review
      </button>
      <hr />
      <BookReviews :reviews="reviews" />
    </div>
    <ReviewModal @review-added="handleReviewAdded" :bookId="bookId" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "../services/api";
import BookDetails from "../components/books/BookDetails.vue";
import BookReviews from "../components/books/BookReviews.vue";
import ReviewModal from "../components/books/ReviewModal.vue";

const route = useRoute();
const bookId = route.params.id;

const book = ref(null);
const loading = ref(true);
const error = ref("");
const reviews = ref([]);

onMounted(async () => {
  try {
    const response = await api.get(`/v1/books/${bookId}`);
    book.value = response.data;
    const reviewResponse = await api.get(`/v1/books/${bookId}/reviews`);
    reviews.value = reviewResponse.data;
  } catch (err) {
    error.value = "Failed to load book details";
  } finally {
    loading.value = false;
  }
});

const handleReviewAdded = async () => {
  const reviewResponse = await api.get(`/v1/books/${bookId}/reviews`);
  reviews.value = reviewResponse.data;
};
</script>

<style scoped>
.spinner-border {
  display: block;
  margin: auto;
}
</style>
