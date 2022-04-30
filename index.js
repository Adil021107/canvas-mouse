const canvas = document.getElementById("can")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext("2d")

const mouse = {
  x: null,
  y: null,
  radius: 500,

}

canvas.onmousemove = (e) => {
  mouse.x = e.x
  mouse.y = e.y
}

//==========create ball object==========
class Ball {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.baseX = this.x
    this.baseY = this.y
    this.color = color
    this.density = Math.random() * 30 + 1
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }

  update() {
    let disX = mouse.x - this.x
    let disY = mouse.y - this.y

    //d or mag
    let distance = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2))

    //normalize r
    let dirX = disX / distance
    let dirY = disY / distance

    let friction = (mouse.radius - distance) / mouse.radius

    let directionX = friction * dirX * this.density
    let directionY = friction * dirY * this.density

    if (distance < mouse.radius) {
      this.x -= directionX
      this.y -= directionY
    } else {
      if (this.x != this.baseX) {
        let drx = this.x - this.baseX
        this.x -= drx / 18;
      }
      if (this.y != this.baseY) {
        let dry = this.y - this.baseY
        this.y -= dry / 18;
      }
    }
  }
}

let balls = []

const init = () => {
  balls = [];
  const colors = ["#4B0082", "#7FFF00", "#4B0082", "#FF8C00"]

  for (let i = 0; i < 1000; i++) {
    let r = 20;
    let x = Math.floor(Math.random() * (canvas.width - 2 * r)) + r
    let y = Math.floor(Math.random() * (canvas.height - 2 * r)) + r
    let color = colors[Math.floor(Math.random() * colors.length) + 1]

    balls.push(new Ball(x, y, r, color))
  }
};

window.onresize = () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  init()
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw()
    balls[i].update()
  }

  requestAnimationFrame(animate)
};

init()
animate()