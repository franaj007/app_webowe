import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './scenes/Home';
import Posts from './scenes/Posts';
import './index.scss';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Posts />} />
            </Routes>
        </BrowserRouter>
    );
}