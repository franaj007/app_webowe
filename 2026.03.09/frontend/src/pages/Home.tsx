import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router'; // React Router 7 używa 'react-router'
import { fetchPosts } from '../api';
import React from "react";

const Home = () => {
    const { data: posts, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    if (isLoading) return <div className="loader">Ładowanie postów...</div>;
    if (error) return <div>Wystąpił błąd!</div>;

    return (
        <div className="home-page">
            <h1>Blog Techniczny</h1>
            <div className="post-list">
                {posts.map((post: any) => (
                    <article key={post.id} className="post-card">
                        <h2>{post.tytul}</h2>
                        <p>{post.tresc.substring(0, 100)}...</p>
                        <Link to={`/post/${post.id}`} className="read-more">Czytaj więcej →</Link>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default Home;