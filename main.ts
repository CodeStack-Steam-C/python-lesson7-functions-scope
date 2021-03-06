let velocity = 20
function make_ball(): Sprite {
    let ball = sprites.create(img`
                . . 5 5 5 5 . . 
                        . 5 5 5 5 5 5 . 
                        5 5 5 5 5 5 5 5 
                        5 5 5 5 5 5 5 5 
                        5 5 5 5 5 5 5 5 
                        5 5 5 5 5 5 5 5 
                        . 5 5 5 5 5 5 . 
                        . . 5 5 5 5 . .
            `, SpriteKind.Enemy)
    ball.setVelocity(randint(-velocity, velocity), randint(-velocity, velocity))
    // object method
    ball.setBounceOnWall(true)
    // object method
    ball.x = randint(0, 120)
    // object attribute setting
    ball.y = randint(0, 160)
    // object attribute setting
    return ball
}

let ball1 = make_ball()
let ball2 = make_ball()
let ball3 = make_ball()
let ship = sprites.create(img`
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . . c d . . . . . . .
    . . . . . . . c b . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . . c 4 . . . . . . .
    . . . . . . . f f . . . . . . .
    . . . . . . . e 4 . . . . . . .
    . . . . . . e e 5 2 . . . . . .
    . . . . . . e 4 5 2 . . . . . .
    . . . . . c c c 2 2 2 . . . . .
    . . . . e e 4 4 4 5 2 2 . . . .
    . . e f f f c c 2 2 f f 2 2 . .
    . e e e e 2 2 4 4 4 4 5 4 2 2 .
    e e e e e e 2 2 4 4 4 5 4 4 2 2
    e e e e e e 2 2 4 4 4 4 5 4 2 2
`, SpriteKind.Player)
ship.setStayInScreen(true)
info.setLife(1)
controller.moveSprite(ship, 50, 0)
ship.y = 110
ship.x = 60
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_on_event() {
    
    let bullet = sprites.createProjectileFromSprite(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . 2 2 2 . . . . . . .
    . . . . . 2 3 1 3 2 . . . . . .
    . . . . . 3 1 1 1 3 . . . . . .
    . . . . . 3 1 1 1 3 . . . . . .
    . . . . . 3 1 1 1 3 . . . . . .
    . . . . . 3 1 1 1 2 . . . . . .
    . . . . . 2 1 1 1 2 . . . . . .
    . . . . . 2 3 1 3 2 . . . . . .
    . . . . . . 3 1 3 . . . . . . .
    . . . . . . 2 1 2 . . . . . . .
    . . . . . . 2 1 2 . . . . . . .
    . . . . . . 2 1 2 . . . . . . .
    . . . . . . . . . . . . . . . .
    `, ship, 0, -200)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap2(sprite: Sprite, otherSprite: Sprite) {
    
    info.changeScoreBy(1)
    sprite.destroy()
    velocity *= -1.07
    otherSprite.setVelocity(velocity, velocity)
})
