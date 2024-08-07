<template>
  <div
    class="modal fade"
    id="reviewModal"
    tabindex="-1"
    aria-labelledby="reviewModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reviewModalLabel">Add Review</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitReview">
            <div class="mb-3">
              <label for="reviewer" class="form-label">Reviewer</label>
              <input
                type="text"
                class="form-control"
                id="reviewer"
                v-model="reviewer"
                required
              />
            </div>
            <div class="mb-3">
              <label for="rating" class="form-label">Rating</label>
              <input
                type="number"
                class="form-control"
                id="rating"
                v-model="rating"
                min="1"
                max="5"
                required
              />
            </div>
            <div class="mb-3">
              <label for="comment" class="form-label">Comment</label>
              <textarea
                class="form-control"
                id="comment"
                v-model="comment"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import api from "../../services/api";
import "bootstrap";

const emits = defineEmits(["review-added"]);

const props = defineProps({
  bookId: {
    type: String,
    required: true,
  },
});

const reviewer = ref("");
const rating = ref(1);
const comment = ref("");

const submitReview = async () => {
  const newReview = {
    reviewer: reviewer.value,
    rating: rating.value,
    comment: comment.value,
  };
  try {
    const response = await api.post(
      `/v1/books/${props.bookId}/reviews`,
      newReview
    );
    emits("review-added", response.data);
    // Clear the form
    reviewer.value = "";
    rating.value = 1;
    comment.value = "";
  } catch (err) {
    console.log(err);
  }
};
</script>

<style scoped>
.modal-content {
  padding: 20px;
}
</style>
