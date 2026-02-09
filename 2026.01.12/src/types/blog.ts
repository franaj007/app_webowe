export interface Post {
    id: number;
    title: string;
    excerpt: string;
    content?: string; // Opcjonalne, potrzebne na stronie wpisu
    date: string;
    category: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}