import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { book } from "./modules/book";

export default createStore({
  plugins: [createPersistedState()],
  modules: {
    book,
  },
});
