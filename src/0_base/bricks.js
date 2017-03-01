function createBricks (rows, cols, padding, tlX, tlY, brX, brY) {
    
    return {
        
        rows,
        cols,
        padding,
        tlX,
        tlY,
        brX,
        brY,
        isVisible: Array (rows * cols).fill (true),
        width: ((brX - tlX - (padding * (cols -1)))/cols),
        height: ((brY - tlY - (padding * (rows -1)))/rows),
        
        detectCollision: function (ball) {
            
            const ballXMin = ball.x - ball.r;
            const ballXMax = ball.x + ball.r;
            const ballYMin = ball.y - ball.r;
            const ballYMax = ball.y + ball.r;
            
            if ((ballXMax < this.tlX) ||
                    (ballXMin > this.brX) ||
                    (ballYMax < this.tlY) ||
                    (ballYMin > this.brY))
                return false;
            
            const ctlX = firstClearLevel (this.tlX + this.width,
                    this.width + this.padding, ballXMin, 0, true);
            const ctlY = firstClearLevel (this.tlY + this.height,
                    this.height + this.padding, ballYMin, 0, true);
            const cbrX = firstClearLevel (this.brX - this.width,
                    this.width + this.padding, ballXMax, 0, false);
            const cbrY = firstClearLevel (this.brY - this.height,
                    this.height + this.padding, ballYMax, 0, false);
            
            let iX = 0;
            let iY = 0;
            let i = 0;
            
            while (iY < cbrY - ctlY) {
                
                iX = 0;
                
                while (iX < cbrX - ctlX) {
                    
                    i = (ctlY + iY) * this.cols + ctlX + iX;
                    
                    if (!this.isVisible [i]) {
                        
                        iX = iX + 1;
                        continue;
                        
                    }
                    
                    if ((this.tlX + this.width + (ctlX + iX) *
                            (this.width + this.padding)) >= ballXMin) {
                        
                        this.isVisible [i] = false;
                        return true;
                        
                    }
                    
                    iX = iX + 1;
                    
                }
                
                iY = iY + 1;
                
            }
            
            return false;
            
            function firstClearLevel (base, inc, max, accum, lower) {
                
                if ((lower && max <= base) || (!lower && max >= base)) return accum;
                if (lower) 
                    return firstClearLevel (base + inc, inc, max, accum + 1, true);
                return firstClearLevel (base - inc, inc, max, accum + 1, false);
                
            }
        },
        
        update: function () {
            
            const lastRow = this.isVisible
                .slice (this.cols * (this.rows - 1))
                .some (x => x);
            
            if (!lastRow)
                this.isVisible = Array (this.cols)
                    .fill (true)
                    .concat (this.isVisible.slice (
                            0, this.cols * (this.rows - 1)));
            
        },
        
        getBricks: function() {
            
            // let i = 0;
            
            return Array (this.rows * this.cols)
                .fill (void 0)
                .map ((_, i) => {
                    
                    if (!this.isVisible [i]) return void 0;
                    return [];
                    
                })
                .filter (x => !!x);
            
        }
        
    };
}


module.exports = createBricks;


