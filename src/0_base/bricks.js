function init (
        {rows = null,cols = null, padding = null, tlX = null, tlY = null,
                brX = null, brY = null} =
        {rows: null, cols: null, padding: null, tlX: null, tlY: null,
                brX: null, brY: null},
        isVisible = null) {
    
    if ((rows === null) ||
            (cols === null) ||
            (padding === null) ||
            (tlX === null) ||
            (tlY === null) ||
            (brX === null) ||
            (brY === null))
        return null;
    
    const base = {
        
        rows,
        cols,
        padding,
        tlX,
        tlY,
        brX,
        brY,
        width: ((brX - tlX - (padding * (cols - 1)))/cols),
        height: ((brY - tlY - (padding * (rows - 1)))/rows)
        
    };
    
    Object.freeze (base);
    const bricks = Object.create (base);
    bricks.isVisible = (isVisible !== null) ?
        isVisible :
        Array (rows * cols).fill (true);
    return bricks;
    
}


function reset (base, isVisible) {
    
    const newBricks = Object.create (base);
    newBricks.isVisible = isVisible;
    return newBricks;
    
}


function detectCollision (brick,
        {x = null, y = null, r = null} = {x: null, y: null, r: null}) {
    
    const {rows, cols, padding, tlX, tlY, brX, brY, isVisible, width,
            height} = brick;
    
    if ((rows === null) ||
            (cols === null) ||
            (padding === null) ||
            (tlX === null) ||
            (tlY === null) ||
            (brX === null) ||
            (brY === null) ||
            (isVisible === null) ||
            (width === null) ||
            (height === null) ||
            (x === null) ||
            (y === null) ||
            (r === null))
        return null;
    
    const ballXMin = x - r;
    const ballXMax = x + r;
    const ballYMin = y - r;
    const ballYMax = y + r;
    
    console.log (tlX, brX, tlY, brY);
    console.log (ballXMin, ballXMax, ballYMin, ballYMax);
    console.log (ballXMax < tlX, ballXMin > brX,
            ballYMax < tlY, ballYMin > brY);
    
    if ((ballXMax < tlX) ||
            (ballXMin > brX) ||
            (ballYMax < tlY) ||
            (ballYMin > brY))
        return {newBrick: brick, collision: false};
    
    const ctlX = firstLevel (tlX + width,
            width + padding, ballXMin, true, 0);
    const ctlY = firstLevel (tlY + height,
            height + padding, ballYMin, true, 0);
    const cbrX = firstLevel (brX - width,
            width + padding, ballXMax, false, cols);
    const cbrY = firstLevel (brY - height,
            height + padding, ballYMax, false, rows);
    
    console.log (ctlX, ctlY, cbrX, cbrY);
    
    const newVis = isVisible.slice ();
    
    let iX = 0;
    let iY = 0;
    let i = 0;
    
    while (iY < cbrY - ctlY) {
        
        iX = 0;
        
        while (iX < cbrX - ctlX) {
            
            i = (ctlY + iY) * cols + ctlX + iX;
            
            if (!newVis [i]) {
                
                iX = iX + 1;
                continue;
                
            }
            
            if (((tlX + width + (ctlX + iX) *
                    (width + padding)) >= ballXMin) &&
                    ((tlY + width + (ctlY + iY) *
                    (width + padding)) >= ballYMin)) {
                
                newVis [i] = false;
                return {newBrick: reset (Object.getPrototypeOf (brick),
                        newVis), collision: true};
                
            }
            
            iX = iX + 1;
            
        }
        
        iY = iY + 1;
        
    }
    
    return {newBrick: brick, collision: false};
    
}


function getXYPositions (
        {rows = null, cols = null, padding = null, tlX = null, tlY = null,
                isVisible = null, width = null, height = null} =
        {rows: null, cols: null, padding: null, tlX: null, tlY: null,
                isVisible: null, width: null, height: null}) {
    
    if ((rows === null) ||
            (cols === null) ||
            (padding === null) ||
            (tlX === null) ||
            (tlY === null) ||
            (isVisible === null) ||
            (width === null) ||
            (height === null))
        return null;
    
    return Array (rows * cols)
        .fill (void 0)
        .map ((_, i) => {
            
            if (!isVisible [i]) return void 0;
            
            return [
                    tlX + (width + padding) * (i % cols), 
                    tlY + (height + padding) * (Math.floor (i/cols))
            ];
        })
        .filter (x => !!x);
        
}


function shuffle (bricks) {
    
    const {rows, cols, isVisible} = bricks;

    if ((rows === null) ||
            (cols === null) ||
            (isVisible === null))
        return null;
    
    const lastRow = isVisible
        .slice (cols * (rows - 1))
        .some (x => x);
    
    if (lastRow) return isVisible;
    
    return reset (
        
        Object.getPrototypeOf (bricks),
        Array (cols)
            .fill (true)
            .concat (isVisible.slice (0, cols * (rows - 1)))
            
    );
}


function firstLevel (base, inc, max, lower, level) {
    
    if (!lower && level === 0) return 0;
    if ((lower && max <= base) || (!lower && max >= base)) return level;
    if (lower) return firstLevel (base + inc, inc, max, true, level + 1);
    return firstLevel (base - inc, inc, max, false, level - 1);
    
}


module.exports = {
    
    init,
    reset,
    detectCollision,
    getXYPositions,
    shuffle,
    
    getInternals: () => ({
        
        firstLevel
        
    })
};

