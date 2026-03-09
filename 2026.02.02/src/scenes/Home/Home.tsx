import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Post } from '../../types';
import styles from './Home.module.scss';

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
            .then(res => res.json())
            .then(setPosts);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>JOURNAL</h1>
            <div className={styles.postList}>
                {posts.map(post => (
                    <article key={post.id} className={styles.postItem}>
                        <Link to={`/post/${post.id}`}>
                            <h2>{post.title}</h2>
                            <p>{post.body.substring(0, 150)}...</p>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}