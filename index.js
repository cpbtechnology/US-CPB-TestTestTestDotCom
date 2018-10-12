const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const util = require('util')



app.use('/_assets', express.static(__dirname + '/_assets'));
//app.get('/', (req, res) => res.sendfile(__dirname + '/index.html'))
app.get('/confirmations.html', (req, res) => res.sendfile(__dirname + '/confirmation.html'))

// set the view engine to ejs
app.set('view engine', 'ejs');


// load in the json file for creating dynamic pages
var fs = require('fs');
var content = JSON.parse(fs.readFileSync("pages.json", 'utf8'));


const entries = Object.entries(content);

for (const [obj, handle] of entries) {
    // dynamic pages 
	app.get("/"+handle.url, function(req, res) {
		    res.render('pages/dynamic', {
		    	pagecontent: handle,
		    });
	});
}

// our index and confirmation pages need some basic
var baseitem = {
    "title": "Testing Platform",
    //"url": "index.html"
  };

	app.get("/", function(req, res) {
		    res.render('pages/index', {
		    	pagecontent: baseitem,
		    });
	});





app.listen(port, () => console.log(`CPB TestTestTestDotCom listening on port ${port}!`))