// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding bazy danych...');

    // 1. Kategorie
    const kategorie = await prisma.kategoria.createMany({
        data: [
            { nazwa: 'JavaScript' },
            { nazwa: 'TypeScript' },
            { nazwa: 'Node.js' },
            { nazwa: 'React' },
            { nazwa: 'Bazy danych' },
            { nazwa: 'Inne' },
        ],
        skipDuplicates: true,
    });
    console.log('Kategorie dodane');

    // Pobieramy ID kategorii, żeby potem przypisywać wpisy
    const js = await prisma.kategoria.findUnique({ where: { nazwa: 'JavaScript' } });
    const ts = await prisma.kategoria.findUnique({ where: { nazwa: 'TypeScript' } });
    const node = await prisma.kategoria.findUnique({ where: { nazwa: 'Node.js' } });
    const react = await prisma.kategoria.findUnique({ where: { nazwa: 'React' } });
    const db = await prisma.kategoria.findUnique({ where: { nazwa: 'Bazy danych' } });
    const inne = await prisma.kategoria.findUnique({ where: { nazwa: 'Inne' } });

    // 2. Wpisy (10 przykładowych)
    const wpisy = [
        { tytul: 'Dlaczego Prisma to killer feature Node.js', tresc: 'Prisma zmienia sposób pracy z bazą danych...', kategoriaId: node.id },
        { tytul: '10 trików z async/await, których nie znasz', tresc: 'Po latach używania async/await odkryłem...', kategoriaId: js.id },
        { tytul: 'TypeScript w 2025 – czy jeszcze warto?', tresc: 'Moja opinia po 3 latach pełnego TS w projekcie...', kategoriaId: ts.id },
        { tytul: 'React Server Components – rewolucja czy hype?', tresc: 'Testuję RSC od miesiąca i oto wnioski...', kategoriaId: react.id },
        { tytul: 'Jak przyspieszyć zapytania SQL o 400%', tresc: 'Prosta zmiana indeksów i cuda się dzieją...', kategoriaId: db.id },
        { tytul: 'Express vs Fastify w 2025 – benchmark', tresc: 'Zrobiłem test na 50k req/s i wynik mnie zaskoczył...', kategoriaId: node.id },
        { tytul: 'Zod + React Hook Form = miłość od pierwszego użycia', tresc: 'Koniec z ręcznym walidowaniem formularzy!', kategoriaId: react.id },
        { tytul: 'Moja droga od juniora do seniora w 2 lata', tresc: 'Co naprawdę zrobiło różnicę...', kategoriaId: inne.id },
        { tytul: 'Dlaczego przestałem używać MongoDB', tresc: 'I przeszedłem na relacyjne – nie żałuję', kategoriaId: db.id },
        { tytul: 'Next.js 15 – co nowego i czy warto migrować?', tresc: 'Przetestowałem na produkcji i...', kategoriaId: react.id },
    ];

    for (const wpis of wpisy) {
        const created = await prisma.wpis.create({
            data: wpis,
        });

        // Dodajemy po 2–5 losowych komentarzy do każdego wpisu
        const liczbaKomentarzy = Math.floor(Math.random() * 4) + 2;
        const komentarze = [
            'Świetny wpis! Dzięki za wiedzę',
            'Dokładnie to samo zauważyłem w swoim projekcie',
            'A próbowałeś tego z Drizzle?',
            'Super wyjaśnione, dodałem do zakładek',
            'Dzięki, właśnie tego szukałem!',
            'Masz może repo z kodem?',
            'Nie do końca się zgadzam z punktem 3...',
            'Genialne! Czekam na kolejną część',
        ];

        for (let i = 0; i < liczbaKomentarzy; i++) {
            const losowyKomentarz = komentarze[Math.floor(Math.random() * komentarze.length)];
            await prisma.komentarz.create({
                data: {
                    tresc: losowyKomentarz + (Math.random() > 0.7 ? ' ✌️' : ''),
                    wpisId: created.id,
                },
            });
        }
    }

    console.log('Wpisy i komentarze dodane!');
    console.log('Seed zakończony sukcesem! Teraz możesz testować API');
}

main()
    .catch((e) => {
        console.error('Błąd podczas seedowania:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });