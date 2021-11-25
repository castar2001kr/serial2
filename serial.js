const {promisify} = require('util')


const SerialPort =require('serialport')
var com = new SerialPort('/dev/ttyUSB0', {
    baudRate: 9600,
    databits: 8,
    parity: 'none'
    ,stopBits:1,
    flowControl:false,
}, false);


const express=require('express');

const app=express();

let isOn=false;

let target=""


app.get('/a',(req,res)=>{target=req.query.target; res.end();})

app.listen(3000);





com.on('open',()=>{console.log('open'); 
setInterval(()=>{
    for(var i=0;i<target.length;i++)
    com.write(new Buffer(target[i],'ascii'),function(err, results) {
        if(err!=null)
        {
          console.log('Error: ' + err);
        }
        else
        console.log('Results ' + results);}
    
    
    
    );

},1000)

})



com.on('data', function(data) {
    console.log(data);
  });