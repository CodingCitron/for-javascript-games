function Sprite({ canvas, image, position, frames }){
    this.image = image
    this.ctx = canvas.getContext('2d')

    this.position = position
    this.frames = frames
    this.width
    this.height

    this.image.addEventListener('load', () => {
        
    })
}

Sprite.prototype.draw = function(){
    this.ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height)
}

export default Sprite
