const browserWidth = window.innerWidth;
const browserHeight = window.innerHeight;
let k = kaboom({
    width: 630,
    height: browserHeight,
    canvas: document.querySelector("canvas"),
    backgroundAudio: true
})


//! --------------------------------- SPRITES -------------------------------- */
loadSprite("platform", "sprites/tiles/platform.png")
loadSprite("slime", "sprites/slime/slime-idle-1.png")
loadSprite("castleWall", "sprites/stringstarfields/castlebg.png")
//  {
//     sliceX: 1,
//     sliceY: 1,
//     anims: {'idle-anim': {from: 0, to: 7, loop: true }}
// });

// loadSprite("move-slime", 'sprites/slime/slime-move-0.png', {
//     sliceX: 1,
//     sliceY: 1,
//     anims: {'move-anim': {from: 0, to: 7, loop: true }}
// });

setGravity(100);
scene("opening", () => {
    
})
scene("game", () => {
    loadSpriteAtlas('sprites/tiles/Tileset.png', {
        "floor": { x: 15, y: 1, width: 50, height: 75 },
        "back": { x: 65, y: 35, width: 50, height: 75 },
        "wallL": { x: 0, y: 25, width: 25, height: 75 },
        "wallC": { x: 55, y: 25, width: 25, height: 75 },
        "wallR": { x: 99, y: 25, width: 35, height: 75 },
    })

    //! ----------------------------------- MAP ---------------------------------- */
    add([
        sprite('castleWall'),
        fixed(),
        pos(1.7, 0),
        scale(1, 1.35)])

    const map = addLevel([
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "234                   234",
        "0000000000000000000000000",
        "0000000000000000000000000",
        "0000000000000000000000000",
    ], {
        tileWidth: 25,
        tileHeight: 25,
        tiles: {
            0: () => [sprite('floor'), area(), body({ isStatic: true })],
            1: () => [sprite('back')],
            2: () => [sprite('wallL'), area(), body({ isStatic: true })],
            3: () => [sprite('wallC'), area(), body({ isStatic: true })],
            4: () => [sprite('wallR'), area(), body({ isStatic: true })]
        }
    })

    // const platGap = 100;
    // const offset = rand(-50, 50)

    //! -------------------------------- CHARACTER ------------------------------- */
    let player = add([
        pos(120, 80),
        scale(2.5),
        sprite("slime"),
        area(),
        body(),
        anchor('center'),
    ]).flipX = true;

    //! -------------------------------- PLATFORMS ------------------------------- */
    let platformX = rand(100, )
    add([
        sprite('platform'),
        fixed(),
        area(),
        pos(110, 400),
        scale(0.24, 0.15),
    ])

    //! -------------------------------- CONTROLS -------------------------------- */
    onKeyPress("space", () => {
        player.jump()
    })

    onClick(() => k.addKaboom(k.mousePos()));
})

go("game")

scene("gameover", () => {
    
})