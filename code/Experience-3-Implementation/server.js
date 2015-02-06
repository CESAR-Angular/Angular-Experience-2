// set up ========================
var express  = require('express');
var fs       = require('fs'), json;
var app      = express();

// configuration =================

app.configure(function() {
    app.use(express.static(__dirname));
    app.use(express.bodyParser());
});


// routes ======================================================================
// api ---------------------------------------------------------------------
// get all products
app.get('/api/products', function(req, res) {
    res.json(getConfig('data/products.json'));
});

app.get('*', function(req, res) {
    res.sendfile('./index.html');
});

//methods

function readJsonFileSync(filepath, encoding){
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
