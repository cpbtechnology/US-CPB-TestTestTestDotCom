const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const util = require('util')

app.use('/_assets', express.static(__dirname + '/_assets'));
app.use('/visualquiz', express.static(__dirname + '/visualquiz'));

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
		    	pagecontent: handle
		    });
	});
}

// our index and confirmation pages need some basic info passed through because the partials use them

app.get("/", function(req, res) {
	var cc = {
		"title": "Testing Platform"
	}
	res.render('pages/index', {
    	pagecontent: cc
    });
});


app.listen(port, () => console.log(`CPB TestTestTestDotCom listening on port ${port}!`))