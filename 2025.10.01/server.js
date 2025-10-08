const http = require('http');
const fs = require('fs');
const path = require('path');
const server = http.createServer(function (req, res){
    const url = req.url;
    if (url === '/'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('1. main' +
            '2. api' +
            '3. dynamic' +
            '4. static');
    }
    else if (url === '/main'){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Strona główna');
    }
    else if (url === '/api'){
        const data = {
            name: "Ryszard",
            surname: "Pyssa",
            isHorny: "True",
            time: new Date()
        };
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    }
    else if (url === '/dynamic'){
        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Witaj</title>
        </head>
        <body>
            <h1>Witaj, świecie!</h1>
        </body>
        </html>
        `;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(html);
    }
    else if (url === '/static'){
        const filePath = path.join(__dirname, './index.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end("Błąd podczas odczytu pliku.");
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        })
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 - Nie znaleziono strony');
    }
}).listen(8080, () => {
    console.log(`Server started on port ${server.address().port}!`);
});

