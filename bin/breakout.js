/* globals window: false */
/* globals $: false */

window.breakout = function (brickRows, brickColumns, botState) {
    
    const output = document.getElementById ('output');
    const canvas = document.getElementById ('mainCanvas');
    const ctx = canvas.getContext('2d');
    const jump = 2;
    
    console.log ('botState = ', botState);
    
    let score = 0;
    
    const ball = {x: 0, y: 0, r: 0, s: 0};
    
    ball.move = function() {
        
        console.log ('before move:- x: ', this.x, ', y: ', this.y, ', r: ', this.r, ', s: ', this.s);
        this.x = this.x + (Math.cos (this.s) * jump);
        this.y = this.y + (Math.sin (this.s) * jump);
        console.log ('after move:- x: ', this.x, ', y: ', this.y, ', r: ', this.r, ', s: ', this.s);
        
    };
    
    ball.reset = function() {
        
        this.x = (getRandomInt (20, canvas.width - 19)),
        this.y = canvas.height - 30;
        this.r = 10;
        this.s = (Math.random() * (Math.PI / 2)) + (Math.PI * 1.25);
        console.log ('reset:- x: ', this.x, ', y: ', this.y, ', r: ', this.r, ', s: ', this.s);
        
    };
    
    ball.hBounce = function() {
        
        this.s = this.s - ((this.s - Math.PI) * 2)
        console.log ('hBounce:- x: ', this.x, ', y: ', this.y, ', r: ', this.r, ', s: ', this.s);
        
    };
    
    ball.vBounce = function() {
        
        this.s =  (this.s > Math.PI) ?
            this.s - ((this.s - (Math.PI * 1.5)) * 2) :
            this.s - ((this.s - (Math.PI * 0.5)) * 2);
        console.log ('vBounce:- x: ', this.x, ', y: ', this.y, ', r: ', this.r, ', s: ', this.s);
        
    };
    
    ball.reset();
    console.log (JSON.stringify (ball));
    const paddle = {
        
        x: (canvas.width - 10) / 2,
        y: (canvas.height) - 10,
        width: 75,
        height: 10
        
    };
    
    let rightPressed = false;
    let leftPressed = false;
    
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    // let maxScore = brickRows * brickColumns;
    
    let brickWidth = ((canvas.width - (brickOffsetLeft * 2)) / brickColumns) -
            brickPadding;
    let brickHeight = 20;
    
    let bricks = Array (brickColumns * brickRows)
        .fill (void 0)
        .map ((b, i) => ({
            
            x: brickOffsetLeft + (brickWidth + brickPadding) *
                (i % brickColumns),
            y: brickOffsetTop + (brickHeight + brickPadding) *
                    (Math.floor (i / brickColumns)),
            width: brickWidth,
            height: brickHeight,
            visible: true
            
        }));
    
    // console.log (JSON.stringify (bricks));
    
    document.addEventListener ('keydown', keyDownHandler, false);
    document.addEventListener ('keyup', keyUpHandler, false);
    document.addEventListener ('mousemove', mouseMoveHandler, false);
    
    draw();
    
    output.innerHTML = 'Canvas width = ', canvas.width,
            ', canvas height = ', canvas.height;
    
    function draw () {
        
        requestAnimationFrame (draw);
        
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        score = score + 1;
        drawBall (ctx, ball);
        drawPaddle (ctx, paddle);
        drawBricks (ctx, bricks);
        drawScore (ctx, score);
        
        /* if (score === maxScore) {
            
            alert ('You win!');
            document.location.reload();
            
        } */
        
        ball.move();
        
        if ((ball.x < ball.r) || (ball.x > canvas.width))
            ball.vBounce();
        
        if (ball.y < ball.r)
            ball.hBounce();
        
        if (ball.y > canvas.height - ball.r) {
            
            if ((ball.x > paddle.x) && (ball.x < paddle.x + paddle.width))
                ball.hBounce();
            else ball.reset();
            
        }
        
        if (detectCollision (bricks, ball)) {
            
            score = score + 1;
            ball.hBounce();
            
        }
        
        if (rightPressed && paddle.x < canvas.width - paddle.width)
            paddle.x += 7;
        else if (leftPressed && paddle.x > 0)
            paddle.x -= 7;
        
    }
    
    
    function keyDownHandler(e) {
        if(e.keyCode === 39)
            rightPressed = true;
        else if(e.keyCode === 37)
            leftPressed = true;
        
    }
    
    
    function keyUpHandler(e) {
        if(e.keyCode === 39)
            rightPressed = false;
        else if(e.keyCode === 37)
            leftPressed = false;
        
    }
    
    
    function mouseMoveHandler (e) {
        
        let relativeX = e.clientX - canvas.offsetLeft;
        
        if (relativeX > 0 && relativeX < canvas.width)
            paddle.x = relativeX - paddle.width / 2;
        
    }
};


function drawBall (ctx, ball) {
    
    // console.log (ball);
    
    ctx.beginPath();
    ctx.arc (ball.x, ball.y, ball.r, 0, Math.PI*2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    
}


function drawPaddle (ctx, p) {
    
    ctx.beginPath();
    ctx.rect (p.x, p.y, p.width, p.height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
    
}


function drawBricks (ctx, bricks) {
    
    bricks.forEach (b => {
        
        if (!b.visible) return;
        
        ctx.beginPath();
        ctx.rect (b.x, b.y, b.width, b.height);
        ctx.fillStyle = '#0095DD';
        ctx.fill();
        ctx.closePath();
        
    });
}


function detectCollision (bricks, ball) {
    
    return bricks.some (b => {
        
        if (!b.visible) return false;
        if (b.x > ball.x + ball.r) return false;
        if (b.x + b.width < ball.x - ball.r) return false;
        if (b.y > ball.y + ball.r) return false;
        if (b.y + b.height < ball.y - ball.r) return false;
        
        b.visible = false;
        return true;
        
    });
}


function drawScore (ctx, score) {
    
    ctx.font = '16px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + score, 8, 20);
    
}


function getRandomInt (min, max) {
    
    min = Math.ceil (min);
    max = Math.floor (max);
    return Math.floor (Math.random() * (max - min)) + min;
    
}

