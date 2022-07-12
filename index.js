// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use((req,res,next) => {
  console.log(req.method + " " + req.path + " - " + req.ip );
  next();
})
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// A request to /api/:date?
app.get('/api/:date', (req, res) => {
  const dateString =  req.params.date;
  let date;
  let unixData;


  //Check if dateString === null, will assign current date
  //Else check if dateString is an integer, if true will convert string to integer
  if(!dateString) {
    date = new Date();
  } else {
    if(!isNaN(dateString)) {
      date = new Date((parseInt(dateString)) * 1);
      unixData = date.valueOf();
    } else {
      date = new Date(dateString)
      unixData = date.getTime();
    }
  }
  
  if(date.toUTCString() === "Invalid Date") {
    res.json({error: date.toUTCString()});
  } else {
    res.json({unix: unixData, utc: date.toUTCString()})
  }
});

app.get('/api/', (req,res) => {
  let date = new Date();
  res.json({ unix: date.valueOf(), utc: date.toUTCString() })
}); 

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
