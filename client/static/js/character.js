import Sprite from './sprite.js'

Character.WIDTH = 40
Character.HEIGHT = 72

function Character({ canvas, image, position, frames }){
    Sprite.call(this, { canvas, image, position, frames })
    
    this.width = Character.WIDTH
    this.height = Character.HEIGHT
}

Character.prototype = Object.create(Sprite.prototype)
Character.constructor = Character

Character.prototype.draw = function(){
    this.ctx.drawImage(
        this.image,
        0, 0, 
        this.width, this.height,
        200, 200,
        this.width, this.height,
    )
}

export default Character