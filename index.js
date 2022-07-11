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
  let {date} = req.params;
  let utcString = new Date(date).toUTCString(); 
  dateTime = new Date(date)
  // 👇️ timestamp in seconds (Unix timestamp)
  const timestampInSeconds = Math.floor(dateTime.getTime());
  if(date.includes("-")) return  res.send({unix: timestampInSeconds,utc: utcString});
  else{
    console.log("unix: " + date);
    res.send({unix: date , utc: new Date(date * 1).toUTCString()})
  }

})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
