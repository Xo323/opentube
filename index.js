const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));   
})

app.get('/download', (req, res) => {
    const url = req.query.url
    console.log(decodeURIComponent(url))
    ytdl(url)
        .pipe(fs.createWriteStream('${decodeURIComponent(url)}.mp3'))
        .on('finish', () => {
            res.download('${decodeURIComponent(url)}.mp3', function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Downloaded')
                }
            });
        }
    )
})

app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port 3000!');
})