const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: false }));

const footer = `
<footer style="text-align:center; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ccc;">
  Franciszek Najdek 4D
</footer>
`;

const menu = `
<nav style="background-color:#eee; padding: 1rem;">
  <a href="/">Strona główna</a> |
  <a href="/o-nas">O nas</a> |
  <a href="/oferta">Oferta</a> |
  <a href="/kontakt">Kontakt</a>
</nav>
`;

function layout(title, content) {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <link rel="stylesheet" href="/static/style.css" />
</head>
<body>
  ${menu}
  <main style="padding: 1rem;">
    ${content}
  </main>
  ${footer}
</body>
</html>`;
}

app.get('/', (req, res) => {
  const content = `
    <h1>RYSZARD PYSSA JUMPSCARE</h1>
    <p>Witamy na naszej stronie głównej. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>Aliquam euismod, lorem nec luctus suscipit, justo nulla blandit eros, at laoreet sapien enim sit amet eros.</p>
  `;
  res.send(layout('Strona główna', content));
});

app.get('/o-nas', (req, res) => {
  const content = `
    <h1>O firmie</h1>
    <p>Jesteśmy firmą działającą w branży IT od wielu lat. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    <p>Nasza misja to dostarczanie najwyższej jakości usług IT.</p>
    <div style="display:flex; gap: 10px; margin-top: 1rem;">
      <img src="/static/photo1.jpg" alt="Zdjęcie 1" style="max-width:200px;"/>
      <img src="/static/photo2.jpg" alt="Zdjęcie 2" style="max-width:200px;"/>
      <img src="/static/photo3.jpg" alt="Zdjęcie 3" style="max-width:200px;"/>
    </div>
  `;
  res.send(layout('O firmie', content));
});

app.get('/oferta', (req, res) => {
  const content = `
    <h1>Oferta</h1>
    <p>Oferujemy szeroki zakres usług IT dopasowanych do potrzeb klienta.</p>
    <p>Zapewniamy profesjonalne wsparcie i doradztwo.</p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <thead>
        <tr>
          <th>Usługa</th>
          <th>Cena (PLN)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Tworzenie stron www</td><td>3000</td></tr>
        <tr><td>Administracja serwerami</td><td>1500</td></tr>
        <tr><td>Wsparcie IT</td><td>1000</td></tr>
      </tbody>
    </table>
  `;
  res.send(layout('Oferta', content));
});

app.get('/kontakt', (req, res) => {
  const content = `
    <h1>Kontakt</h1>
    <form action="/kontakt" method="POST" style="max-width: 400px;">
      <label for="imie">Imię:</label><br/>
      <input type="text" id="imie" name="imie" required /><br/><br/>

      <label for="nazwisko">Nazwisko:</label><br/>
      <input type="text" id="nazwisko" name="nazwisko" required /><br/><br/>

      <label for="email">Email:</label><br/>
      <input type="email" id="email" name="email" required /><br/><br/>

      <label for="wiadomosc">Treść wiadomości:</label><br/>
      <textarea id="wiadomosc" name="wiadomosc" rows="5" required></textarea><br/><br/>

      <button type="submit">Wyślij</button>
    </form>
  `;
  res.send(layout('Kontakt', content));
});

app.post('/kontakt', (req, res) => {
  console.log('Dane z formularza kontaktowego:');
  console.log('Imię:', req.body.imie);
  console.log('Nazwisko:', req.body.nazwisko);
  console.log('Email:', req.body.email);
  console.log('Wiadomość:', req.body.wiadomosc);

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
