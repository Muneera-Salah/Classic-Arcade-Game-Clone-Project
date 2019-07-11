let modelDiv = document.querySelector('#modaldiv');
let modelTitle = document.querySelector('#modaltitle');
let modleMsg = document.querySelector('#modalmsg');
let modalBtn = document.querySelector('#modalbtn');
let pointsprint = document.querySelector('#points');
let points = 0;
const areawidth = 400;
const areaheight = 400;
const areaout = 500;
// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //Enemy postion
    this.x = x;
    this.y = y;
    //Enemy speed
    this.speed = Math.random() * 300;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > areaout) {
        this.x = -5;
    }
    if (Math.abs(this.x - player.x) < 102 && Math.abs(this.y - player.y) < 85) {
        if (points <= 0) {
            points = 0;
            $('#modaldiv').modal('show');
            modelTitle.innerHTML = '<strong>Game Over</strong>';
            modleMsg.innerHTML = 'You lose your points';
            modalBtn.innerHTML = 'play again';
            pointsprint.innerHTML = points;
        } else {
            points -= 1;
            $('#modaldiv').modal('show');
            modelTitle.innerHTML = '<strong>Game Over</strong>';
            modleMsg.innerHTML = 'You lose one points';
            modalBtn.innerHTML = 'play again';
            pointsprint.innerHTML = points;
        }
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        // initial location
        this.x = 202;
        this.y = 402;
        //Player character
        this.char = 'images/char-boy.png';
    }
    update() {
        //arrival win area
        if (this.x >= -6 && this.y <= 0) {
            points += 1;
            $('#modaldiv').modal('show');
            modelTitle.innerHTML = '<strong>Congratulations</strong>';
            modleMsg.innerHTML = '<img src="images/Star.png" width="50px;" />' +
                '<img src="images/Star.png" width="50px;" />' +
                '<img src="images/Star.png" width="50px;" /> <br />' +
                '<em>Your are winner<em>';
            modalBtn.innerHTML = 'play next points';
            pointsprint.innerHTML = points;
            //back to start postion
            this.reset();
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.char), this.x, this.y);
    }
    handleInput(keyPress) {
        //moving player
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 102;
        };
        if (keyPress == 'right' && this.x < areawidth) {
            this.x += 102;
        };
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 85;
        };
        if (keyPress == 'down' && this.y < areaheight) {
            this.y += 85;
        };
    }
    reset() {
        //reset player postion
        this.x = 202;
        this.y = 402;
    }
};

// Now instantiate your objects.
const playerObj = new Player();
const enemyObj1 = new Enemy(-50, 50);
const enemyObj2 = new Enemy(-115, 115);
const enemyObj3 = new Enemy(-215, 215);
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
allEnemies.push(enemyObj1, enemyObj2, enemyObj3);
// Place the player object in a variable called player
let player = playerObj;
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});