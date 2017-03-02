const utils = require ('./utils.js');


function move ({x, y, radius, angle}, jump, width) {
    
    const newX = x + Math.cos (angle) * jump;
    const newY = y + Math.sin (angle) * jump;
    const newAngle = getNewAngle (newX, newY, width, angle);
    
    return {
        
        x: newX,
        y: newY,
        radius,
        angle: newAngle
        
    };
    
}


function reset (r, w, h) {
    
    return {
        
        x: utils.getRandomInt (r + 5, w - r - 5),
        y: h - 30,
        r,
        s: (Math.random() * (Math.PI / 2)) + (Math.PI * 1.25)
        
    };
}


function bounce (angle, vert) {
    
    const mult = (!vert) ?
        1 :
        (angle > Math.PI) ?
            1.5 :
            0.5;
    
    return angle - ((angle - (Math.PI * mult)) * 2);
    
}


function getNewAngle (x, y, w, s) {
    
    if (x < 0)
        if ((s > Math.PI/2) && (s < (Math.PI * 3)/2))
            return bounce (s, true);
    
    if (x > w)
        if ((s < Math.PI/2) && (s > (Math.PI * 3)/2))
            return bounce (s, true);
    
    if (y < 0)
        if (s > Math.PI)
            return bounce (s, false);
    
    return s;
    
}


module.exports = {
    
    move,
    reset,
    bounce,
    
    getInternals: () => ({
        
        getNewAngle
        
    })
};

