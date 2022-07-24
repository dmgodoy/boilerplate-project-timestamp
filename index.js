// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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


app.get( '/api/:date', (req, res) => {
  console.log(req.params.date);
  let date = new Date(req.params.date);
  if(/^\d+$/.test(req.params.date))
    date = new Date(new Number(req.params.date));
  const isValidDate = (d) => d instanceof Date && !isNaN(d);
  if(isValidDate(date))
    res.json({unix: date.getTime(), utc: dateToStr(date)});
  else
    res.json({ error : "Invalid Date" });
});

app.get( '/api', (req, res) => {
  const date = new Date(parseInt(Date.now()));
  res.json({unix: date.getTime(), utc: dateToStr(date)});
});

const dateToStr = (date) => {
  const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
  const day = weekdays[date.getDay()];
  const dateDay = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const time = date.toTimeString().replace(/ \(.*?\)/,"").replace("+0000","");
  return `${day}, ${dateDay} ${month} ${year} ${time}`;
}



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
