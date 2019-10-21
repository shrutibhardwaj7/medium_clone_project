import { api } from "../api";
export default {
    namespaced: true,
    state: {
        comments: [],
        postedComment: null
    },
    mutations: {
        setComments(state, { comments }) {
            state.comments = comments;
        },
        setComment(state, { comment }) {
            state.comments.push(comment);
        }
    },
    actions: {
        async getComments({ commit }, payload) {
            let route = "/articles/";
            if (payload) {
                route += payload;
            }
            route += "/comments";
            const response = await api.get(route);
            commit("setComments", response.data);
        },
        async postComment({ commit }, payload) {
            try {
                let route = "/articles/";
                let body= null;
                let slug = null;
                if (payload) {
                    body = payload.body;
                    slug = payload.slug;
                    route += slug ? `${slug}/comments` : "";
                }
                const response = await api.post(route, {
                    comment: {
                        body
                    }
                });
                if (response.data.comment) {
                    commit("setComment", response.data);

                }
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
    }
}