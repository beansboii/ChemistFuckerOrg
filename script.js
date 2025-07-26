//---
/*
This pen was strongly inspired by the great looking pen by Guillaume Martigny:

https://codepen.io/GMartigny/pen/qBzwjwm
*/
//---

'use strict';

//---

console.clear();

//---

let w = 0;
let h = 0;

let fov = 800;

let animationFrame = null;
let isTouchDevice = false;

const canvas = document.createElement( 'canvas' );
const context = canvas.getContext( '2d', { alpha: false } );

const border = { left: 1, top: 1, right: w, bottom: h };
const borderDistance = 0;
const center = { x: 0, y: 0 };

//---

const pineTreesMax = 155;
const pineTreesTotal = 48;
const pineTreesMaxLayers = 10;
const pineTreeLayerDistance = 15;
const pineTreeMaximumSize = 150;
const pineTreeColors = [

    {
        bottom: { r: 26, g: 28, b: 20 },
        top: { r: 146, g: 147, b: 90 },
    },
    {
        bottom: { r: 23, g: 32, b: 29 },
        top: { r: 142, g: 161, b: 155 },
    },
    {
        bottom: { r: 29, g: 45, b: 35 },
        top: { r: 156, g: 176, b: 117 },
    },
    {
        bottom: { r: 39, g: 38, b: 17 },
        top: { r: 201, g: 179, b: 78 },
    },
    {
        bottom: { r: 27, g: 37, b: 26 },
        top: { r: 162, g: 170, b: 87 },
    },
    {
        bottom: { r: 27, g: 31, b: 8 },
        top: { r: 171, g: 194, b: 53 },
    },
    {
        bottom: { r: 37, g: 38, b: 24 },
        top: { r: 202, g: 194, b: 49 },
    },
    {
        bottom: { r: 32, g: 44, b: 40 },
        top: { r: 170, g: 202, b: 89 },
    },
    {
        bottom: { r: 19, g: 30, b: 0 },
        top: { r: 255, g: 156, b: 0 },
    },
    {
        bottom: { r: 0, g: 30, b: 29 },
        top: { r: 181, g: 224, b: 119 },
    },
    {
        bottom: { r: 25, g: 25, b: 25 },
        top: { r: 255, g: 255, b: 255 },
    },

];

let pineTreeColorIndex = 0;
let pineTreeSourceHolder = [];
let pineTreeHolder = [];

//---

let gridTileSize = 0;
let gridMaxTileSize = 0;
let gridDotsPerRow = 0;
let gridDotsPerColumn = 0;
let gridWidth = 0;
let gridHeight = 0;
let gridStartPositionX = 0;
let gridStartPositionY = 0;
let gridEndPositionX = 0;
let gridEndPositionY = 0;

//---

const pointerDistance = 25;
let pointerInitialPos = { x: 0, y: 0 };
let pointer = { x: 0, y: 0 };
let pointerPos = { x: 0, y: 0 };
let pointerDown = false;
let pointerActive = false;

//---

function init() {

    isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

    //---

    if ( isTouchDevice === true ) {


        canvas.addEventListener( 'touchmove', cursorMoveHandler, false );
        canvas.addEventListener( 'touchend', cursorLeaveHandler, false );
        canvas.addEventListener( 'touchcancel ', cursorLeaveHandler, false );

    } else {

        canvas.addEventListener( 'pointermove', cursorMoveHandler, false );
        canvas.addEventListener( 'pointerdown', cursorDownHandler, false );
        canvas.addEventListener( 'pointerup', cursorUpHandler, false );
        canvas.addEventListener( 'pointerleave', cursorLeaveHandler, false );

    }

    //---

    createPineTrees();

    //---

    document.body.appendChild( canvas );

    window.addEventListener( 'resize', onResize, false );

    restart();

}

function onResize( event ) {

    restart();

}

