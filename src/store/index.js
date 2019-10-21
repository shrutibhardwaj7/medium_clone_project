import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import articles from "./modules/articles";
import comments from "./modules/comments";
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage, 
  reducer: (state) => ({user: state.users.user}),
})


export default new Vuex.Store({
  state: {
  },
mutations: {
  RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION // this mutation **MUST** be named "RESTORE_MUTATION"
},
  actions: {}, 
  modules:{
    users, 
    articles, 
    comments
  },
  plugins: [vuexLocal.plugin]
});
