var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

var httpServer = http.createServer(app);

// // Static Files
app.use("/app.js", express.static(__dirname + '/client/app.js'));
app.use("/barrios_madrid.js", express.static(__dirname + '/datasets/barrios_madrid.js'));
app.use("/marker_custo.png", express.static(__dirname + '/marker_custo.png'));
// app.use("/spain-provinces.js", express.static(__dirname + '/datasets/spain-provinces.js'));
app.use("/markers.js", express.static(__dirname + '/datasets/markers.js'));
// app.use("/style.css", express.static(__dirname + '/client/style.css'));
// app.use("/jquery.min.js", express.static(__dirname + '/client/bower_components/jquery/dist/jquery.min.js'));
// app.use("/jquery.panzoom.min.js", express.static(__dirname + '/client/bower_components/jquery.panzoom/dist/jquery.panzoom.min.js'));
// app.use("/angular.min.js", express.static(__dirname + '/client/bower_components/angular/angular.min.js'));
// app.use("/bootstrap.min.css", express.static(__dirname + '/client/bower_components/bootstrap/dist/css/bootstrap.min.css'));
// app.use("/socket.io.js", express.static(__dirname + '/node_modules/socket.io-client/socket.io.js'));
//

// Index Files
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/spain-provinces', function(req, res){
  // debugger
  fs.readFile(__dirname + '/datasets/spain-provinces.geojson','utf8', function (err, data) {
    if (err) throw err;
    // console.log(data);
    res.send(data)
  });
});

app.get('/barrios_madrid', function(req, res){
  // debugger
  fs.readFile(__dirname + '/datasets/barrios_madrid.geojson','utf8', function (err, data) {
    if (err) throw err;
    // console.log(data);
    res.send(data)
  });
});

app.get('/markers', function(req, res){
  // debugger
  fs.readFile(__dirname + '/datasets/markers.json','utf8', function (err, data) {
    if (err) throw err;
    // console.log(data);
    res.send(data)
  });
});

// Get JSON with meetup cities from the MEETUP API
app.get('/meetupcities', function(req, res){
//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'api.meetup.com',
  path: '/2/cities?country=ES'
};

callback = function(response) {
  var json = '';

  //another chunk of data has been recieved, so append it to `str`
  response.on('data', function (chunk) {
    json += chunk;
  });

  //the whole response has been recieved, so we just print it out here
  response.on('end', function () {
    // console.log(JSON.parse(str));
    //VALIDATE FIRST JSON
    res.setHeader('Content-Type', 'application/json');
    res.json(JSON.parse(json));

  });
}

http.request(options, callback).end();
});

// Route data to retrieve dataset
app.get('/data', function (req, res) {
  var start = new Date()

  getData(function(error,response){
    var body = '',
    first = true;

    response
    .setEncoding('utf8')
    .on('error', function(err) {
      console.error(err.stack);
    })
    .on('data', function(chunk) {
      body += chunk;
      first = false;
    })
    .on('end', function() {
      res.end();
      console.info("Execution time for processing all the entiere dataset: %ds", end / 1000);
    })
  });
});

// Server listening
httpServer.listen(3000, function () {
  console.log("server running at https://localhost:3000/")
});

// API Request
function getData(callback) {
  return fs.readFile(__dirname + '/barrios_madrid.geojson', function (err, data) {
    if (err) throw err;
    console.log(data);
    callback(null, data);
  });
}
