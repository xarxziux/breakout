'use strict';

const test = require ('tape');
const typeOf = require ('type-detect');

test ('bricks.js module', function (t) {
    
    const base = {
        
        rows: 4,
        cols: 3,
        padding: 5,
        tlX: 50,
        tlY: 20,
        brX: 90,
        brY: 63
        
    };
    
    const exWidth = 10;
    const exHeight = 7;
    
    const bricks = require ('../0_base/bricks.js');
    const sbNull = bricks.getInternals().getSnapshot();
    bricks.resetBricks (base);
    const b1 = bricks.getInternals().getSnapshot();
    bricks.detectCollision
    
    t.plan (19);
    t.equal (typeof bricks, 'object',
            'bricks.js module returns an object and...');
    t.equal (typeOf (bricks.detectCollision), 'function');
    t.equal (typeOf (bricks.shuffleBricks), 'function');
    t.equal (typeOf (bricks.getBricks), 'function');
    t.equal (typeOf (bricks.getInternals().firstLevel), 'function');
    t.equal (typeOf (bricks.getInternals().getSnapshot), 'function');
    t.equal (sbNull, null);
    t.equal (typeOf (b1), 'Object');
    t.equal (b1.rows, base.rows);
    t.equal (b1.cols, base.cols);
    t.equal (b1.padding, base.padding);
    t.equal (b1.tlX, base.tlX);
    t.equal (b1.tlY, base.tlY);
    t.equal (b1.brX, base.brX);
    t.equal (b1.brY, base.brY);
    t.equal (typeOf (b1.isVisible), 'Array');
    t.equal (b1.isVisible.length, base.rows * base.cols);
    t.equal (b1.width, exWidth);
    t.equal (b1.height, exHeight);
    t.end();
    
});

