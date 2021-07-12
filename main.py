velocity = 20

def make_ball():
    ball = sprites.create(img("""
                . . 5 5 5 5 . . 
                        . 5 5 5 5 5 5 . 
                        5 5 5 5 5 5 5 5 
                        5 5 5 5 5 5 5 5 
                        5 5 5 5 5 5 5 5 
                        5 5 5 5 5 5 5 5 
                        . 5 5 5 5 5 5 . 
                        . . 5 5 5 5 . .
            """), SpriteKind.enemy)
    ball.set_velocity(randint(-velocity, velocity), randint(-velocity, velocity))#object method
    ball.set_bounce_on_wall(True)#object method
    ball.x = randint(0, 120)#object attribute setting
    ball.y = randint(0, 160)#object attribute setting
    return ball

ball1 = make_ball()
ball2 = make_ball()
ball3 = make_ball()

ship = sprites.create(img("""
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
"""), SpriteKind.player)
ship.set_stay_in_screen(True)

info.set_life(1)

controller.move_sprite(ship, 50, 0)
ship.y = 110
ship.x = 60

def on_on_event():
    global ship
    bullet = sprites.create_projectile_from_sprite(img("""
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
    """), ship, 0, -200)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_on_event)

def on_on_overlap(sprite, otherSprite):
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def on_on_overlap2(sprite, otherSprite):
    global velocity
    info.change_score_by(1)
    sprite.destroy()
    velocity *= -1.07
    otherSprite.set_velocity(velocity, velocity)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)