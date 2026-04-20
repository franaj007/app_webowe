const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    if (!res.ok) throw new Error('Błąd podczas pobierania postów');
    return res.json();
};

export const fetchPost = async (id: string) => {
    const res = await fetch(`${BASE_URL}/posts/${id}`);
    if (!res.ok) throw new Error('Nie znaleziono posta');
    return res.json();
};

export const fetchUser = async (userId: number) => {
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    if (!res.ok) throw new Error('Błąd podczas pobierania autora');
    return res.json();
};

export const fetchComments = async (postId: string) => {
    const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
    if (!res.ok) throw new Error('Błąd podczas pobierania komentarzy');
    return res.json();
};