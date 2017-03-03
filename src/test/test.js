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
    const b7 = bricks.detectCollision (b6.newBrick, {x: 70, y: 60, r: 2})
            .newBrick;
    const b8 = bricks.shuffle (b7);
    
    t.plan (29);
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
    t.equal (b5.width, exWidth);
    t.equal (b5.brY, base.brY);
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
    t.equal (b7.isVisible.length, base.rows * base.cols);
    t.deepEqual (b7.isVisible.slice (-3), [false, false, false]);
    t.equal (b8.isVisible.length, base.rows * base.cols);
    t.deepEqual (b8.isVisible.slice (-3), [true, true, true]);
    t.equal (b8.height, exHeight);
    t.equal (b8.tlX, base.tlX);
    t.end();
    
});

test ('ball.js module', function (t) {
    
    const base = {
        
        x: 50,
        y: 50,
        radius: 100,
        angle: Math.PI * 1 / 16
        
    };
    
    const ball = require ('../0_base/ball.js');
    const gna = ball.getInternals().getNewAngle;
    const b1 = ball.move (base, 100, 200);
    const b2 = ball.reset (b1.radius, 200, 300);
    
    t.plan (23);
    t.equal (typeOf (ball), 'Object');
    t.equal (typeOf (ball.move), 'function');
    t.equal (typeOf (ball.reset), 'function');
    t.equal (typeOf (ball.bounce), 'function');
    t.equal (typeOf (ball.getInternals().getNewAngle), 'function');
    t.equal (Math.round (b1.x), 148);
    t.equal (Math.round (b1.y), 70);
    t.equal (b1.radius, b2.radius);
    t.equal (b2.y, 270);
    t.equal (b2.angle >= Math.PI * 5/4, true);
    t.equal (b2.angle <= Math.PI * 7/4, true);
    t.equal ((b2.x >= 5) && (b2.x <= 195), true);
    t.equal (ball.bounce (Math.PI, true), 0);
    t.equal ((16 * ball.bounce (Math.PI * 9/16, true))/Math.PI, 7);
    t.equal ((16 * ball.bounce (Math.PI * 9/16, false))/Math.PI, 23);
    t.equal (Math.round (8 * gna (-10,  30, 100, Math.PI *  1 / 8) / Math.PI), 1);
    t.equal (Math.round (8 * gna (-10,  30, 100, Math.PI *  5 / 8) / Math.PI), 3);
    t.equal (Math.round (8 * gna ( 30,  30, 100, Math.PI *  1 / 8) / Math.PI), 1);
    t.equal (Math.round (8 * gna ( 10, -30, 100, Math.PI *  1 / 8) / Math.PI), 1);
    t.equal (Math.round (8 * gna ( 10, -30, 100, Math.PI *  9 / 8) / Math.PI), 7);
    t.equal (Math.round (8 * gna ( 10, -30, 100, Math.PI * 11 / 8) / Math.PI), 5);
    t.equal (Math.round (8 * gna ( 120, 30, 100, Math.PI *  1 / 8) / Math.PI), 7);
    t.equal (Math.round (8 * gna ( 120, 30, 100, Math.PI *  9 / 8) / Math.PI), 9);
    t.end();
    
});

