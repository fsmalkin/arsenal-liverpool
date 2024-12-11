const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.color = color;
    this.speed = 5;
    this.health = 100;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(keys, controls) {
    if (keys[controls.up] && this.y > 0) this.y -= this.speed;
    if (keys[controls.down] && this.y < HEIGHT - this.height) this.y += this.speed;
    if (keys[controls.left] && this.x > 0) this.x -= this.speed;
    if (keys[controls.right] && this.x < WIDTH - this.width) this.x += this.speed;
  }
}

class Projectile {
  constructor(x, y, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
}

const player1 = new Player(100, HEIGHT / 2 - 20, 'red');
const player2 = new Player(WIDTH - 140, HEIGHT / 2 - 20, 'blue');
const projectiles = [];

const keys = {};
const controls1 = { up: 'w', down: 's', left: 'a', right: 'd', shoot: ' ' };
const controls2 = { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', shoot: 'Enter' };

window.addEventListener('keydown', (e) => { keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key] = false; });

function gameLoop() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  player1.draw();
  player2.draw();
  player1.move(keys, controls1);
  player2.move(keys, controls2);

  projectiles.forEach((proj, index) => {
    proj.update();
    proj.draw();
    if (proj.x < 0 || proj.x > WIDTH || proj.y < 0 || proj.y > HEIGHT) {
      projectiles.splice(index, 1);
    }
  });

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
  if (e.key === controls1.shoot) {
    projectiles.push(new Projectile(player1.x + player1.width, player1.y + player1.height / 2, 5, 0, 'green'));
  }
  if (e.key === controls2.shoot) {
    projectiles.push(new Projectile(player2.x, player2.y + player2.height / 2, -5, 0, 'black'));
  }
});

gameLoop();
