<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-10 col-sm-8 col-md-6 col-lg-4">
        <h4 class="text-center">
          {{ isEditMode ? "Edit Book" : "Add New Book" }}
        </h4>
        <hr />
        <div v-if="error" class="alert alert-danger" role="alert">
          {{ error }}
        </div>
        <form
          @submit.prevent="submit"
          class="row row-cols-lg-auto g-3 align-items-center"
        >
          <!-- Title Field -->
          <div class="col-12">
            <label for="title">Title</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-book"></i>
              </div>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="Title"
                v-model="title"
              />
            </div>
            <span class="error">{{ errorTitle }}</span>
          </div>

          <!-- Author Field -->
          <div class="col-12">
            <label for="author">Author</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-user"></i>
              </div>
              <input
                type="text"
                class="form-control"
                id="author"
                placeholder="Author"
                v-model="author"
              />
            </div>
            <span class="error">{{ errorAuthor }}</span>
          </div>

          <!-- Genre Field -->
          <div class="col-12">
            <label for="genre">Genre</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-tags"></i>
              </div>
              <input
                type="text"
                class="form-control"
                id="genre"
                placeholder="Genre"
                v-model="genre"
              />
            </div>
            <span class="error">{{ errorGenre }}</span>
          </div>

          <!-- Summary Field -->
          <div class="col-12">
            <label for="summary">Summary</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-align-left"></i>
              </div>
              <textarea
                class="form-control"
                id="summary"
                placeholder="Summary"
                v-model="summary"
              ></textarea>
            </div>
            <span class="error">{{ errorSummary }}</span>
          </div>

          <!-- Published Date Field -->
          <div class="col-12">
            <label for="publishedDate">Published Date</label>
            <div class="input-group">
              <div class="input-group-text">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <input
                type="date"
                class="form-control"
                id="publishedDate"
                v-model="publishedDate"
                :max="today"
              />
            </div>
            <span class="error">{{ errorPublishedDate }}</span>
          </div>

          <div class="col-12">
            <button
              class="btn btn-primary d-block w-100"
              style="background-color: blueviolet"
            >
              {{ isEditMode ? "Update Book" : "Add Book" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import api from "../../services/api";

const props = defineProps({
  bookId: {
    type: String,
    default: null,
  },
});

const emits = defineEmits(["finished"]);

const isEditMode = ref(!!props.bookId);
const today = ref(new Date().toISOString().split("T")[0]);

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  genre: yup.string().required("Genre is required"),
  summary: yup.string().required("Summary is required"),
  publishedDate: yup.date().required("Published Date is required"),
});

// Helper function to format date for input
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

// Helper function to parse date from input
const parseDate = (dateString) => {
  return new Date(dateString).toISOString();
};

const { handleSubmit } = useForm({
  validationSchema,
});

const { value: title, errorMessage: errorTitle } = useField("title");
const { value: author, errorMessage: errorAuthor } = useField("author");
const { value: genre, errorMessage: errorGenre } = useField("genre");
const { value: summary, errorMessage: errorSummary } = useField("summary");
const { value: publishedDate, errorMessage: errorPublishedDate } =
  useField("publishedDate");

const error = ref("");

const submit = handleSubmit(async (values) => {
  try {
    // Convert the date back to a suitable format before sending
    const formattedValues = {
      ...values,
      publishedDate: parseDate(values.publishedDate),
    };

    if (isEditMode.value) {
      await api.put(`/v1/books/${props.bookId}`, formattedValues);
    } else {
      await api.post("/v1/books", formattedValues);
    }
    emits("finished");
  } catch (err) {
    console.log(err);
    error.value = "Something went wrong";
  }
});

onMounted(async () => {
  if (isEditMode.value) {
    try {
      const response = await api.get(`/v1/books/${props.bookId}`);
      title.value = response.data.title;
      author.value = response.data.author;
      genre.value = response.data.genre;
      summary.value = response.data.summary;
      publishedDate.value = formatDate(response.data.publishedDate);
    } catch (err) {
      console.log(err);
      error.value = "Failed to load book details";
    }
  }
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
