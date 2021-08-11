const axios = require('axios');
var express = require('express')
var app = express();


const sendGetRequest = async () =>{

const resp = await axios.get('http://3.1.189.234:8091/data/ttntest')
  .then(res => {

    var Alldata = res.data
    //var Allrow  = Object.keys(data).length;
    //console.log("All row :", Allrow)

    //Max,Min
    var Max =  Math.max.apply(Math, Alldata.map(function(x) { return x.data }))
    console.log("Max value:", Max)
    var min =  Math.min.apply(Math, Alldata.map(function(x) { return x.data }))
    console.log("Min value:", min)
    //average
    const sum = Object.values(Alldata).reduce((acc, current) => acc + current.data, 0);
    var average = sum / Object.values(Alldata).length;   
    average = Math.round(average * 100) / 100
    console.log("average value:", average);

    //Extract Data  
    var chunkSize = 200;
    var groups = Alldata.map((e, i) => { 
         return i % chunkSize === 0 ? Alldata.slice(i, i + chunkSize) : null; 
    }).filter(e => { return e });
    //console.log(groups)
    // var ExtractData  = Object.keys(groups).length;
    // console.log("ExtractData row :", ExtractData)
    
    //Predict data
    var Lastrow = Alldata[Alldata.length - 1].data
    //console.log("Last row:", Lastrow);
    var Next1Day = Lastrow + 0.5
    console.log("Next data 1 Day:", Next1Day);
    var Next7Day = Lastrow + 3.5
    console.log("Next data 7 Day:", Next7Day);

    // app.get("/", function(req,res){
    // res.end("Hi")
    // });

    //Api fetch data
    app.get("/test", function(req,res){
    res.json(groups)
    //res.json((groups[0]))
    });

    var server = app.listen(8082, function(){
    var host = server.address().address
    var port = server.address().port
    //console.log("eiei",host,port);
    });

  })
  .catch(error => {
    console.log(error);
  });
}
sendGetRequest();