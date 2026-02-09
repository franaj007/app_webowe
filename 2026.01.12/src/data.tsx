import { Post, Category } from './types/blog';

export const categories: Category[] = [
    { id: 1, name: 'Technologia', slug: 'tech' },
    { id: 2, name: 'Lifestyle', slug: 'lifestyle' },
    { id: 3, name: 'Programowanie', slug: 'dev' },
];

export const posts: Post[] = [
    {
        id: 1,
        title: 'Wstęp do TypeScript w React',
        excerpt: 'Dlaczego warto typować swoje komponenty?',
        content: 'TypeScript to nadzbiór JavaScriptu, który dodaje statyczne typowanie...',
        date: '10 Feb 2026',
        category: 'Programowanie'
    },
    {
        id: 2,
        title: 'Minimalizm w designie',
        excerpt: 'Mniej znaczy więcej – zasady czystego interfejsu.',
        content: 'W projektowaniu UI kluczowe jest zachowanie odpowiedniego "oddechu" (whitespace)...',
        date: '08 Feb 2026',
        category: 'Lifestyle'
    },
    {
        id: 3,
        title: 'React Router v6 - nowości',
        excerpt: 'Jak nawigować bez przeładowania strony.',
        content: 'Wersja 6 wprowadza komponent <Routes> zamiast <Switch> oraz hooki...',
        date: '05 Feb 2026',
        category: 'Technologia'
    }
];