const browserWidth = window.innerWidth;
const browserHeight = window.innerHeight;
let k = kaboom({
  width: 630,
  height: browserHeight,
  canvas: document.querySelector("canvas"),
  backgroundAudio: false,
});

//! --------------------------------- SPRITES -------------------------------- */
loadSprite("platform", "sprites/tiles/platform.png");
loadSprite("slime", "sprites/slime/slime-idle-1.png");
loadSprite("castleWall", "sprites/stringstarfields/castlebg.png");
loadSprite('background-0', 'sprites/stringstarfields/background_0.png');
loadSprite('background-1', 'sprites/stringstarfields/background_1.png');
loadSprite('background-2', 'sprites/stringstarfields/background_2.png');
//! -------------------------------- START SCREEN -------------------------------- */
scene("start", () => {
  loadFont("custom-font", "fonts/Extrude-90aK.ttf");
  
  add([
    sprite('background-0'),
    fixed(), 
    scale(5),
])

add([
    sprite('background-0'),
    fixed(),
    pos(1000, 0),
    scale(5),
]).flipX = true

add([
  sprite('background-1'),
  fixed(),
  scale(4.35)
])

add([
  sprite('background-1'),
  fixed(),
  pos(1000, 0),
  scale(4.35),
]).flipX = true

add([
  sprite('background-2'),
  fixed(),
  scale(4.35)
])

add([
  sprite('background-2'),
  fixed(),
  pos(1000, 0),
  scale(4.35),
]).flipX = true

  const startGame = add([
    text("Press Space to Start", {
      font: "custom-font",
      size: 30,
    }),
    pos(width() / 2, height() / 1.5),
    scale(0.75, 0.75),
    anchor("center"),
    area(),
  ]);

  const tutorial = add([
    text("How to Play", {
      font: "custom-font",
      size: 30,
    }),
    pos(width() / 2, height() / 2),
    scale(1),
    anchor("center"),
    area(),
  ]);
  onClick(() => {
    go('instructions')
  });

  const titleText = add([
    text("Send the Slime", {
      font: "custom-font",
      size: 45,
      transform: (idx) => ({
        angle: (-24, 9, time() * 10 + idx),
      }),
    }),
    pos(width() / 2, startGame.pos.y / 3),
    scale(1.5),
    anchor("center"),
    area(),
  ])
  onKeyPress("space", () => {
    go("game");
  });
});

scene('instructions', () => {
  add([
    sprite('background-0'),
    fixed(), 
    scale(5),
])

  add([
    sprite('background-0'),
    fixed(),
    pos(1000, 0),
    scale(5),
]).flipX = true

add([
  sprite('background-1'),
  fixed(),
  scale(4.35)
])

add([
  sprite('background-1'),
  fixed(),
  pos(1000, 0),
  scale(4.35),
]).flipX = true

add([
  sprite('background-2'),
  fixed(),
  scale(4.35)
])

add([
  sprite('background-2'),
  fixed(),
  pos(1000, 0),
  scale(4.35),
]).flipX = true

  const controls = add([
    text('This is how to play!', {
      font: "custom-font",
      size: 40,
    }),
    pos(width() / 2, height() / 2),
    scale(1),
    anchor('center'),
    area(),
  ])

});

