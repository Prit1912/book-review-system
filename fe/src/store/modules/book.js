import { toast } from "vue3-toastify";
import api from "../../services/api";

export const book = {
  namespaced: true,
  strict: true,
  state: {
    books: [],
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
    },
  },
  actions: {
    async fetchBooks({ commit }, { page, limit }) {
      try {
        const response = await api.get("/v1/books", {
          params: { page, limit },
        });
        commit("SET_BOOKS", response?.data?.books || []);
        return response?.data;
      } catch (error) {
        toast.error(
          error?.response?.data?.error || "error fetching book details"
        );
        console.error("Error fetching books:", error);
      }
    },
  },
  getters: {
    allBooks: (state) => state.books,
  },
};
