const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use('/_assets', express.static(__dirname + '/_assets'));
app.get('/', (req, res) => res.sendfile(__dirname + '/index.html'))
app.get('/confirmation.html', (req, res) => res.sendfile(__dirname + '/confirmation.html'))
app.listen(port, () => console.log(`CPB TestTestTestDotCom listening on port ${port}!`))