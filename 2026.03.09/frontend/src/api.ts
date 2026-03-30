const BASE_URL = 'http://localhost:3000/api';

export const fetchPosts = async () => {
    const res = await fetch(`${BASE_URL}/wpisy`);
    if (!res.ok) throw new Error('Błąd podczas pobierania postów');
    return res.json();
};

export const fetchPost = async (id: string) => {
    const res = await fetch(`${BASE_URL}/wpisy/${id}`);
    if (!res.ok) throw new Error('Nie znaleziono posta');
    return res.json();
};

export const fetchComments = async (postId: string) => {
    const res = await fetch(`${BASE_URL}/komentarze?wpisId=${postId}`);
    if (!res.ok) throw new Error('Błąd podczas pobierania komentarzy');
    const json = await res.json();
    return json.data; // backend zwraca { data: [], pagination: {} }
};

export const createComment = async ({ wpisId, tresc }: { wpisId: number, tresc: string }) => {
    const res = await fetch(`${BASE_URL}/komentarze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ wpisId, tresc })
    });
    if (!res.ok) throw new Error('Błąd podczas dodawania komentarza');
    return res.json();
};