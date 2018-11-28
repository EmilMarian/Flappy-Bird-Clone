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

    this.brain = new NeuralNetwork(4, 4, 1);
  }

  show() {
    // draw the icon CENTERED around the X and Y coords of the bird object
    image(this.icon, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  up() {
    this.velocity = this.lift;
  }

  think(pipes){
    let inputs = [];
    inputs[0] = this.y / this.height;
    inputs[1] = pipes[0].top / this.height;
    inputs[2] = pipes[0].bottom / this.height;
    inputs[3] = pipes[0].x / this.width;

    let output = this.brain.predict(inputs);
    if(output > 0.5){
      this.up();
    }
  }

  update() {
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