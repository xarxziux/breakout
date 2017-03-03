const Worker = require ('workerjs');
const bot = new Worker ('./src/0_base/paddlebot.js');
const width = 200;
const step = 7;
const ball = {
    
    x: 10,
    y: 10,
    radius: 10,
    angle: Math.PI/4
    
};
const paddle = {
    
    x: 30,
    width: 10
    
};

// let o = 6;
let i = 10;

bot.postMessage ({
    
    ball,
    paddle,
    width,
    step
    
});

// o = o - 1;

bot.onmessage = function (x) {
    
    console.log ('Data returned');
    const dir =  x.data;
    
    switch (dir) {
        
        case -1:
        case 0:
        case 1:
            
            paddle.x = paddle.x + (dir * step);
            console.log (paddle);
            break;
            
        default:
            
            console.log ('Unexpected data returned from worker: ', dir);
            
    }
    
    i = i - 1;
    if (i > 1)
        bot.postMessage ({
            
            ball,
            paddle,
            width,
            step
            
        });
};

