/* globals onmessage: true */
/* globals postMessage: false */

onmessage = function (e) {
    
    const bx = e.data.ball.x;
    const {px, pw, pm} = e.data.paddle;
    const step = e.data.step;
    const pc = px + pw/2;
    
    if ((bx > pc + step) && (px + pw < pm))
        postMessage (1);
    else if ((bx < pc - step) && (px > 0))
        postMessage (-1);
    else postMessage (0);
    
};