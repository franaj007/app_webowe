const express = require('express')
const app = express()
const fs = require('fs');
const mime = require('mime');
const path = require('path');
const port = 8080

app.get('/', (req, res) => {
    res.send('/1<br>' +
        '/2<br>' +
        '/3\n<br>' +
        '/4<br>' +
        '/get_parameters<br>')
})
app.get('/1', (req, res) => {
    res.send('Strona główna!')
});
app.get('/2', (req, res) => {
    const response = {
        "name": "Ryszard",
        "isHorny": true
    }
    res.json(JSON.stringify(response))
})
app.get('/3', (req, res) => {
    const response = '<!DOCTYPE html>\n' +
        '<html>\n' +
        '<head>\n' +
        '  <title>Witaj</title>\n' +
        '</head>\n' +
        '<body>\n' +
        '  <h1>Witaj, Świecie!</h1>\n' +
        '</body>\n' +
        '</html>'
    res.setHeader('Content-Type', 'text/html')
    res.send(response)
})
app.get('/4', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})
app.get('/get_params', async (req, res) => {
    const allParams = req.query;
    const timestamp = new Date().getTime();
    await fs.writeFile(path.join(__dirname, `./params_${timestamp}.json`), JSON.stringify(allParams), (err) => {
        if (err) throw err;

    })
    const responseJSON =
        res.json({"ok": "ok"})
})
app.use(async (req, res) => {

    const filePath = path.join(__dirname, '/assets/', req.path);
    fs.stat(filePath, (err, stats) => {
        if (!err && stats.isFile()) {
            const mimeType = mime.lookup(filePath) || "application/octet-stream";
            res.status(200);
            res.setHeader('Content-Type', mimeType);
            fs.createReadStream(filePath).pipe(res);
        }    else {
            res.status(404).json({"error": "No such file"});
        }
    })

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});