function restart() {

    const innerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const innerHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //---

    w = innerWidth;
    h = innerHeight;

    //---

    canvas.width = w;
    canvas.height = h;

    //---
	
		// const diagonal = Math.sqrt( w * w + h * h );

    // fov = Math.round( diagonal * 0.5 );
	
		//---

    border.left = borderDistance;
    border.top = borderDistance;
    border.right = w - borderDistance;
    border.bottom = h - borderDistance;

    center.x = w / 2;
    center.y = h / 2;

    pointerPos.x = center.x;
    pointerPos.y = center.y;

    pointer.x = center.x + pointerDistance;
    pointer.y = center.y - pointerDistance;

    pointerInitialPos.x = center.x + pointerDistance;
    pointerInitialPos.y = center.y - pointerDistance;

    //---

    removePineTrees();
    addPineTrees();

    //---

    if ( animationFrame != null ) {

        cancelAnimFrame( animationFrame );

    }

    render();

}

//---

function deletePineTrees() {

    for ( let i = 0, l = pineTreeSourceHolder.length; i < l; i++ ) {

        let pineTree = pineTreeSourceHolder[ i ];

        pineTree.size = null;
        pineTree.radius = null;

        for ( let j = 0, m = pineTree.layers.length; j < m; j++ ) {

            let pineTreeLayer = pineTree.layers[ j ];

            pineTreeLayer = null;

        }

        pineTree.layers = null;
        pineTree = null;

    }

    pineTreeSourceHolder = [];

}

function createPineTrees() {

    for ( let i = 0, l = pineTreesTotal; i < l; i++ ) {

        const pineTreeLayers = Math.ceil( Math.random() * ( pineTreesMaxLayers * 0.5 ) + pineTreesMaxLayers * 0.5 );
        const pineTreeMaxSize = Math.round( Math.random() * ( pineTreeMaximumSize * 0.55 ) + pineTreeMaximumSize * 0.45 );
        const pineTreeMinSize = 4;

        const pineTree = createPineTree( pineTreeLayers, pineTreeMaxSize, pineTreeMinSize, pineTreeColors[ pineTreeColorIndex ], 2, 12 );

        pineTreeSourceHolder.push( pineTree );

    }

}

function createPineTree( layers = 10, maxSize = 300, minSize = 20, colors = { bottom: { r: 26, g: 28, b: 20 }, top: { r: 146, g: 147, b: 90 } }, needleCountFactor = 3, needleLength = 12 ) {

    const pineTree = {};

    pineTree.layers = [];
    pineTree.size = maxSize;
    pineTree.radius = maxSize * 0.5;

    const colorBottom = addColorVariance( colors.bottom, 4 );
    const colorTop = addColorVariance( colors.top, 7 );

    for ( let i = 0, l = layers; i < l; i++ ) {

        const canvasSize = maxSize;
        const canvasCenter = canvasSize * 0.5;
        const branchSize = maxSize - ( i * ( ( maxSize - minSize ) / l ) ) - needleLength * 0.5;
        const radius = branchSize / 2;
        const circumference = 2 * Math.PI * radius;
        const maxBranchCount = Math.floor( circumference / needleLength );
        const minBranchCount = Math.max( maxBranchCount * 0.5, 10 );
        const branchCount = maxBranchCount - Math.round( i * ( ( maxBranchCount - minBranchCount ) / l ) );
        const canvas = document.createElement( 'canvas' );

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        const context = canvas.getContext( '2d' );
        const image = new Image();

        //---

        const t = i / l;

        const cB = colorBottom;
        const cT = colorTop;

        const r = lerp( cB.r, cT.r, t );
        const g = lerp( cB.g, cT.g, t );
        const b = lerp( cB.b, cT.b, t );

        const colorRGB = addColorVariance( { r: r, g : g, b: b }, 2 );

        //---

        const angleStart = Math.PI * 2 * Math.random() + i;

        for ( let j = 0; j < branchCount; j++ ) {

            const angle = ( 2 * Math.PI / branchCount ) * j + angleStart;

            const branchLength = branchSize * 0.5 - Math.random() * ( branchSize * 0.05 );

            createPineTreeBranch( context, canvasCenter, canvasCenter, branchLength, angle, colorRGB, needleCountFactor, needleLength );

        }

        //---

        if ( i < l - 1 ) {

            const gradient = context.createRadialGradient( canvasCenter, canvasCenter, branchSize * 0.015, canvasCenter, canvasCenter, branchSize * 0.35 );

            const opacity = 1 - ( i / l );

            gradient.addColorStop( 0, `rgba(0, 0, 0, ${ opacity })` );
            gradient.addColorStop( 1, '#00000000' );

            context.fillStyle = gradient;
            context.fillRect( 0, 0, canvasSize, canvasSize );

        }

        //---

        image.src = canvas.toDataURL();

        //---
        
        pineTree.layers.push( image );

    }

    return pineTree;

}

