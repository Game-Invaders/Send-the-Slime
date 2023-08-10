const browserWidth = window.innerWidth;
const browserHeight = window.innerHeight;
kaboom({
  width: browserWidth / 2.264,
  height: browserHeight,
  canvas: document.querySelector("canvas"),
  backgroundAudio: false,
});
let score = 0;
//! --------------------------------- SPRITES -------------------------------- */

loadFont("custom-font", "fonts/Extrude-90aK.ttf");
loadFont("custom-font2", "fonts/Exwayer-X3eqa.ttf");
loadFont("custom-font3", "fonts/LcdPhone-wgZ2.ttf");
loadSprite("slime", "sprites/slime/slime-idle-1.png");


loadSprite("castleWall", "sprites/stringstarfields/castlebg.png");
loadSprite("background-0", "sprites/stringstarfields/background_0.png");
loadSprite("background-1", "sprites/stringstarfields/background_1.png");
loadSprite("background-2", "sprites/stringstarfields/background_2.png");

// add([sprite("background-0"), fixed(), scale(5)]);

// add([sprite("background-0"), fixed(), pos(1000, 0), scale(5)]).flipX = true;

// add([sprite("background-1"), fixed(), scale(4.35)]);
// //! -------------------------------- START SCREEN -------------------------------- */
scene("start", () => {
  loadFont("custom-font", "fonts/Extrude-90aK.ttf");

  add([sprite("background-0"), fixed(), scale(5)]);

  add([sprite("background-0"), fixed(), pos(1000, 0), scale(5)]).flipX = true;

  add([sprite("background-1"), fixed(), scale(4.35)]);

  add([
    sprite("background-1"),
    fixed(),
    pos(1000, 0),
    scale(4.35),
  ]).flipX = true;

  add([sprite("background-2"), fixed(), scale(4.35)]);

  add([
    sprite("background-2"),
    fixed(),
    pos(1000, 0),
    scale(4.35),
  ]).flipX = true;

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
      size: 40,
    }),
    pos(width() / 2, height() / 2),
    scale(1),
    anchor("center"),
    area(),
  ]);
  onClick(() => {
    go("instructions");
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
  ]);
  onKeyPress("space", () => {
    go("game");
  });
});

scene("instructions", () => {
  add([sprite("background-0"), fixed(), scale(5)]);

  add([sprite("background-0"), fixed(), pos(1000, 0), scale(5)]).flipX = true;

  add([sprite("background-1"), fixed(), scale(4.35)]);

  add([
    sprite("background-1"),
    fixed(),
    pos(1000, 0),
    scale(4.35),
  ]).flipX = true;

  add([sprite("background-2"), fixed(), scale(4.35)]);

  add([
    sprite("background-2"),
    fixed(),
    pos(1000, 0),
    scale(4.35),
  ]).flipX = true;

  add([
    text("This is how to play!", {
      font: "custom-font",
      size: 45,
    }),
    pos(width() / 2, height() / 5),
    scale(1),
    anchor("center"),
    area(),
  ]);

  add([
    text("Controls", {
      font: "custom-font",
      size: 40,
    }),
    pos(width() / 2, height() / 3),
    scale(1),
    anchor("center"),
    area(),
  ]);

  add([
    text("Space or \u2191 key: Jump!", {
      font: "custom-font",
      size: 40,
    }),
    pos(width() / 2, height() / 2),
    scale(1),
    anchor("center"),
    area(),
  ]);

  add([
    text("\u2192 key: Move Right", {
      font: "custom-font",
      size: 40,
    }),
    pos(width() / 2, height() / 1.8),
    scale(1),
    anchor("center"),
    area(),
  ]);

  add([
    text("\u2190 key: Move Left", {
      font: "custom-font",
      size: 40,
    }),
    pos(width() / 2, height() / 1.6),
    scale(1),
    anchor("center"),
    area(),
  ]);

  const back = add([
    text("Click to Return to Start", {
      font: "custom-font",
      size: 30,
    }),
    pos(width() / 2, height() / 1.28),
    scale(1),
    anchor("center"),
    area(),
  ]);
  onClick(() => {
    go("start");
  });
  const tutorialStart = add([
    text("Press Space to Start", {
      font: "custom-font",
      size: 30,
    }),
    pos(width() / 2, height() / 1.2),
    scale(1),
    anchor("center"),
    area(),
  ]);
  onKeyPress("space", () => {
    go("game");
  });
});

