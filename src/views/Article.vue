<template>
<div v-if="article" class="article-page">
 <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <div class="article-meta">
        <a href=""><img :src="article.author.image" /></a>
        <div class="info">
          <a href="" class="author">{{article.author.username}}</a>
          <span class="date">{{ formatDate(article.createdAt) }}</span>
        </div>
        <button v-if="username != article.author.username" class="btn btn-sm btn-outline-secondary" >
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow {{article.author.username}} 
        </button>
        &nbsp;&nbsp;
        <button v-if="username != article.author.username"  class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp;
          Favorite Post <span class="counter">({{article.favoritesCount}})</span>
        </button>
        &nbsp;&nbsp;
         <button v-if="username == article.author.username"  class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp;
          Edit Article 
        </button>
        &nbsp;&nbsp;
         <button v-if="username == article.author.username" @click.prevent="deleteArticle" class="btn btn-sm btn-outline-primary">
          <i class="ion-heart"></i>
          &nbsp;
          Delete Article 
        </button>
      </div>

    </div>
  </div>

  <div class="container page">
    <div class="row article-content">
      <div class="col-md-12">
        <p>
        {{article.body}}
        </p>        
      </div>
    </div>
    <hr />
   
      <div v-if="username" class="col-xs-12 col-md-8 offset-md-2">
        <form class="card comment-form">
          <div class="card-block">
            <textarea v-model=commentBody class="form-control" placeholder="Write a comment..." rows="3"></textarea>
          </div>
          <div class="card-footer">
            <img :src="profileImage" class="comment-author-img" />
            <button @click.prevent="postComment"  class="btn btn-sm btn-primary">
             Post Comment
            </button>
          </div>
        </form>
         <Comment
       v-for="comment in allComments" 
       :key="comment.body"
       :comment="comment">
       </Comment>
      </div>
        
      </div>
    </div>

</template>
<script>
import moment from "moment";
import store from "@/store";
import Comment from "@/components/Comment.vue"
export default { 
  components:{
    Comment
  },
  data () {
    return {
     commentBody:null,
     article:null, 
     comments: []
    }
  },  
  methods:{
    fetchArticle(){
      this.article = this.$store.state.articles.article;
    }, 
    fetchComments(){
      this.comments = this.$store.state.comments.comments;
    },
     formatDate(dateString){
            return moment(dateString).format("MMMM Do, YYYY");
    }, 
    postComment(){
      this.$store.dispatch("comments/postComment",{
        body: this.commentBody,
        slug: this.article.slug
      }).then(() => {
        this.$router.push({ name: "article" , params: { slug: this.article.slug }});
        this.commentBody = "";
      })
    }, 
    deleteArticle(){
      this.$store.dispatch("articles/deleteArticle",{
       slug: this.article.slug
      }).then(() => {
        this.$router.push({ name: "home" });
      })
      .catch(err => {
        this.errors.push(err)
      })
    }
  },
  created(){
    this.fetchArticle();
    this.fetchComments();
  },
    beforeRouteEnter(to, from, next) {
    Promise.all([
      store.dispatch("articles/getArticle",to.params.slug), 
      store.dispatch("comments/getComments",to.params.slug)      
    ]).then(() => {
      next();      
    });
  },
  computed:{
    username(){
      return this.$store.getters["users/username"];
    }, 
    profileImage(){
      return this.$store.getters["users/profileImage"];
    }, 
    allComments(){
      return this.$store.state.comments.comments || [];
    }
  }
}
</script>