function createPineTreeBranch( context, x, y, length, angle, colorRGB, needleCountFactor = 3, needleLength = 12 ) {

    const x2 = x + Math.cos( angle ) * length;
    const y2 = y + Math.sin( angle ) * length;

    colorRGB = addColorVariance( colorRGB, 4 );

    const color = rgbToString( colorRGB.r, colorRGB.g, colorRGB.b );

    context.strokeStyle = color;
    context.lineWidth = 1;

    context.beginPath();
    context.moveTo( x, y );
    context.lineTo( x2, y2 );
    context.stroke();

    //---

    const needleCountFactorRandom = needleCountFactor + Math.random() * 2;
    const needleCount = Math.floor( length / needleCountFactorRandom );

    createPineTreeNeedles( context, x, y, x2, y2, color, needleCount, needleLength );

}

function createPineTreeNeedles( context, x1, y1, x2, y2, color, needleCount = 24, needleLength = 12 ) {
    
    const angle = Math.atan2( y2 - y1, x2 - x1 );
    const lineWidthFactor = Math.random() + 1;

    for ( let i = 0; i < needleCount; i++ ) {

        const t = i / ( needleCount - 1 );
        const x = x1 + ( x2 - x1 ) * t;
        const y = y1 + ( y2 - y1 ) * t;

        const baseNeedleLength = needleLength * ( 1 - t * 0.25 );
        const randomOffset = Math.random() * 2 - 1;
        const length = baseNeedleLength + randomOffset;
        
        const needleAngleRight = angle + Math.PI / 4; // 45° rechts
        const xNeedleRight = x + Math.cos( needleAngleRight ) * length;
        const yNeedleRight = y + Math.sin( needleAngleRight ) * length;

        const needleAngleLeft = angle - Math.PI / 4; // 45° links
        const xNeedleLeft = x + Math.cos( needleAngleLeft ) * length;
        const yNeedleLeft = y + Math.sin( needleAngleLeft ) * length;

        const lineWidth = lineWidthFactor * ( 1 - t * 0.55 );

        context.strokeStyle = color;
        context.lineWidth = lineWidth;

        context.beginPath();
        context.moveTo( x, y );
        context.lineTo( xNeedleRight, yNeedleRight );
        context.stroke();

        context.beginPath();
        context.moveTo( x, y );
        context.lineTo( xNeedleLeft, yNeedleLeft );
        context.stroke();

    }

}

function recreatePineTrees() {

    if ( animationFrame != null ) {

        cancelAnimFrame( animationFrame );

    }

    //---

    removePineTrees();

    //---

    pineTreeColorIndex = pineTreeColorIndex < pineTreeColors.length - 1 ? pineTreeColorIndex + 1 : 0;

    //---

    deletePineTrees();
    createPineTrees();

    //---

    addPineTrees();

    //---

    render();

}

//---

