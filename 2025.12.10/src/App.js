import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Blog from './Blog';
import About from './About';

function App() {
    return (
        <BrowserRouter>
            <nav style={{ padding: "10px", background: "#f4f4f4" }}>
                <Link to="/" style={{ margin: "10px" }}>Home</Link>
                <Link to="/blog" style={{ margin: "10px" }}>Blog</Link>
                <Link to="/about" style={{ margin: "10px" }}>O nas</Link>
            </nav>

            <div style={{ padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;