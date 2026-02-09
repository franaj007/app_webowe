import React from 'react';
import PostCard from '../components/PostCard';
import { posts } from '../data'; // Pobieramy dane z pliku
import '../styles/Home.scss';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            <header>
                <h1>Najnowsze Wpisy</h1>
                <p>Inspiracje, tutoriale i kod.</p>
            </header>
            <div className="post-grid">
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default Home;