<template>
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <a class="nav-link active" href="">Home</a>
          </li>
          <li v-if="username" class="nav-item">
           <router-link class="nav-link" to="/editor">
              New Post
            </router-link>
          </li>
          <li v-if="username" class="nav-item">
           <router-link class="nav-link" to="/settings">
           Settings
           </router-link>
          </li>
          <li v-if="username == null" class="nav-item">
            <router-link class = "nav-link" to="/login">
              Sign In
            </router-link>
          </li>
          <li v-if="username == null" class="nav-item">
            <router-link class="nav-link" to="/register" >
            Sign Up
            </router-link>
          </li>
          <li v-if="username" class="nav-item" >
            <router-link class="nav-link" :to="`/@${username}`">
            {{ username }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
</template>
<script>
export default {
  computed:{
    username(){
      return this.$store.getters["users/username"];
    }
  }
};
</script>