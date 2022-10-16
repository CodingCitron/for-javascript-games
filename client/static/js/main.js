import Sprite from './Sprite.js'
import Character from './Character.js'
import { ws } from './ws.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 800

const playerImage = new Image()
playerImage.src = './assets/chewie.png'

const backgroundImage = new Image()
backgroundImage.src = './assets/tattooine-game-background.png'

const background = new Sprite({ 
    canvas: canvas, 
    image: backgroundImage 
})

const player = new Character({
    canvas: canvas,
    image: playerImage, 
})


const keyList = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']

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
    }
}

function animate(){
    background.draw()
    player.draw()
    console.log('동작')
    requestAnimationFrame(animate)
}

animate()

addEventListener('keydown', e => {
    if(!keys[e.key]) return
    keys[e.key].pressed = true
})

addEventListener('keyup', e => {
    keys[e.key].pressed = false
})