import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { Post, User, Comment } from '../../types';
import styles from './Posts.module.scss';

export default function Posts() {
    const { id } = useParams();
    const [data, setData] = useState<{ post: Post; user: User; comments: Comment[] } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            const post: Post = await postRes.json();

            const [userRes, commRes] = await Promise.all([
                fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`),
                fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            ]);

            setData({
                post,
                user: await userRes.json(),
                comments: await commRes.json()
            });
        };
        fetchData();
    }, [id]);

    if (!data) return <div className={styles.container}>Loading...</div>;

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.backBtn}>BACK TO FEED</Link>

            <article className={styles.article}>
                <h1>{data.post.title}</h1>
                <p className={styles.content}>{data.post.body}</p>

                <div className={styles.authorCard}>
                    <h4>Written by</h4>
                    <p>{data.user.name} ({data.user.email})</p>
                </div>
            </article>

            <section className={styles.commentsSection}>
                <h3>Discussion</h3>
                {data.comments.map(c => (
                    <div key={c.id} className={styles.comment}>
                        <span>{c.email.toLowerCase()}</span>
                        <p>{c.body}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}