function addPineTrees() {

    gridTileSize = pineTreeMaximumSize;
    gridMaxTileSize = 1;

    gridDotsPerRow = Math.ceil( ( border.right - border.left ) / gridTileSize ) + ( gridMaxTileSize * 2 );
    gridDotsPerColumn = Math.ceil( ( border.bottom - border.top ) / gridTileSize ) + ( gridMaxTileSize * 2 );

    gridWidth = gridDotsPerRow * gridTileSize;
    gridHeight = gridDotsPerColumn * gridTileSize;

    gridStartPositionX = gridWidth * -0.5;
    gridStartPositionY = gridHeight * -0.5;
    gridEndPositionX = gridStartPositionX + gridWidth;
    gridEndPositionY = gridStartPositionY + gridHeight;
    
    const treeCount = 1000;

    for ( let i = 0; i < treeCount; i++ ) {

        const pineTreeSource = pineTreeSourceHolder[ Math.floor( Math.random() * pineTreeSourceHolder.length ) ];

        let newPineTree = null;
        let overlapping = true;
        let attempts = 0;

        do {

            overlapping = false;

            const x = gridStartPositionX + Math.random() * ( gridWidth - 2 * pineTreeSource.radius ) + pineTreeSource.radius;
            const y = gridStartPositionY + Math.random() * ( gridHeight - 2 * pineTreeSource.radius ) + pineTreeSource.radius;

            newPineTree = { x, y, radius: pineTreeSource.radius };

            for ( let j = 0, m = pineTreeHolder.length; j < m; j++ ) {

                const pineTree = pineTreeHolder[ j ];

                const dx = newPineTree.x - pineTree.x;
                const dy = newPineTree.y - pineTree.y;
                //const distance = Math.sqrt( dx * dx + dy * dy );
								const distanceSquared = dx * dx + dy * dy;

								const radiusSum = newPineTree.radius + pineTree.radius;
								const radiusSumSquared = radiusSum * radiusSum;

                // if ( distance < newPineTree.radius + pineTree.radius ) {
								if ( distanceSquared < radiusSumSquared ) {

                    overlapping = true;

                    break;

                }

            }

            attempts++;

            if ( attempts > 1000 ) {

                break;

            }

        } while ( overlapping );

        if ( overlapping === false && pineTreeHolder.length < pineTreesMax ) {
            
            pineTreeHolder.push( addPineTree( newPineTree.x, newPineTree.y, pineTreeSource.size, pineTreeSource.layers ) );

        }

    }

}

function addPineTree( x, y, size, layers ) {

    const pineTree = {};

    pineTree.x = x;
    pineTree.y = y;
    pineTree.z = Math.random() * ( pineTreeLayerDistance * 2 );

    pineTree.size = size;
    pineTree.radius = size * 0.5;
    pineTree.layers = layers;

    pineTree.distance = 0;

    return pineTree;

}

function removePineTrees() {

    for ( let i = 0, l = pineTreeHolder.length; i < l; i++ ) {

        let pineTree = pineTreeHolder[ i ];

        pineTree.x = null;
        pineTree.y = null;
        pineTree.z = null;

        pineTree.size = null;
        pineTree.radius = null;
        pineTree.layers = null;

        pineTree.distance = null;

        pineTree = null;

    }

    pineTreeHolder = [];

}

//---

function lerp( a, b, t ) {

    return a + ( b - a ) * t;

}

function clamp( value, min, max ) {

    return Math.min( Math.max( value, min ), max );

}

function rgbToString( r, g, b ) {

    return `rgb(${ r }, ${ g }, ${ b })`;

}

function calculateDistanceSquared( x1, y1, x2, y2 ) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return dx * dx + dy * dy;

}

function addColorVariance( color, variance ) {

    return {

        r: clamp( color.r + Math.floor( Math.random() * variance * 2 - variance ), 0, 255 ),
        g: clamp( color.g + Math.floor( Math.random() * variance * 2 - variance ), 0, 255 ),
        b: clamp( color.b + Math.floor( Math.random() * variance * 2 - variance ), 0, 255 ),

    };

}

//---

function isTileInsideRectangle( x, y, tileWidth = 0, tileHeight = 0 ) {

    return x > gridStartPositionX + tileWidth && x < gridEndPositionX - tileWidth && y > gridStartPositionY + tileHeight && y < gridEndPositionY - tileHeight;

}

//---

