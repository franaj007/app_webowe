// REST API
// GET  /resource -> (200) lista resource
// GET  /resource:id -> (200) obiekt resource
// POST /resource -> (201) utworzony obiekt
// PUT /resource/:id -> (200) nowy stan obiektu (podajemy caly obiekt)
// PATCH resource/:id -> (200) nowy stan obiektu (podajemy tylko to co zmieniamy)
// DELETE /resource/:id -> (204) nowy stan obiektu

require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routery
app.use('/api/kategorie', require('./routes/kategorie.routes'));
app.use('/api/wpisy', require('./routes/wpisy.routes'));
app.use('/api/komentarze', require('./routes/komentarze.routes'));

// Prosty endpoint główny
app.get('/', (req, res) => {
    res.json({ message: 'Blog REST API działa!' });
});

// Obsługa błędów 404
app.use((req, res) => {
    res.status(404).json({ error: 'Nie znaleziono zasobu' });
});

app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
});