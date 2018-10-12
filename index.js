const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const util = require('util')



app.use('/_assets', express.static(__dirname + '/_assets'));

// set the view engine to ejs
app.set('view engine', 'ejs');



// load in the json file for creating dynamic pages
//var fs = require('fs');
//var content = JSON.parse(fs.readFileSync("pages.json", 'utf8'));


var content =
{
  "item1": {
    "title": "Price Per Like",
    "h1": "Book By Price Per Like",
    "h2": "The Best Hotel For Social Pics",
    "desc": "Up your photo game. Now you'll know the price per night AND price per 'like'.",
    "url": "PricePerLike"
  },
  "item2": {
    "title": "Follwers Deserve",
    "h1": "Reward your social followers.",
    "h2": "Take the trip they want to see",
    "desc": "Because we're all doing it for the 'likes'. Especially when it comes to travel. ",
    "url": "TripFollowersDeserve"
  },
  "item3": {
    "title": "Hate-Like",
    "h1": "Your followers hate-like you",
    "h2": "Make them jealous of your trip",
    "desc": "We're a travel company dedicated to helping you make them seethe with envy.",
    "url": "TravelJealousy"
  },
  "item4": {
    "title": "Ego",
    "h1": "Boost Your Ego w/ Social Likes",
    "h2": "Book an 'Ego Trip' with Us!",
    "desc": "This travel company wants you to take an ego trip you can't get anywhere else.",
    "url": "TravelEgoTrip"
  },
  "item5": {
    "title": "Be There Get Rewarded.",
    "h1": "Do obvious travel things",
    "h2": "And get rewaded for it. ",
    "desc": "We're a travel company that celebrates making obvious travel choices!",
    "url": "TravelObvious"
  }
}


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

app.get("/confirmation", function(req, res) {
	res.render('pages/confirmation', {
    	pagecontent: {"title": "Confirmation"}
    });
});





app.listen(port, () => console.log(`CPB TestTestTestDotCom listening on port ${port}!`))