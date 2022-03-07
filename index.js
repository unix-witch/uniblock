const unblocker = require("unblocker");
const express = require("express");

let Unblocker = new unblocker({prefix: '/unblock/'});

let app = express();
app.use(Unblocker);
app.use(express.static('views'));
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) { 
    res.sendFile("index.html"); 
});

app.post('/site', function(req, res) {
    if (req.body.url) {
        if (/^(?:[a-z]+:)?\/\//i.test(req.body.url)) res.redirect('/unblock/https://'+req.body.url);
        else res.redirect('/unblock/https://'+req.body.url.replace("https://", ""));

        
    } else 
        res.sendFile("no-url.html");


    console.log(req.body);
});


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
