import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data';
import '../styles/Post.scss';

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Szukamy posta w tablicy
    const post = posts.find(p => p.id === Number(id));

    if (!post) {
        return <div className="not-found">Nie znaleziono wpisu. <Link to="/">Wróć</Link></div>;
    }

    return (
        <article className="post-content">
            <Link to="/" className="back-link">← Wróć do listy</Link>
            <header>
                <span className="category">{post.category}</span>
                <h1>{post.title}</h1>
                <div className="meta">
                    <time>{post.date}</time>
                </div>
            </header>
            <div className="body">
                <p>{post.content}</p>
            </div>
        </article>
    );
};

export default PostPage;