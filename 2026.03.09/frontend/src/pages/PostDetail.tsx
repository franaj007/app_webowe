import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { fetchPost, fetchComments, createComment } from '../api';
import React, { useState } from "react";

const PostDetail = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [newComment, setNewComment] = useState("");

    // 1. Pobieramy treść posta
    const postQuery = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id!)
    });

    // 2. Pobieramy komentarze
    const commentsQuery = useQuery({
        queryKey: ['comments', id],
        queryFn: () => fetchComments(id!)
    });

    // 3. Mutacja do dodawania komentarza
    const createCommentMutation = useMutation({
        mutationFn: (tresc: string) => createComment({ wpisId: Number(id), tresc }),
        onSuccess: () => {
            // Po sukcesie odświeżamy listę komentarzy dla tego posta
            queryClient.invalidateQueries({ queryKey: ['comments', id] });
            setNewComment(""); // czyścimy formularz
        }
    });

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        createCommentMutation.mutate(newComment);
    };

    if (postQuery.isLoading) return <div>Ładowanie treści...</div>;
    if (postQuery.isError || !postQuery.data) return <div>Wystąpił błąd podczas ładowania posta.</div>;

    const post = postQuery.data;

    return (
        <div className="post-detail">
            <Link to="/" className="back">← Powrót</Link>

            <header>
                <h1>{post.tytul}</h1>
            </header>

            <div className="post-body">{post.tresc}</div>

            <section className="comments-section">
                <h3>Komentarze ({commentsQuery.data?.length || 0})</h3>
                
                <form onSubmit={handleCommentSubmit} className="comment-form" style={{ marginBottom: '1rem' }}>
                    <textarea 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Napisz komentarz..." 
                        rows={3} 
                        style={{ width: '100%', marginBottom: '0.5rem' }} 
                        required 
                    />
                    <button type="submit" disabled={createCommentMutation.isPending} style={{ padding: '0.5rem 1rem' }}>
                        {createCommentMutation.isPending ? 'Dodawanie...' : 'Dodaj komentarz'}
                    </button>
                    {createCommentMutation.isError && <p style={{ color: 'red' }}>Wystąpił błąd podczas dodawania.</p>}
                </form>

                {commentsQuery.isLoading ? <p>Ładowanie komentarzy...</p> : (
                    <ul>
                        {commentsQuery.data.map((c: any) => (
                            <li key={c.id}>
                                {c.tresc}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default PostDetail;