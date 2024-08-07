import { createRouter, createWebHistory } from "vue-router";

// Define routes with lazy loading
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/books",
    name: "BooksList",
    component: () => import("../views/Books.vue"),
  },
  {
    path: "/books/:id",
    name: "BookDetails",
    component: () => import("../views/BookDetail.vue"),
    props: true,
  },
  {
    path: "/books/:id/edit",
    name: "EditBook",
    component: () => import("../views/EditBook.vue"),
    props: true,
  },
  {
    path: "/books/add-book",
    name: "AddBook",
    component: () => import("../views/AddBook.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
