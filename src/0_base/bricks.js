const bricks = {
    
    init: false,
    rows: null,
    cols: null,
    padding: null,
    tlX: null,
    tlY: null,
    brX: null,
    brY: null,
    isVisible: null,
    width: null,
    height: null
    
};


function resetBricks (
        {rows = null, cols = null, padding = null, tlX = null, tlY = null,
                brX = null, brY = null} =
        {rows: null, cols: null, padding: null, tlX: null, tlY: null,
                brX: null, brY: null}) {
    
    if ((rows === null) ||
            (cols === null) ||
            (padding === null) ||
            (tlX === null) ||
            (tlY === null) ||
            (brX === null) ||
            (brY === null))
        return null;
    
    bricks.rows = rows;
    bricks.cols = cols;
    bricks.padding = padding;
    bricks.tlX = tlX;
    bricks.tlY = tlY;
    bricks.brX = brX;
    bricks.brY = brY;
    bricks.isVisible = Array (rows * cols).fill (true);
    bricks.width = ((brX - tlX - (padding * (cols - 1)))/cols);
    bricks.height = ((brY - tlY - (padding * (rows - 1)))/rows);
    bricks.init = true;
    return true;
    
}
    
function detectCollision (
        {x = null, y = null, r = null} = {x: null, y: null, r: null}) {
    
    if ((x === null) ||
            (y === null) ||
            (r === null))
        return null;
    
    const {init, tlX, tlY, brX, brY, width, height, padding,
            rows, cols, isVisible} = bricks;
    
    if (init === false) return null;
    
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
        return false;
    
    const ctlX = firstLevel (tlX + width,
            width + padding, ballXMin, true, 0);
    const ctlY = firstLevel (tlY + height,
            height + padding, ballYMin, true, 0);
    const cbrX = firstLevel (brX - width,
            width + padding, ballXMax, false, cols);
    const cbrY = firstLevel (brY - height,
            height + padding, ballYMax, false, rows);
    
    console.log (ctlX, ctlY, cbrX, cbrY);
    
    let iX = 0;
    let iY = 0;
    let i = 0;
    
    while (iY < cbrY - ctlY) {
        
        iX = 0;
        
        while (iX < cbrX - ctlX) {
            
            i = (ctlY + iY) * cols + ctlX + iX;
            
            if (!isVisible [i]) {
                
                iX = iX + 1;
                continue;
                
            }
            
            if (((tlX + width + (ctlX + iX) *
                    (width + padding)) >= ballXMin) &&
                    ((tlY + width + (ctlY + iY) *
                    (width + padding)) >= ballYMin)) {
                
                isVisible [i] = false;
                return true;
                
            }
            
            iX = iX + 1;
            
        }
        
        iY = iY + 1;
        
    }
    
    return false;
    
}


function getBricks () {
    
    const {init, rows, cols, isVisible, tlX, tlY, width, height, padding} =
            bricks;
    
    if (init === false) return null;
    
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


function shuffleBricks () {
    
    const {init, rows, cols} = bricks;
    
    if (init === false) return null;
    
    let {isVisible} = bricks;
    
    const lastRow = isVisible
        .slice (cols * (rows - 1))
        .some (x => x);
    
    if (lastRow) return false;
    
    isVisible = (function () {
        
        return Array (cols)
            .fill (true)
            .concat (isVisible.slice (0, cols * (rows - 1)));
    
    }());
}


function firstLevel (base, inc, max, lower, level) {
    
    if (!lower && level === 0) return 0;
    if ((lower && max <= base) || (!lower && max >= base)) return level;
    if (lower) return firstLevel (base + inc, inc, max, true, level + 1);
    return firstLevel (base - inc, inc, max, false, level - 1);
    
}


function getSnapshot () {
    
    if (bricks.init === false) return null;
    
    const isVisible = Array (bricks.isVisible.length)
        .fill (void 0)
        .map ((_, i) => (bricks.isVisible [i]));
    
    return {
        
        init: bricks.init,
        rows: bricks.rows,
        cols: bricks.cols,
        padding: bricks.padding,
        tlX: bricks.tlX,
        tlY: bricks.tlY,
        brX: bricks.brX,
        brY: bricks.brY,
        isVisible,
        width: bricks.width,
        height: bricks.height
        
    };
}


module.exports = {
    
    resetBricks,
    detectCollision,
    getBricks,
    shuffleBricks,
    
    getInternals: () => ({
        
        getSnapshot,
        firstLevel
        
    })
};

