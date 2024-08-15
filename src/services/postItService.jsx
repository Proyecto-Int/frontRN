// PostItService.js
import api from "./api";

class PostItService {
    // Obtener todos los Post-Its por Canvas ID
    static async getAllPostItsByCanvas(canvasId) {
        try {
            const response = await api.get(`/postits/canvas/${canvasId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post-its:', error);
            throw error;
        }
    }

    // Crear un nuevo Post-It
    static async createPostIt(postItDTO) {
        try {
            const response = await api.post('/postits/create', postItDTO);
            return response.data;
        } catch (error) {
            console.error('Error creating post-it:', error);
            throw error;
        }
    }

    // Obtener un Post-It por ID
    static async getPostItById(id) {
        try {
            const response = await api.get(`/postits/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching post-it:', error);
            throw error;
        }
    }

    // Actualizar un Post-It por ID
    static async updatePostIt(id, postItDTO) {
        try {
            const response = await api.put(`/postits/update/${id}`, postItDTO);
            return response.data;
        } catch (error) {
            console.error('Error updating post-it:', error);
            throw error;
        }
    }

    // Eliminar un Post-It por ID
    static async deletePostIt(id) {
        try {
            await api.delete(`/postits/delete/${id}`);
        } catch (error) {
            console.error('Error deleting post-it:', error);
            throw error;
        }
    }
}

export default PostItService;
