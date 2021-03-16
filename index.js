//https://nodejs.taylorliang.repl.co/
const express = require("express");
const unblocker = require("unblocker");
const bodyParser = require("body-parser")


var app = express();

/*
var ip = req.headers['x-forwarded-for'] || 
    req.connection.remoteAddress || 
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
*/

app.use(express.static('static'))
app.use(new unblocker({'prefix':    '/pog/'}));
app.use(new bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
	res.sendFile("static/index.html", {root: __dirname});
});

app.post('/url', function(req, res){
    
    if (req.body.rurl){
        
        url = req.body.rurl;
		key = req.body.key;

		if (key === "pogchamp") { res.sendFile("static/no.html", {root: __dirname}); return; }
		if ((key !== "password") && (key !== "stronk")) { res.sendFile("static/welcome.html", {root: __dirname}); return; } 

        url = url.replace("https://", "").replace("http://", "");
        


        var ip = req.headers['x-forwarded-for'] || 
            req.connection.remoteAddress || 
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        logString = `[${ip}]: ${url}\n`;
        console.log(logString.replace("\n", ""), "w/", key);
        

        if (/^(?:[a-z]+:)?\/\//i.test(url)){
            res.redirect('/pog/https://'+url);
        } else {
            res.redirect('/pog/https://'+url.replace("https://", ""));
        }
    }
})

app.listen(3000, () => console.log('uh oh stinky'));