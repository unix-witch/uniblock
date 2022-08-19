const fs = require("fs");
const express = require("express");
const Unblocker = require("unblocker");

let unblocker = new Unblocker({prefix: '/search/'});
let app = express();
app.use(unblocker);
app.use(express.static('views/'));
app.use(express.urlencoded());


app.get('/', function(req, res){ res.sendFile("index.html"); });
app.post('/', function(req, res) {
    let url = req.body.url;
    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    
    // prints date & time in YYYY-MM-DD format
    let cur_date = year + "-" + month + "-" + date;

    fs.appendFile('logs/' + cur_date + '.log', url + '\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    
    res.redirect('/search/' + url);
});


app.listen(8080).on('upgrade', unblocker.onUpgrade);
