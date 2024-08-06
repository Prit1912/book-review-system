<template>
  <BookForm :bookId="bookId" @finished="handleFinished" />
</template>

<script setup>
import BookForm from "../components/books/BookForm.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const bookId = route.params.id;

const handleFinished = () => {
  router.push({ name: "BooksList" });
};
</script>

<style scoped></style>
