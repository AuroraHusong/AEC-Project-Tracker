import type { Comment } from "../types/comment";

const API_BASE_URL = "https://aec-project-tracker.onrender.com";

export const getComments = async (projectId: number): Promise<Comment[]> => {
    const response = await fetch( `${API_BASE_URL}/api/comments/${projectId}`)
    if (!response.ok){
        throw new Error("Failled to fetch comments");
    }
    return response.json();
};

export const createComment = async (comment: Omit <Comment, "id" | "created_at" | "updated_at">): Promise<Comment> => {
    const response = await fetch (`${API_BASE_URL}/api/comments`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(comment),
    })
    if(!response.ok){
        throw new Error("Failed to create comment");
    }
    return response.json();
}