function sortTrees() {

    for ( let i = 0, l = pineTreeHolder.length; i < l; i++ ) {

        const pineTree = pineTreeHolder[ i ];

        pineTree.distance = calculateDistanceSquared( pineTree.x, pineTree.y, 0, 0 );

    }

    pineTreeHolder = pineTreeHolder.sort( ( a, b ) => {

        return ( b.distance - a.distance );

    } );

}

//---

function draw() {

    sortTrees();

    //---

    if ( pointerActive === true ) {

        pointer.x += ( pointerPos.x - pointer.x ) / 2;
        pointer.y += ( pointerPos.y - pointer.y ) / 2;

    } else {

        pointer.x += ( pointerInitialPos.x - pointer.x ) / 100;
        pointer.y += ( pointerInitialPos.y - pointer.y ) / 100;

    }

    //---

    const dx = ( pointer.x - center.x ) * -0.025;
    const dy = ( pointer.y - center.y ) * -0.025;

    //---

    for ( let i = 0, l = pineTreeHolder.length; i < l; i++ ) {

        const pineTree = pineTreeHolder[ i ];

        const pineTreeSize = pineTree.size;
        const pineTreeRadius = pineTree.radius;
        const pineTreeLayers = pineTree.layers;

        //---

        pineTree.x += dx;
        pineTree.y += dy;

        if ( pineTree.x > gridEndPositionX ) {

            pineTree.x -= gridWidth;

        }

        if ( pineTree.x < gridStartPositionX ) {

            pineTree.x += gridWidth;

        }

        if ( pineTree.y > gridEndPositionY ) {

            pineTree.y -= gridHeight;

        }

        if ( pineTree.y < gridStartPositionY ) {

            pineTree.y += gridHeight;

        }
        
        //---

        if ( isTileInsideRectangle( pineTree.x, pineTree.y, pineTreeRadius, pineTreeRadius ) === true ) {

            for ( let j = 0, m = pineTreeLayers.length; j < m; j++ ) {

                const pineTreeLayer = pineTreeLayers[ j ];

                const z = m - j * pineTreeLayerDistance + pineTree.z;

                const scale = fov / ( fov + z );

                const x2d = pineTree.x * scale + center.x;
                const y2d = pineTree.y * scale + center.y;

                // const x = ( x2d - pineTreeRadius ) | 0;
                // const y = ( y2d - pineTreeRadius ) | 0;
                const x = x2d - pineTreeRadius;
                const y = y2d - pineTreeRadius;
                
                context.drawImage( pineTreeLayer, 0, 0, pineTreeSize, pineTreeSize, x, y, pineTreeSize, pineTreeSize );

            }

        }

    }

}

//---

function render( timestamp ) {

    context.clearRect( 0, 0, w, h );

    //---

    draw();

    //---

    animationFrame = requestAnimFrame( render );

}

window.requestAnimFrame = ( () => {

    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.msRequestAnimationFrame;

} )();

window.cancelAnimFrame = ( () => {

    return  window.cancelAnimationFrame       ||
            window.mozCancelAnimationFrame;

} )();

//---

function cursorDownHandler( event ) {

    pointerDown = true;

    if ( event.button === 0 ) {

        recreatePineTrees();

    }

}

function cursorUpHandler( event ) {

    pointerDown = false;

}

function cursorLeaveHandler( event ) {

    pointerPos = { x: pointerInitialPos.x, y: pointerInitialPos.y };
    pointerDown = false;
    pointerActive = false;

}

function cursorMoveHandler( event ) {

    pointerPos = getCursorPosition( canvas, event );
    pointerActive = true;

}

function getCursorPosition( element, event ) {

    const rect = element.getBoundingClientRect();
    const position = { x: 0, y: 0 };

    if ( event.type === 'mousemove' || event.type === 'pointermove' ) {

        position.x = event.pageX - rect.left; //event.clientX
        position.y = event.pageY - rect.top; //event.clientY

    } else if ( event.type === 'touchmove' ) {

        position.x = event.touches[ 0 ].pageX - rect.left;
        position.y = event.touches[ 0 ].pageY - rect.top;

    }

    return position;

}

//---

document.addEventListener( 'DOMContentLoaded', () => {

    init();

} );