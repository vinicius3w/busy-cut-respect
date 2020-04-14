// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
var bodyParser = require("body-parser");
const app = express();

var cors = require('cors');
app.use(cors({optionSucessStatus: 200}));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/api/timestamp/:date_string?", (req, res) => { 
  const dateString = req.params.date_string;
  let date;
  
  if(!dateString){
    date = new Date();
  } else {
    if(!isNaN(dateString)){
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }
  
  if (date.toString() === "Invalid Date") {
    res.json({ error: date.toString() });
  } else {
    res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }
});