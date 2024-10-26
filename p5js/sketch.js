class Lorenz {
  constructor(posx,posy,x,y,z,feedback) {
    this.posx = posx;
    this.posy = posy;
    
    this.x = x;
    this.y = y;
    this.z = z;
    
    this.feedback = feedback;
    
    this.a = 10;
    this.b = 28;
    this.c = 8.0 / 3.0;
    
    this.maxPoints = 33; 
    this.points = new Array();
  }

  draw() {
    //let feedback = 1
    let perturbation = 1
    for(let i=0; i<this.feedback.lenght-1; i++) {
        perturbation += l[this.feedback[i]].y * 0.003
    }
    let dt = 0.01;
    let dx = ((this.a * perturbation) * (this.y - this.x)) * dt;
    let dy = (this.x * (this.b - this.z) - this.y) * dt;
    let dz = (this.x * this.y - this.c * this.z) * dt;
    this.x = this.x + dx;
    this.y = this.y + dy;
    this.z = this.z + dz;

    if(this.points.length == this.maxPoints) {
      this.points.shift(); 
    }

    this.points.push(new p5.Vector(this.x, this.y, this.z));

    noFill();
    stroke(255,0,0);

    beginShape();

    for(let i=0; i<this.points.length-1; i++) {
      vertex(this.points[i].y + this.posx, this.points[i].z + this.posy); 
    }

    endShape();
  }
}

class mouseInput {
  constructor() {
    this.y = 0;
  }

  draw() {
    this.y = mouseX/zoom-width/zoom/2;
    //print(this.y)
    // Draw a vertical line at the height of the mouse
    stroke(255,0,0);
    line(this.y, -width/2, this.y, width/2);
  }
}

let zoom=5;

let l = new Array;
l.push(new Lorenz(0, -25, Math.random()*20-10, Math.random()*20-10, Math.random()*20-10, [1]));
l.push(new mouseInput());

function setup() {
  createCanvas(350, 350, WEBGL);
  translate(width / 2, height / 2); 
}

function draw() {
  background(255);
  scale(zoom);

  stroke(100)
  line(0, -height / 2, 0, height / 2);
  line(-width / 2, 0, width / 2, 0);

  stroke(200)
  line(-2, -height / 2, -2, height / 2);
  line(2, -height / 2, 2, height / 2);
  line(-3, -height / 2, -3, height / 2);
  line(3, -height / 2, 3, height / 2);

  l[0].draw();
  l[1].draw();

  if (l[0].y >= 2 && l[0].y <= 3) {
    fill(255, 200, 200); // Pink color
    stroke(255, 200, 200)
    rect(2, -height / 2, 1, height);
  }

  if (l[0].y >= -3 && l[0].y <= -2) {
    fill(255, 200, 200); // Pink color
    stroke(255, 200, 200)
    rect(-3, -height / 2, 1, height);
  }
}

