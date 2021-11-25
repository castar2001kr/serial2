
const {spawn,exec} = require('child_process');
const { stdout } = require('process');
const {request} = require(`request`);

const a1 = spawn('a.exe');

let a2=spawn('python', ['msgqueue.py']); //오류방지
let number=9;

a1.stdout.on('data', (data1) => {

try{
    a2.stdin.end(data1); //데이터 넣고 이벤트 a2의 stdout이 나오게 함.
   
    setTimeout(()=>{      //이벤트 발생까지의 term을 기다림
    a2 = spawn('python', ['msgqueue.py'])

    a2.stdout.on('data', (data) => {
        console.log(`${data}`);
        request.get(`http://192.168.0.4:3000?target=${data}`,(err,res,body)=>{console.log(`데이터 전송`);})


    });

    a2.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    a2.on('exit', (code) => {
        console.log(`Child2 exited with code ${code}`);
    });
},1000) // a1에서 a2까지 이벤트 발생 term=1000ms


}catch(err){console.log(`이상`)}
});

a1.stderr.on('data', (data) => {
    console.error(data.toString());

});

a1.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
});


setInterval(() => { a1.stdin.write((number++).toString()+'\n') }, 3000) //a1.stdin.end를 쓰면 이벤트가 계속호출됨. 파이썬이 readline이므로 \n 이 필요.