//! --------------------------------- TILESET -------------------------------- */
scene("game", () => {
  setGravity(500);
  score = 0;
  let targetScore = randi(60, 2000) *1

  add([sprite("castleWall"), fixed(), pos(1.7, 0), scale(1, 1.35)]);

  loadSpriteAtlas("sprites/tiles/Tileset.png", {
    floor: { x: 15, y: 1, width: 50, height: 75 },
    back: { x: 65, y: 35, width: 50, height: 75 },
    wallL: { x: 0, y: 25, width: 25, height: 75 },
    wallC: { x: 55, y: 25, width: 25, height: 75 },
    wallR: { x: 99, y: 25, width: 35, height: 75 },
  });

  //! -------------------------------- PLATFORMS ------------------------------- */
  loadSprite("platform", "sprites/tiles/platform.png");

  let highestPlatformY = height();
  let platformY = height() - 150;
  let gameSpeed = 100;
  let platform;

  function spawnPlatform() {
    let platformX = rand(90, 360);
    let platformHeight = rand(0.17, 0.25);
    platform = add([
      sprite("platform"),
      area(),
      // fixed(),
      pos(platformX, platformY),
      scale(platformHeight, 0.15),
      { passed: false },
      { scored: false },
      "platform",
    ]);
    platformY -= 100;
    if (platform.pos.y < highestPlatformY) {
      highestPlatformY = platform.pos.y;
    }
  }
  for (let i = 1; i < 200; i++) {
    spawnPlatform();
  }

  //! ----------------------------------- MAP ---------------------------------- */
  // add([sprite("castleWall"), fixed(), pos(1.7, 0), scale(1, 1.35)]);

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
  let targetScoreText = add([
    text("Target: " + targetScore, {
      font: "custom-font3",
      size: 28,
    }),
    pos(125, 670),
    scale(0.72, 0.72),
    anchor("center"),
    area(),
    fixed(),
    color("#f57878"),
  ]);  
  let scoreText = add([
    text("score: " + score, {
      font: "custom-font3",
      size: 28,
    }),
    pos(125, 710),
    scale(0.75, 0.75),
    anchor("center"),
    area(),
    fixed(),
    color("#f57878"),
  ]);
  // const platGap = 100;
  // const offset = rand(-50, 50)

  //! -------------------------------- CHARACTER ------------------------------- */

  const player = add([
    sprite("slime"),
    pos(width() / 2 - 10, 680),
    scale(2.5),
    area(),
    body(),
    fixed(),
    "player",
  ]);
  player.flipX = true;

  //! -------------------------------- CONTROLS -------------------------------- */
  let wallTouch = 0;
  let momentum = 150;
  let jumpForce = 350;

  onUpdate("platform", (platform) => {
    debug.log("slime position: " + player.pos);
    if (platform.passed === false && platform.pos.y >= player.pos.y) {
      platform.passed = true;
      if (platform.scored === false) {
        platform.scored = true;
        score += 10;
        destroy(scoreText);
        scoreText = add([
          text(`score: ${score}`, {
            font: "custom-font3",
            size: 30,
          }),
          pos(125, 710),
          scale(0.75, 0.75),
          anchor("center"),
          area(),
          fixed(),
          color("#f57878"),
        ]);
      }
    }

    if (platform.passed === true) {
      let newPosX = platform.pos.x;
      let newPosY = platform.pos.y;
      let newPlatformHeight = platform.scale.x;
      wait(0.25, () => {
            if (platform.pos.y >= player.pos.y) {
              destroy(platform);
              add([
               sprite("platform"),
              area(),
              body({ isStatic: true }),
              pos(newPosX, newPosY),
              scale(newPlatformHeight, 0.15),
              // fixed(),
              { passed: true },
              { scored: true },
              "newPlatform",
              ]);
            }
      });
    }

    if (score >= targetScore /*|| player.pos.y > height()*/) {
      go("game over", score);
    }

    if (platform.pos.y > player.pos.y + height() / 2) {
      destroy(platform);
      spawnPlatform();
    }
  });

  onUpdate("newPlatform", (platform) => {
    newPosX = platform.pos.x;
    newPosY = platform.pos.y;
    newPlatformHeight = platform.scale.x;
    if (platform.passed === true && platform.pos.y < player.pos.y) {
      destroy(platform);
      let platform = add([
        sprite("platform"),
        area(),
        pos(newPosX, newPosY),
        scale(newPlatformHeight, 0.15),
        { passed: false },
        { scored: true },
        "platform",
      ]);
    }
  });

  onKeyPress("space", () => {
    if (player.isGrounded()) wallTouch = 0;
    setGravity(500);
    if (momentum > 5) momentum = 5;
    if (player.isGrounded()) {
      player.jump(jumpForce + Number(momentum) * 25);
      momentum = 0;
    }
  });
  onKeyRelease("space", () => {
    momentum = 0;
  });

  onKeyPress("up", () => {
    if (player.isGrounded()) wallTouch = 0;
    setGravity(500);
    if (momentum > 5) momentum = 5;
    if (player.isGrounded()) {
      player.jump(jumpForce + Number(momentum) * 25);
      momentum = 0;
    }
    momentum = 0;
  });
  onKeyRelease("up", () => {
    momentum = 0;
  });

  onKeyDown("left", () => {
    if (player.isGrounded()) {
      wait(0.5, () => {
        momentum += 0.4;
      });
    }
    player.move(-200, 0);
    player.flipX = false;
  });
  onKeyRelease("left", () => {
    momentum = 0;
  });

  onKeyDown("right", () => {
    if (player.isGrounded()) {
      wait(0.5, () => {
        momentum += 0.4;
      });
    }
    player.move(200, 0);
    player.flipX = true;
  });
  onKeyRelease("right", () => {
    momentum = 0;
  });

  player.onCollide("wallL", "wallR", () => {
    momentum = 0;
    if (wallTouch === 0) doubleJump(1);
    wallTouch++;
  });

  player.onCollide("floor", () => {
    wallTouch = 0;
  });

  let camY = height() - 300;
  // onUpdate("player", (player) => {
  // //   if(player.pos.y <= height()/2) {
  // //     camPos(width() / 2, player.pos.y);
  // //   }

  //   if (score >= 40 ) {
  //     go("game over", score);
  //   }
  // });

  // onUpdate("player", (player) => {
  //   camPos(getPlayer.pos)
  // if (getPlayer.pos.y > 700) {
  // go('game over')
  // }
  let oldPlayerY = player.pos.y;
  onUpdate("player", (player) => {
    camPos(width() / 2, camY);
    if(player.pos.y > oldPlayerY) {
      camY -= 10;
    }
    
  });

  // camScale(1);
  // })
  // onUpdate(()=> {
  //   camPos(width()/2, camY);
  //   loop(2,() => {
  //     camY++;
  //   })
  // })
});

