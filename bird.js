// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY

// Class is exported (eslint flag)
/* exported Bird */
class Bird {
  constructor() {
    this.y = height / 2;
    this.x = 64;

    this.gravity = 0.6;
    this.lift = -10;
    this.velocity = 0;

    this.icon = birdSprite;
    this.width = 64;
    this.height = 64;

    this.score = 0;
    this.fitness = 0;
    this.brain = new NeuralNetwork(4, 4, 2);
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  up() {
    this.velocity = this.lift;
  }

  think(pipes){

    //Find the closest pipe
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < pipes.length; i++){
      let d = pipes[i].x - this.x;
      if(d < closestD && d > 0){
        closest = pipes[i];
        closestD = d;
      }
    }

    let inputs = [];
    inputs[0] = this.y / this.height;
    inputs[1] = closest.top / this.height;
    inputs[2] = closest.bottom / this.height;
    inputs[3] = closest.x / this.width;

    let output = this.brain.predict(inputs);
    if(output[0] > 0.5){
      this.up();
    }
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.height / 2) {
      this.y = height - this.height / 2;
      this.velocity = 0;
    }

    if (this.y <= this.height / 2) {
      this.y = this.height / 2;
      this.velocity = 0;
    }
  }
}