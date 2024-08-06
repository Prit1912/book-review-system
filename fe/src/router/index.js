import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Books from "../views/Books.vue";
import AddBook from "../views/AddBook.vue";
import BookDetail from "../views/BookDetail.vue";
import EditBook from "../views/EditBook.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/books",
    name: "BooksList",
    component: Books,
  },
  {
    path: "/books/:id",
    name: "BookDetails",
    component: BookDetail,
    props: true,
  },
  {
    path: "/books/:id/edit",
    name: "EditBook",
    component: EditBook,
    props: true,
  },
  {
    path: "/books/add-book",
    name: "AddBook",
    component: AddBook,
  },
  // {
  // path: "/about",
  // name: "About",
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  // component: () =>
  // import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
