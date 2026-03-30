import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// Importowanie dotenv (optymalna forma dla ES Modules)
import 'dotenv/config';
// Importowanie modułów tras (wymaga 'export default' w plikach tras)
import kategoriaRoutes from './routes/kategorie.routes';
import wpisyRoutes from './routes/wpisy.routes';
import komentarzeRoutes from './routes/komentarze.routes';

// Inicjalizacja aplikacji Express i typowanie
const app: Application = express();
// Przekształcenie portu na numer, jeśli jest dostępny
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Middleware do parsowania JSON
app.use(cors());
app.use(express.json());

// --- Definicje Tras (Routing) ---
app.use('/api/kategorie', kategoriaRoutes);
app.use('/api/wpisy', wpisyRoutes);
app.use('/api/komentarze', komentarzeRoutes);

// Prosty endpoint główny
app.get('/', (req: Request, res: Response): void => {
    res.json({ message: 'Blog REST API działa!' });
});

// Middleware do obsługi błędów 404 (musi być na końcu definicji tras)
app.use((req: Request, res: Response): void => {
    res.status(404).json({ error: 'Nie znaleziono zasobu' });
});

// --- Uruchomienie Serwera ---
app.listen(PORT, () => {
    console.log(`🚀 Serwer działa na http://localhost:${PORT}`);
});