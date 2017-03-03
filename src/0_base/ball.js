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


function reset (radius, weight, height) {
    
    return {
        
        x: utils.getRandomInt (radius + 5, weight - radius - 5),
        y: height - 30,
        radius,
        angle: (Math.random() * (Math.PI / 2)) + (Math.PI * 1.25)
        
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


function getNewAngle (x, y, width, angle) {
    
    if (x < 0)
        if ((angle > Math.PI/2) && (angle < (Math.PI * 3)/2))
            return bounce (angle, true);
    
    if (x > width)
        if ((angle < Math.PI/2) || (angle > (Math.PI * 3)/2))
            return bounce (angle, true);
    
    if (y < 0)
        if (angle > Math.PI)
            return bounce (angle, false);
    
    return angle;
    
}


module.exports = {
    
    move,
    reset,
    bounce,
    
    getInternals: () => ({
        
        getNewAngle
        
    })
};

