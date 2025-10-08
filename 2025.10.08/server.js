const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const server = http.createServer(function (req, res){
    const req_url = req.url;
    if (req_url === '/'){
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('1. main' +
            '2. api' +
            '3. dynamic' +
            '4. static' +
            '5. get_params'
        );
    }
    else if (req_url === '/main'){
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Strona główna');
    }
    else if (req_url === '/api'){
        const data = {
            name: "Ryszard",
            surname: "Pyssa",
            isHorny: "True",
            time: new Date()
        };
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(data));
    }
    else if (req_url === '/dynamic'){
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
    else if (req_url === '/static'){
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
    else if (url.parse(req.url, true).pathname === '/get_params'){
        const parsedUrl = url.parse(req.url, true);
        const params = parsedUrl.query;
        const timestamp = Date.now();
        const filename = `params_${timestamp}.json`;

        fs.writeFile(filename, JSON.stringify(params, null, 2), err => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end(JSON.stringify({error: "Błąd zapisu pliku"}));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                res.end(JSON.stringify({ok:"ok"}));
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

