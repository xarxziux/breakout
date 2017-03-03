/* globals onmessage: true */
/* globals postMessage: false */
let i = 0;

self.onmessage =  function (e) {
    
    // console.log ('Message received');
    // console.log ('data = ', e.data);
    
    /*
    postMessage (i);
    i = i + 1;
    */
    
    const bx = e.data.ball.x;
    const px = e.data.paddle.x;
    const pw = e.data.paddle.width;
    const width = e.data.width;
    const step = e.data.step;
    const centre = px + pw/2;
    
    // console.log (bx, centre, step, px);
    
    if ((bx > centre + step) && (px + pw < width))
        postMessage (1);
    else if ((bx < centre - step) && (px > 0))
        postMessage (-1);
    else postMessage (0);
    
};

