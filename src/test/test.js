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
    const b1 = bricks.init (base);
    const b2 = bricks.detectCollision (b1, {x: 48, y: 18, r: 2}).newBrick;
    const b3 = bricks.detectCollision (b2, {x: 48, y: 65, r: 2}).newBrick;
    const b4 = bricks.detectCollision (b3, {x: 92, y: 18, r: 2}).newBrick;
    const b5 = bricks.detectCollision (b4, {x: 92, y: 65, r: 2}).newBrick;
    const b6 = bricks.detectCollision (b5, {x: 92, y: 65, r: 2});
    
    t.plan (21);
    t.equal (typeof bricks, 'object');
    t.equal (typeOf (bricks.init), 'function');
    t.equal (typeOf (bricks.detectCollision), 'function');
    t.equal (typeOf (bricks.shuffle), 'function');
    t.equal (typeOf (bricks.getXYPositions), 'function');
    t.equal (typeOf (bricks.getInternals().firstLevel), 'function');
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
    t.deepEqual (b5.isVisible, [
        false, true, false,
        true, true, true,
        true, true, true,
        false, true, false]);
    t.equal (b6.collision, false);
    t.deepEqual (bricks.getXYPositions (b6.newBrick), [
        [65, 20],
        [50, 32],
        [65, 32],
        [80, 32],
        [50, 44],
        [65, 44],
        [80, 44],
        [65, 56]
    ]);
    t.end();
    
});

