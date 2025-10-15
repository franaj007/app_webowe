const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime-types')
const server = http.createServer(function (req, res){
    const parsedurl = url.parse(req.url, true);
    const pathname = parsedurl.pathname;
    switch(pathname){
        case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(
                '1. main\n' +
                '2. api\n' +
                '3. dynamic\n' +
                '4. static\n' +
                '5. get_params\n' +
                '6. file.example\n'
            );
            break;

        case'/main':
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Strona główna');
            break;

        case '/api':
            const data = {
                name: "Ryszard",
                surname: "Pyssa",
                isHorny: "True",
                time: new Date()
            };
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
            break;
        case '/dynamic':
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
            break;
        case '/static':
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
            break;

        case '/get_params':
            const params = parsedurl.query;
            const timestamp = Date.now();
            const filename = `params_${timestamp}.json`;

            fs.writeFile(filename, JSON.stringify(params), err => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                    res.end(JSON.stringify({error: "Błąd zapisu pliku"}));
                }
                else {
                    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
                    res.end(JSON.stringify({ok:"ok"}));
                }
            })
            break;

        default:
            const filepath = pathname.startsWith('/') ? pathname.slice(1) : pathname;
            const assetPath = path.join(__dirname, './assets', filepath);
            fs.stat(assetPath, (err, stats) => {
                if(!err && stats.isFile()) {
                    const contentType = mime.lookup(filepath);
                    res.writeHead(200, { 'Content-Type': `${contentType}; charset=utf-8` });

                    const readStream = fs.createReadStream(assetPath);
                    readStream.pipe(res);
                }
                else {
                    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
                    const json ={"error": "404 - Nie znaleziono strony"};
                    res.end(JSON.stringify(json, null, 2));
                }
            })
            break;
    }
}).listen(8080, () => {
    console.log(`Server started on port ${server.address().port}!`);
});

