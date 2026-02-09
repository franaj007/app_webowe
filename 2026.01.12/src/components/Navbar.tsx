import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.scss';

const Navbar: React.FC = () => (
    <nav className="navbar">
        <div className="container nav-content">
            <Link to="/" className="logo">MyBlog.</Link>
            <div className="links">
                <Link to="/">Główna</Link>
                <Link to="/categories">Kategorie</Link>
            </div>
        </div>
    </nav>
);

export default Navbar;