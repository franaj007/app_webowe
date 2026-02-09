import React from 'react';
import { categories } from '../data';
import '../styles/Categories.scss';

const Categories: React.FC = () => {
    return (
        <div className="categories-page">
            <h1>Kategorie</h1>
            <div className="category-grid">
                {categories.map(cat => (
                    <div key={cat.id} className="category-item">
                        <h3>{cat.name}</h3>
                        <p>Przeglądaj wpisy z sekcji {cat.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;