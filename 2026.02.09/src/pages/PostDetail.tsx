import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { fetchPost, fetchUser, fetchComments } from '../api';
import React from "react";


const PostDetail = () => {
    const { id } = useParams();

    // 1. Pobieramy treść posta
    const postQuery = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPost(id!)
    });

    // 2. Pobieramy autora (zależne od postQuery)
    const userQuery = useQuery({
        queryKey: ['user', postQuery.data?.userId],
        queryFn: () => fetchUser(postQuery.data.userId),
        enabled: !!postQuery.data?.userId // Zapytanie ruszy tylko gdy mamy userId
    });

    // 3. Pobieramy komentarze
    const commentsQuery = useQuery({
        queryKey: ['comments', id],
        queryFn: () => fetchComments(id!)
    });

    if (postQuery.isLoading) return <div>Ładowanie treści...</div>;

    return (
        <div className="post-detail">
            <Link to="/" className="back">← Powrót</Link>

            <header>
                <h1>{postQuery.data.title}</h1>
                {userQuery.data && (
                    <p className="author">Autor: <strong>{userQuery.data.name}</strong> ({userQuery.data.email})</p>
                )}
            </header>

            <div className="post-body">{postQuery.data.body}</div>

            <section className="comments-section">
                <h3>Komentarze ({commentsQuery.data?.length || 0})</h3>
                {commentsQuery.isLoading ? <p>Ładowanie komentarzy...</p> : (
                    <ul>
                        {commentsQuery.data.map((c: any) => (
                            <li key={c.id}>
                                <strong>{c.email}</strong>: {c.body}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default PostDetail;