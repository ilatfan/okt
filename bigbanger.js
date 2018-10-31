let particles = []

let center

/*
let random = (min, max) => {
    return Math.random() * (max - min) + min
}
*/

function setup() {
    createCanvas(1600, 1200)

    for (let i = 0; i < 100; i++) {
        particles.push(new particle(random(width), random(height), random(4, 20)))
    }

    center = createVector(width/2, height/2)
    background(0)
}

function draw() {
    background(0, 80)

    fill(255)
    noStroke()
    for (let i = 0; i < particles.length; i++) {
        drawParticle(particles[i])
        updateParticle(particles[i])
    }
}

function particle(x, y, r) {
    this.pos = createVector(x, y)
    this.r = r

    this.vel = p5.Vector.random2D().mult(1)
}

drawParticle = particle => {
    ellipse(particle.pos.x, particle.pos.y, particle.r)
}

updateParticle = particle => {
    particle.pos.add(particle.vel)

    if (particle.pos.x < 0)
        particle.pos.x += width
    if (particle.pos.x > width)
        particle.pos.x -= width

    if (particle.pos.y < 0)
        particle.pos.y += height
    if (particle.pos.y > height)
        particle.pos.y -= height

    let dif = p5.Vector.sub(center, particle.pos).mult(0.001)

    particle.vel.add(dif)
}