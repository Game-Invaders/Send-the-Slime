const browserWidth = window.innerWidth;
const browserHeight = window.innerHeight;
let k = kaboom({
  width: 630,
  height: 770,
  canvas: document.querySelector("canvas"),
  backgroundAudio: false,
});

//! --------------------------------- SPRITES -------------------------------- */
loadSprite("platform", "sprites/tiles/platform.png");
loadSprite("slime", "sprites/slime/slime-idle-1.png");
loadSprite("castleWall", "sprites/stringstarfields/castlebg.png");
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

scene("opening", () => {});
scene("game", () => {
  loadSpriteAtlas("sprites/tiles/Tileset.png", {
    floor: { x: 15, y: 1, width: 50, height: 75 },
    back: { x: 65, y: 35, width: 50, height: 75 },
    wallL: { x: 0, y: 25, width: 25, height: 75 },
    wallC: { x: 55, y: 25, width: 25, height: 75 },
    wallR: { x: 99, y: 25, width: 35, height: 75 },
  });

  //! -------------------------------- PLATFORMS ------------------------------- */
  let platformY = 3;
  let gameSpeed = 20;
  function spawnPlatform() {
    let platformX = rand(90, 360);
    add([
      sprite("platform"),
      fixed(),
      area(),
      pos(platformX, platformY),
      move(DOWN, gameSpeed),
      scale(0.24, 0.15),
      offscreen({ destroy: true }),
    ]);
  }

  loop(6, () => {
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
    ],
    {
      tileWidth: 25,
      tileHeight: 25,
      tiles: {
        0: () => [sprite("floor"), area(), fixed(), body({ isStatic: true })],
        1: () => [sprite("back")],
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
    pos(265, 662),
    scale(2.5),
    area(),
    body(),
  ]);
  player.flipX = true;

  //! -------------------------------- CONTROLS -------------------------------- */
  onKeyPress("space", () => {
    setGravity(500);
    // if (player.grounded()) {
    player.jump(300);
    // }
  });
  onKeyDown("left", () => {
    player.move(-200, 0);
    player.flipX = false;
  });
  onKeyDown("right", () => {
    player.move(200, 0);
    player.flipX = true;
  });
  onCollide("slime", "platform", (obj) => {
    obj.body = { isStatic: true };
  });
  onCollide("slime", "wallL", () => {
    onKeyPress("space", () => {
      player.jump(400);
      player.flipX = false;
    });
  });
  onCollide("slime", "wallR", () => {
    onKeyPress("space", () => {
      player.jump(400);
      player.flipX = true;
    });
  });

  // onClick(() => k.addKaboom(k.mousePos()));
});

scene("gameover", () => {});

go("game");
