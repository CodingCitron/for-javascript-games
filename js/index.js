import collisions from '../data/collisions.js'
 
(function(){
    console.log(collisions)
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    
    let tileWidth = 70
    let tileHeight = 40

    const collisionsMap = []
    for(let i = 0; i < collisions.length; i += tileWidth) {
        collisionsMap.push(collisions.slice(i, tileWidth + i))
    }

    const offset = {
        x: -400,
        y: -400
    }

    console.log(collisionsMap)

    // 함수형 static 선언 방법 클래스의 스태틱과 똑같은 동작 
    Boundary.width = 64
    Boundary.height = 64

    function Boundary({ position }){
        this.position = position
        this.width = Boundary.width
        this.height = Boundary.height
    }


    Boundary.prototype.draw = function(){
        // ctx.fillStyle = 'red'
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    const boundaries = []

    collisionsMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
            if(symbol === 2561)
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y
                }
            }))
        })
    })

    console.log(boundaries)

    const width = canvas.width = document.getElementById('app').offsetWidth
    const height = canvas.height = document.getElementById('app').offsetHeight

    const image = new Image()
    image.src = './img/test-zoom-400.png'

    const playerImage = new Image()
    playerImage.src = './img/playerDown.png'

    function Sprite({ image, position, velocity, frames = { max: 1 } }){
        this.image = image
        this.position = position
        this.velocity = velocity
        this.frames = frames

        this.image.addEventListener('load', () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height / this.frames.max
        })
    }

    Sprite.prototype.draw = function(){
        // ctx.drawImage(this.image, this.position.x, this.position.y)
        ctx.drawImage(this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height, 
        )
    }

    // this.position.x - ( this.image.width / 4 ) / 2, 
    // this.position.y - ( this.image.height / 2 ),

    const background = new Sprite({ 
        image: image,
        position: {
            x: offset.x,
            y: offset.y
        } 
    })

    const player = new Sprite({
        image: playerImage,
        position: {
            x: 200 - ( playerImage.width / 4 ) / 2,
            y: 600 - ( playerImage.height / 2 )
        },
        frames: {
            max: 4,
        } 
    })

    let lastKey = ''
    const keys = {
        ArrowLeft: {
            pressed: false
        },
        ArrowRight: {
            pressed: false
        },
        ArrowUp: {
            pressed: false
        },
        ArrowDown: {
            pressed: false
        },
    }

    const movable = [background, ...boundaries]

    function rectangularCollision({ rectangle1, rectangle2 }){
        return (
            rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height
        )
    }

    function animate(){
        requestAnimationFrame(animate)
        background.draw()
        boundaries.forEach(boundary => {
            boundary.draw()
        })
        player.draw()

        let moving = true
        if(keys.ArrowUp.pressed && lastKey === 'ArrowUp') { 
            for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]

                if(rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if(moving) 
                movable.forEach(movable => {
                    movable.position.y += 3
                })
        }
        if(keys.ArrowDown.pressed && lastKey === 'ArrowDown') { 
              for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]

                if(rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if(moving) 
            movable.forEach(movable => {
                movable.position.y -= 3
            })
        }
        if(keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') { 
              for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]

                if(rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if(moving) 
            movable.forEach(movable => {
                movable.position.x += 3
            })
        }
        if(keys.ArrowRight.pressed && lastKey === 'ArrowRight') { 
              for(let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]

                if(rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })) {
                    console.log('colliding')
                    moving = false
                    break
                }
            }

            if(moving) 
            movable.forEach(movable => {
                movable.position.x -= 3
            })
        }
    }

    animate()

    addEventListener('keydown', keydown)
    addEventListener('keyup', keyup)

    function keydown(e){
        switch(e.key) {
            case 'ArrowLeft':
                keys[e.key].pressed = true
                lastKey = e.key
            break

            case 'ArrowRight':
                keys[e.key].pressed = true
                lastKey = e.key
            break

            case 'ArrowUp':
                keys[e.key].pressed = true
                lastKey = e.key
            break

            case 'ArrowDown':
                keys[e.key].pressed = true
                lastKey = e.key
            break
        }
    }

    function keyup(e){
        switch(e.key) {
            case 'ArrowLeft':
                keys[e.key].pressed = false
            break

            case 'ArrowRight':
                keys[e.key].pressed = false
            break

            case 'ArrowUp':
                keys[e.key].pressed = false
            break

            case 'ArrowDown':
                keys[e.key].pressed = false
            break
        }
    }

})()

