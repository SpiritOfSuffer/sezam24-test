const express = require('express');
const rp = require('request-promise');
const parseString = require('xml2js').parseString;

const app = express();
const PORT = process.env.PORT || 5000;
const URL = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en.';

const getData = async (url) => {
    return await rp.get(url);
}
const getJson = async (xml) => {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, json) => {
            err ? reject(err) : resolve(json);
        });
    });
}
app.get('/api/v1/news', async (req, res) => {
    let titles = [];
    await getData(URL)
        .then(data => getJson(data))
        .then(result => result.rss.channel[0].item.forEach((item) => titles.push({ title: item.title.toString() })))
        .then(() => res.json(titles))
        .catch(e => console.log(e));
});

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
