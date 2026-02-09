import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types/blog';

interface PostCardProps {
    post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => (
    <div className="post-card">
        <div className="post-meta">
            <span>{post.date}</span> • <span className="cat-tag">{post.category}</span>
        </div>
        <h2><Link to={`/post/${post.id}`}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Link to={`/post/${post.id}`} className="read-more">Czytaj dalej →</Link>
    </div>
);

export default PostCard;