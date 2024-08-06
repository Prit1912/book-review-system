<template>
  <BookForm @finished="handleFinished" />
</template>

<script setup>
import BookForm from "../components/books/BookForm.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleFinished = () => {
  router.push({ name: "BooksList" });
};
</script>

<style scoped></style>
