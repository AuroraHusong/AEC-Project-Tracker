import { useState, useEffect } from "react";
import type { Comment} from "../types/comment";
import { getComments, createComment } from "../services/commentService";
import "./Comments.css"

interface CommentsProps {
    projectId: number;
}

const Comments = ({ projectId }: CommentsProps) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [author, setAuthor] = useState("");
    const [body, setBody] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(()=> {
        const fetchComments = async () => {
            try{
                const data = await getComments(projectId);
                setComments(data);
            } catch (err) {
                setError("Failed to load comments");
            } finally {
                setLoading(false);
            }
        }
        fetchComments();
    }, [projectId]);

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        setSubmitting(true);
        try {
            const newComment = await createComment({
                project_id: projectId,
                author,
                body,
            });
            setComments([newComment, ...comments]);
            setAuthor("");
            setBody("");
        } catch(err) {
            setError("Failed to create comment");
        } finally {
            setSubmitting(false);
        }
    }
    if (loading) return <div>Loading Comments...</div>

    return(
        <div className="comments-section">
            <p className="section-title">Comments</p>

            {error && <p className="form-error">{error}</p>}

            <div className="comments-list">
                {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className="comment-header">
                    <strong>{comment.author}</strong>
                    <span className="comment-date">
                        {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                    </div>
                    <p className="comment-body">{comment.body}</p>
                </div>
                ))}
            </div>

            <form className="comment-form" onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                />
                <input
                type="text"
                placeholder="Add a comment..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                />
                <button type="submit" disabled={submitting}>
                {submitting ? "Posting..." : "Post"}
                </button>
            </form>
        </div>
    )
}

export default Comments;