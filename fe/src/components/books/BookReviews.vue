<template>
  <div class="book-reviews">
    <h3>Reviews</h3>
    <div v-if="reviews.length === 0">No reviews available</div>
    <ul v-else>
      <div v-for="review in reviews" :key="review._id" class="review-item">
        <p><strong>Reviewer:</strong> {{ review.reviewer }}</p>
        <p><strong>Rating:</strong> {{ review.rating }}</p>
        <p><strong>Comment:</strong> {{ review.comment }}</p>
        <p><strong>Reviewed on: </strong>{{ formatDate(review.createdAt) }}</p>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  reviews: {
    type: Array,
    required: true,
  },
});

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
.book-reviews {
  margin-top: 20px;
}

.review-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
</style>
