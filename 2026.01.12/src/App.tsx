import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PostPage from './pages/Post';
import Categories from './pages/Categories';
import './styles/global.scss';

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/categories" element={<Categories />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;