import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL


class CommentService {


    async createComment(comment) {
        try {
            return await axios.post('/comment/createComment', comment, { withCredentials: true })
        } catch (error) {
            return error
        }
    }

    async getComments(postId) {
        try {
            return await axios.post('/comment/getAllComments', { postId }, { withCredentials: true });
        } catch (error) {
            return error
        }
    }

    async likeComment(commentId) {
        try {
            return await axios.patch(`/comment/likeComment/${commentId}`, {}, {
                withCredentials: true,
            });
        } catch (error) {
            return error
        }
    }

    async deleteComment(commentId) {
        try {
            return await axios.delete(`/comment/deletComment/${commentId}`, {
                withCredentials: true,
            })
        } catch (error) {
            return error
        }
    }

    async editComment(commentId, content) {
        try {
            return await axios.patch(`/comment/editComment/${commentId}`, {
                content
            }, { withCredentials: true });            
        } catch (error) {
            return error
        }
    }
}

const commentService = new CommentService();

export default commentService