//! -------------------------------- GAMEOVER SCREEN -------------------------------- */
scene("game over", (score) => {
  loadFont("custom-font", "fonts/Extrude-90aK.ttf");

  add([sprite("background-0"), fixed(), scale(5)]);

  add([sprite("background-0"), fixed(), pos(1000, 0), scale(5)]).flipX = true;

  add([sprite("background-1"), fixed(), scale(4.35)]);

  add([
    sprite("background-1"),
    fixed(),
    pos(1000, 0),
    scale(4.35),
  ]).flipX = true;

  add([sprite("background-2"), fixed(), scale(4.35)]);

  add([
    sprite("background-2"),
    fixed(),
    pos(1000, 0),
    scale(4.35),
  ]).flipX = true;

  const retry = add([
    text("Press Enter to Try Again", {
      font: "custom-font",
      size: 30,
    }),
    pos(width() / 2, height() / 1.5),
    scale(0.75, 0.75),
    anchor("center"),
    area(),
  ]);

  const titleText = add([
    text("Game Over", {
      font: "custom-font",
      size: 45,
      transform: (idx) => ({
        angle: (-24, 9, time() * 10 + idx),
      }),
    }),
    pos(width() / 2, retry.pos.y / 3),
    scale(1.5),
    anchor("center"),
    area(),
  ]);

  const displayScore = add([
    text(`Score: ${score}`, {
      font: "custom-font",
      size: 30,
      transform: (idx) => ({
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-24, 9, time() * 3 + idx),
      }),
    }),
    pos(width() / 2, retry.pos.y / 1.5),
    scale(1.5),
    anchor("center"),
    area(),
  ]);

  onKeyPress("enter", () => {
    go("game");
  });

  const back = add([
    text("Click to Return to Start", {
      font: "custom-font",
      size: 30,
    }),
    pos(width() / 2, height() / 1.28),
    scale(1),
    anchor("center"),
    area(),
  ]);
  onClick(() => {
    go("start");
  });
});

//! -------------------------------- INVOKATION -------------------------------- */

// go("game over");
go("game");
// go('start')
