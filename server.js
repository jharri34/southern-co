const config = require('./config.json');
const southernCo = require('./southern-co.js')
const express = require('express');
const http = require('http');
const url = require('url');
const SocketServer = require('ws').Server;
const path = require('path');


const PORT = config.PORT|| process.env.PORT ;
const INDEX = path.join(__dirname, config.INDEX);

const app = express();

app.get('/',(req,res) => res.sendFile(INDEX));
app.get('/main.js', (req,res) => res.sendFile(path.join(__dirname, "main.js")));
//include node_modules scripts
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));

const server = http.createServer(app);
const wss = new SocketServer({ server });

wss.on('connection', (ws,req) => {
	console.log('Client connected');
    const location = url.parse(req.url, true);

	ws.on('close', () => console.log('Client disconnected'));
});

server.listen(PORT,()=>{
     console.log('Listening on %d', server.address().port);
})
