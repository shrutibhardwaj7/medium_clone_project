import { api } from "../api";
export default{
    namespaced: true, 
    state: {
        article: {},
        feed: [], 
        count: 0
    }, 
    mutations:{
        setArticles(state, { articles, articlesCount }){
            state.feed = articles;
            state.count = articlesCount;
        }, 
        setArticle(state, {article}){
            state.article = article;
        }
    }, 
    actions: {
        async getGlobalFeed({ commit }, payload = { page: 1 }){
            let route = "/articles";
            if(payload){
                const{
                    tag = null,
                    author = null, 
                    favourited = null,
                    page = 1
                } = payload;
                route += tag ? `?tag=${tag}&` : "";
                route += author ? `?author=${author}&` : "";
                route += favourited ? `?favourited=${favourited}&` : "";
                route += page ? `?offset=${(page-1) * 10}&limit=10` : "";
            }
            const response = await api.get(route);
            commit("setArticles", response.data);
        }, 
        async getUserFeed({ commit }, payload = {page: 1}){
            let route = "/articles/feed";
            if(payload){
                const { page = 1 } = payload;
                route += page ? `?offset=${(page-1) *10}&limit=10` : ""; 
            }
            const response = await api.get(route);
            commit("setArticles", response.data);

        }, 
        async getArticle({ commit }, payload ){
            let route = "/articles/";
            if(payload) {
                route += payload ; 
            }
            const response = await api.get(route);
            commit("setArticle", response.data);
        }, 
        async createArticle({ commit }, { title, description, body, tagList }) {
            try {
                const response = await api.post("/articles", {
                    article: {
                        title,
                        description, 
                        body, 
                        tagList
                    }
                });
                if (response.data.article) {
                    commit("setArticle", response.data.article);
                }
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
}