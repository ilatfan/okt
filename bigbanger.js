let particles = []
//let sun = []
//let planet = []
let center

/*
let random = (min, max) => {
    return Math.random() * (max - min) + min
}
*/

function setup() {
    createCanvas(1600, 1200)

    for (let i = 50; i >= 0; i--) {
        if (i > 25)
            particles.push(new particle(random(width), random(height), random(1, 3)))
        else
            particles.push(new particle(random(width), random(height), random(4, 8)))
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

    //let dif = p5.Vector.sub(center, particle.pos).mult(0.001)

    //if (particle.r > 5)
    //    particle.vel.add(dif)

    for (let i = particles.length-1; i >= 0; i--) {
        if (particles[i] == particle)
            continue
            
        let pDif = p5.Vector.sub(particles[i].pos, particle.pos).mult(circleArea(particles[i].r) * 0.0000001)

        particle.vel.add(pDif)

        if (particleCollision(particle, particles[i])) {
            // Collision
            let ratio =  circleArea(particle.r) / circleArea(particles[i].r)

            particle.r = Math.sqrt( (circleArea(particle.r) + circleArea(particles[i].r)) / Math.PI )
            particle.vel = p5.Vector.add(particle.vel.mult(ratio), particles[i].vel.mult(1/ratio)).mult(0.001)

            particles.splice(i, 1)
        }
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

particleCollision = (p1, p2) => {
    let dist = p1.pos.dist(p2.pos)
    return p1.r + p2.r > dist
} 