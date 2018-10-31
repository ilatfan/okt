let particles = []

/*
let random = (min, max) => {
    return Math.random() * (max - min) + min
}
*/

function setup() {
    createCanvas(800, 600)

    for (let i = 0; i < 100; i++) {
        particles.push(new particle(random(width), random(height), random(4, 20)))
    }
}

function draw() {
    background(0)

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

    this.vel = p5.Vector.random2D().mult(0.2)
}

drawParticle = particle => {
    ellipse(particle.pos.x, particle.pos.y, particle.r)
}

updateParticle = particle => {
    particle.pos.add(particle.vel)
}