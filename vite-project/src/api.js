import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://backend-project-u7dc.onrender.com/api",
    timeout: 1000,
});


export const fetchArticleList = async () => {
    try {
        const response = await apiClient.get("/articles");
        return response.data.articles;
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};

export const fetchSingleArticle = async (id) => {
    try {
        const response = await apiClient.get(`/articles/${id}`);
        return response.data.article;
        
    } catch (error) {
        console.error("Error fetching articles:", error);
        throw error;
    }
};

export const fetchArticleComments = async (articleId) => {
    try {
        const response = await apiClient.get(`/articles/${articleId}/comments`);
        return response.data.comments;
    } catch (error) {
        console.log("Error fetching comments", error);
    }
};