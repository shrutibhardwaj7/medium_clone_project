import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path:"/login", 
      name: "login", 
      component: () => import('@/views/Login.vue')
      //coz of this dynamic function, login page loads lazily later on, and not at the first when app is loaded
    }, 
    {
      path:"/register", 
      name: "register", 
      component: () => import('@/views/Register.vue')
      //coz of this dynamic function, login page loads lazily later on, and not at the first when app is loaded
    }, 
    {
      path:"/settings", 
      name: "settings", 
      component: ()=> import('@/views/Settings.vue')
    },     
    {
      path: "/editor", 
      name: "editor_new", 
      component: () => import('@/views/ArticleCreate.vue')
    },
    {
      path: "/editor/:article-slug", 
      name: "editor_edit", 
      component: () => import('@/views/ArticleEdit.vue')
    }, 
    {
      path: "/article/:slug", 
      name: "article", 
      component: () => import('@/views/Article.vue')
    }, 
    {
      path: "/:username", 
      name: "profile", 
      component: ()=> import('@/views/Profile.vue')
    }, 
  ]
});
