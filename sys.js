const request=require('request');


 const sleep = (ms) => {
     return new Promise(resolve=>{
         setTimeout(resolve,ms)
     })
 }






let data='a';

function commend(){
    
    return new Promise(
        (res,rej)=>{try{request.get({uri:`http://192.168.0.4:3000/a?target=${data}`},
            async (err,res,body)=>{console.log(`데이터 전송`); await sleep(1000); run()}
    
           
    
        )
    
    
    res(true);}catch(err){rej(false);}}



    )
};

async function run(){try{a= await commend();}catch(err){console.log(err)};};

run();
