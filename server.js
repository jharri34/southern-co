const config = require('./config.json');
// const southernCo = new require('./southern-co.js')
const api = require('southern-company-api');
const express = require('express');
const http = require('http');
const url = require('url');
const SocketServer = require('ws').Server;
const path = require('path');


const PORT = config.PORT|| process.env.PORT ;
const INDEX = path.join(__dirname, config.INDEX);
const SouthernCompany =  new api({username:config.username, password:config.password});

const app = express();
//express routing
app.get('/',(req,res) => res.sendFile(INDEX));
app.get('/main.js', (req,res) => res.sendFile(path.join(__dirname, "main.js")));
app.get('/month', (req,res) => SouthernCompany.getMonthlyData()
    .then((data)=> res.send(data)).catch(console.error));

app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
app.use((err,req,res)=>{console.log('Err:'+err)})

const server = http.createServer(app);
const wss = new SocketServer({ server });

//ws event handling
wss.on('connection', (ws,req) => {
	console.log('Client connected');
    const location = url.parse(req.url, true);

	ws.on('close', () => console.log('Client disconnected'));
});
//ws stream
setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);

//server logging
server.listen(PORT,()=>{
     console.log('Listening on %d', server.address().port);
});
//api logging

SouthernCompany.on('connected', ()=>{
  console.info('Logged In...');
  console.info('Accounts:', SouthernCompany.accounts, '\n');
  });
