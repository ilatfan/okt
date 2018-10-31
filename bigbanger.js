let particles = []
let sun = []
let planet = []
let center

/*
let random = (min, max) => {
    return Math.random() * (max - min) + min
}
*/

function setup() {
    createCanvas(1600, 1200)

    for (let i = 0; i < 500; i++) {
        if (i > 25)
            particles.push(new particle(random(width), random(height), random(1, 5)))
        else
            particles.push(new particle(random(width), random(height), random(6, 12)))
    }

    center = createVector(width/2, height/2)
    background(0)
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

    this.vel = p5.Vector.random2D().mult(8)
}

circleArea = r => Math.PI * r*r

drawParticle = particle => {
    ellipse(particle.pos.x, particle.pos.y, particle.r*2)
}

updateParticle = particle => {
    particle.pos.add(particle.vel)

    let dif = p5.Vector.sub(center, particle.pos).mult(0.001)

    if (particle.r > 5)
        particle.vel.add(dif)

    for (let i = 0; i < particles.length; i++) {
        let pDif = p5.Vector.sub(particles[i].pos, particle.pos).mult(circleArea(particles[i].r) * 0.0000001)

        particle.vel.add(pDif)
    }

    if (particle.pos.x < 0)
        particle.pos.x += width
    if (particle.pos.x > width)
        particle.pos.x -= width

    if (particle.pos.y < 0)
        particle.pos.y += height
    if (particle.pos.y > height)
        particle.pos.y -= height
}