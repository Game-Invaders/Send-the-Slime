const p = kaboom ({
    width: innerWidth,
    height: innerHeight,
});

p.loadSpriteAtlas("sprites/stringstar fields/tileset.png", {
    'platform-left': { x: 82, y: 64, width: 16, height: 8 },
    'platform-middle': { x: 112, y: 64, width: 16, height: 8 },
    'platform-right': { x: 142, y: 64, width: 16, height: 8 },
});

const map = addLevel([
    '                                    012        ',
    '                                               ',
    '    012                        012             ',
    '               012                             ',
    '                                               ',
    '        012                      012           ',
    '                    012                        ',
    '                                    012        ',
    '         012                                   ',
    '                                               ',
], {
    tileWidth: 16,
    tileHeight: 16,
    tiles: {
        0: () => [sprite('platform-left'), area(), body({isStatic: true})],
        1: () => [sprite('platform-middle'), area(), body({isStatic: true})],
        2: () => [sprite('platform-right'), area(), body({isStatic: true})],
    }
})



kaboom();