//! --------------------------------- TILESET -------------------------------- */
scene("game", () => {
  loadSpriteAtlas("sprites/tiles/Tileset.png", {
    floor: { x: 15, y: 1, width: 50, height: 75 },
    back: { x: 65, y: 35, width: 50, height: 75 },
    wallL: { x: 0, y: 25, width: 25, height: 75 },
    wallC: { x: 55, y: 25, width: 25, height: 75 },
    wallR: { x: 99, y: 25, width: 35, height: 75 },
  });

  //! -------------------------------- PLATFORMS ------------------------------- */
  let platformY = 620;
  let gameSpeed = 100;

  function spawnPlatform() {
    let platformX = rand(90, 360);
    let platformHeight = rand(0.17, 0.25)
    add([
      sprite("platform"),
      fixed(),
      area(),
      pos(platformX, platformY),
      // move(DOWN, gameSpeed),
      scale(platformHeight, 0.15),
      offscreen({ destroy: true }),
    ]);
    platformY -= 100
  }
  // for (let i = 1; i < 8; i++) {
  //   spawnPlatform()
  // }
  loop(0.3, () => {
    spawnPlatform();
  });

  //! ----------------------------------- MAP ---------------------------------- */
  add([sprite("castleWall"), fixed(), pos(1.7, 0), scale(1, 1.35)]);

  const map = addLevel(
    [
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "24                     24",
      "0000000000000000000000000",
      "0000000000000000000000000",
      "0000000000000000000000000",
      "0000000000000000000000000",
    ],
    {
      tileWidth: 25,
      tileHeight: 25,
      tiles: {
        0: () => [sprite("floor"), area(), fixed(), body({ isStatic: true })],
        // 1: () => [sprite("back")],
        2: () => [sprite("wallL"), area(), fixed(), body({ isStatic: true })],
        3: () => [sprite("wallC"), area(), fixed(), body({ isStatic: true })],
        4: () => [sprite("wallR"), area(), fixed(), body({ isStatic: true })],
      },
    }
  );

  // const platGap = 100;
  // const offset = rand(-50, 50)

  //! -------------------------------- CHARACTER ------------------------------- */
  const player = add([
    sprite("slime"),
    pos(265, 680),
    scale(2.5),
    area(),
    body(),
  ]);
  player.flipX = true;

  // player.onUpdate(() => {
  //   campPos(player.pos.x, 0)
  // })

  //! -------------------------------- CONTROLS -------------------------------- */
  let wallTouch = 0;
  let traveled = 150;
  // if (!player.isGrounded()) traveled = 0

  onKeyPress("space", () => {
    setGravity(500);
    if (player.isGrounded() && traveled >= 0) {
      player.jump(300 + Number(traveled));
      traveled = 0
    }
  });

  onKeyPress("up", () => {
    setGravity(500);
    if (player.isGrounded() && traveled >= 0) {
      player.jump(300 + Number(traveled));
      traveled = 0
    }
  });

  onKeyDown("left", () => {
    // loop(1, () => {
    //   if (player.isGrounded()) { 
    //     traveled++
    //   } 
    //   if (traveled > 5) traveled = 5
    // })
    player.move(-200, 0);
    player.flipX = false;
  });

  onKeyDown("right", () => {
    // loop(1, () => {
    //   if (player.isGrounded()) { 
    //     traveled++
    //   } 
    //   if (traveled > 5) traveled = 5
    // })
    player.move(200, 0);
    player.flipX = true;
  });

  // player.onCollideEnd("platform", (player) => {
  //   player.body({ isStatic: true });

  // });

  player.onCollide("wallL", () => {
    traveled = 0
  });

  player.onCollide("wallR", () => {
    traveled = 0
  })

  player.onCollide('floor', () => {
    traveled = 0
  })

  // onClick(() => k.addKaboom(k.mousePos()));
});


//! -------------------------------- GAMEOVER SCREEN -------------------------------- */
// scene("game over", () => {
//   loadFont("custom-font", "fonts/Extrude-90aK.ttf");

//   add([
//     sprite('background-0'),
//     fixed(), 
//     scale(5),
// ])

// add([
//     sprite('background-0'),
//     fixed(),
//     pos(1000, 0),
//     scale(5),
// ]).flipX = true

// add([
//   sprite('background-1'),
//   fixed(),
//   scale(4.35)
// ])

// add([
//   sprite('background-1'),
//   fixed(),
//   pos(1000, 0),
//   scale(4.35),
// ]).flipX = true

// add([
//   sprite('background-2'),
//   fixed(),
//   scale(4.35)
// ])

// add([
//   sprite('background-2'),
//   fixed(),
//   pos(1000, 0),
//   scale(4.35),
// ]).flipX = true

//   const retry = add([
//     text("Press Enter to Try Again", {
//       font: "custom-font",
//       size: 30,
//       transform: (idx) => ({
//         // color: rgb(255, 255, 255),
//         pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
//         scale: wave(1, 1.2, time() * 3 + idx),
//         angle: wave(-24, 9, time() * 3 + idx),
//       }),
//     }),
//     pos(width() / 2, height() / 1.5),
//     scale(0.75, 0.75),
//     anchor("center"),
//     area(),
//   ]);

//   const titleText = add([
//     text("Game Over", {
//       font: "custom-font",
//       size: 45,
//       transform: (idx) => ({
//         // color: rgb(255, 255, 255),
//         pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
//         scale: wave(1, 1.2, time() * 3 + idx),
//         angle: wave(-24, 9, time() * 3 + idx),
//       }),
//     }),
//     pos(width() / 2, retry.pos.y / 2),
//     scale(1.5),
//     anchor("center"),
//     area(),
//   ])
  
//   // const displayScore = add([
//   //   text(`Score: ${score.value}`, {
//   //     transform: (idx) => ({
//   //       // color: rgb(255, 255, 255),
//   //       pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
//   //       scale: wave(1, 1.2, time() * 3 + idx),
//   //       angle: wave(-24, 9, time() * 3 + idx),
//   //     }),
//   //   }),
//   //   pos(width() / 2, retry.pos.y / 1.5),
//   //   scale(1.5),
//   //   anchor("center"),
//   //   area(),
//   // ])
  
//   onKeyPress("enter", () => {
//     go("game");
//   });
// });

//! -------------------------------- INVOKATION -------------------------------- */
go("game");
go('start');
// go('game over');