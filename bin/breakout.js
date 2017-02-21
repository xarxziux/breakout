/* globals window: false */
/* globals $: false */

window.breakout = function (brickRows, brickColumns) {
    
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');
    let bShift = {x: 2, y: -2};
    let score = 0;
    let ball = {
        
        x: canvas.width/2,
        y: canvas.height - 30,
        r: 10
        
    };
    let paddle = {
        
        x: (canvas.width - 10) / 2,
        y: (canvas.height) - 10,
        width: 75,
        height: 10
        
    };
    
    let rightPressed = false;
    let leftPressed = false;
    
    // let brickRows= bRows;
    // let brickColumns = 7;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;
    let maxScore = brickRows * brickColumns;
    
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
    
    setInterval(draw, 10);
    
    function draw () {
        
        ctx.clearRect (0, 0, canvas.width, canvas.height);
        drawBall (ctx, ball);
        drawPaddle (ctx, paddle);
        drawBricks (ctx, bricks);
        drawScore (ctx, score);
        
        if (score === maxScore) {
            
            alert ('You win!');
            document.location.reload();
            
        }
        
        ball.x = ball.x + bShift.x;
        ball.y = ball.y + bShift.y;
        
        if ((ball.x + bShift.x < ball.r) ||
                (ball.x + bShift.x > canvas.width - ball.r))
                bShift.x = -bShift.x;
        
        if (ball.y + bShift.y < ball.r)
                bShift.y = -bShift.y;
        
        if (ball.y + bShift.y > canvas.height - ball.r) {
            
            if ((ball.x > paddle.x) && (ball.x < paddle.x + paddle.width))
                    bShift.y = -bShift.y;
            else {
                
                alert ('Game Over!');
                document.location.reload();
                
            }
        }
        
        if (detectCollision (bricks, ball)) {
            
            score = score + 1;
            bShift.y = -bShift.y;
            
        }
        
        if (rightPressed && paddle.x < canvas.width - paddle.width) {
            paddle.x += 7;
        } else if (leftPressed && paddle.x > 0) {
            paddle.x -= 7;
        }
    }
    
    
    function keyDownHandler(e) {
        if(e.keyCode === 39) {
            rightPressed = true;
        }
        else if(e.keyCode === 37) {
            leftPressed = true;
        }
    }
    
    
    function keyUpHandler(e) {
        if(e.keyCode === 39) {
            rightPressed = false;
        }
        else if(e.keyCode === 37) {
            leftPressed = false;
        }
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

