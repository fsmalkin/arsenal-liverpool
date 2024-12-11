class Player {
  constructor(x, y, color, imageSrc) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.color = color;
    this.image = new Image();
    this.image.src = imageSrc;
    this.speed = 5;
    this.health = 100;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
const player1 = new Player(100, HEIGHT / 2 - 20, 'red', 'red.png');
const player2 = new Player(WIDTH - 140, HEIGHT / 2 - 20, 'blue', 'blue.png');
