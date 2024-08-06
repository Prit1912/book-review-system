<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <h4 class="me-5 mt-2">
          <b> my<span class="primary-color">B</span>ooks </b>
        </h4>
        <!-- <img src="../assets/logo-udemy.svg" class="logo" alt="" /> -->
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
            <router-link :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'BooksList' }">Books</router-link>
          </li>
        </ul>
        <div class="d-flex">
          <button
            class="btn btn-dark me-3"
            type="button"
            @click="this.$router.replace('/books/add-book')"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import "../assets/css/style.css";
export default {
  name: "navbar",
  methods: {},
};
</script>

<style></style>
