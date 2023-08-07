
const k = kaboom({
    width: window.innerWidth,
    height: window.innerHeight
});

k.loadSprite("slime", "sprites/slime/slime-idle-1.png")
k.loadSprite("background0", "sprites/stringstar fields/background_0.png");
k.loadSprite("background1", "sprites/stringstar fields/background_1.png");
k.loadSprite("background2", "sprites/stringstar fields/background_2.png");

add([
    sprite('background0'),
    fixed(),
    scale(4.5)
]);

add([
    sprite('background0'),
    fixed(),
    pos(1000, 0),
    scale(4.5)
]).flipX = true

add([
    sprite('background1'),
    fixed(),
    scale(4.5)
]);

add([
    sprite('background1'),
    fixed(),
    pos(1000, 0),
    scale(4.5)
]).flipX = true

add([
    sprite('background2'),
    fixed(),
    scale(4.5)
]);

add([
    sprite('background2'),
    fixed(),
    pos(1000, 0),
    scale(4.5)
]).flipX = true

k.add([
    k.pos(120, 80),
    k.sprite("slime"),
]);

k.onClick(() => k.addKaboom(k.mousePos()));

const c = kaboom({
    width: window.innerWidth,
    height: window.innerHeight
});

c.loadSprite("slime", "sprites/slime/slime-idle-1.png")
c.loadSprite("background0", "sprites/stringstar fields/background_0.png")
c.loadSprite("background1", "sprites/stringstar fields/background_1.png")
c.loadSprite("background2", "sprites/stringstar fields/background_2.png")

add([
    sprite('background0'),
    fixed(),
    scale(5.5)
]);

add([
    sprite('background0'),
    fixed(),
    pos(1000, 0),
    scale(5.5)
]).flipX = true


c.add([
    c.pos(120, 80),
    c.sprite("slime"),
])

c.onClick(() => c.addKaboom(c.mousePos()));

kaboom();