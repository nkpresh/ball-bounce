let app;
let ball;
let player;
var vx, vy;
let firstPage;
let winPage;
let speed = 30;
let LosePage;
let canvas = document.querySelector("#canvas");
let button;
var point = 0;
var life = 3;
let replay = new PIXI.Texture.from("img/replayBtn.png");
var text1;
let backGroundImage;
//not functional
let winQuitButton;
let loseQuitButton;
let treasure = [];
let TreasureBox;
//unstaged
let bricks = [];

//initialize pages
firstPage = new PIXI.Container();
LosePage = new PIXI.Container();
winPage = new PIXI.Container();

app = new PIXI.Application({
    width: 600,
    height: 600,
    backgroundColor: 0xAAAAAA,

});
app.stage.interactive = true;
app.stage.on("pointermove", movePlayer);

//backGroundImage
backGroundImage = new PIXI.Container();
backGroundImage.width = app.view.width;
backGroundImage.height = app.view.height;
var image = new PIXI.Sprite.from("img/background.png");
image.width = app.view.width;
image.height = app.view.height + 80;
backGroundImage.addChild(image);

//create ball
ball = new PIXI.Sprite.from("img/ball.png");
ball.width = 30;
ball.height = 30;
ball.anchor.set(0.5);
let ballRadius = ball.width / 2;

//create player
player = new PIXI.Sprite.from("img/paddle.png");
player.width = 147;
player.height = 21;
player.anchor.set(0.5);
player.x = app.view.width / 2;
player.y = app.view.height - 10;

//treasure box
app.loader.baseUrl = "img"
app.loader.add("treasureBox", "treasureBox.png");

function doneLoading(e) {
    createTreasureSheet();
    createTreasure();
    // app.ticker.add(loopGame);
}

function createTreasureSheet() {
    let sSheet = new PIXI.BaseTexture.from(app.loader.resources["treasureBox"].url);
    let w = 50;
    let h = 35;

    treasure["lockTreasure"] = [
        new PIXI.Texture(sSheet, new PIXI.Rectangle(0, 0, w, h))
    ];
    treasure["openTreasure"] = [
        new PIXI.Texture(sSheet, new PIXI.Rectangle(1 * w, 0, w, h))
    ];
}

function createTreasure() {
    treasureBox = new PIXI.AnimatedSprite(treasure.openTreasure);
    treasureBox.anchor.set(0.5);
    treasureBox.loop = false;
    treasureBox.x = Math.random() * app.view.width;
    treasureBox.y = Math.random() * app.view.height / 3;
    app.stage.addChild(treasureBox);
    treasureBox.play();

}

//bricks
bricks = [
    new PIXI.Sprite.from("img/Brick.png"),
    // new PIXI.Sprite.from("img/Brick.png"),
    // new PIXI.Sprite.from("img/Brick.png"),
];

function loadBricks() {
    let py = 0;
    bricks.forEach(brick => {
        brick.height = 20;
        brick.width = 150;
        brick.x = app.view.width / 2;
        brick.y = (app.view.width / 2) + py;
        py += brick.height;

        app.stage.addChild(brick)
    });
}

function bounceBricks() {
    bricks.forEach(function(brick) {
        if (ball.y - (ball.height / 2) >= brick.y &&
            brick.y + brick.height >= ball.y - (ball.height / 2) &&
            ball.x <= (brick.x + brick.width / 2) &&
            ball.x >= brick.x - (brick.width / 2)
        ) {
            changeDirection();
        }
    })
}


//button
button = new PIXI.Sprite.from("img/playButton.png");
button.height = 60;
button.width = 150;
button.x = app.view.width / 2.5;
button.y = app.view.height / 2;
button.interactive = true;
button.buttonMode = true;
button.on("click", startGame);

//create first page
let BlackRect = new PIXI.Graphics();
BlackRect.beginFill(0x111111);
BlackRect.drawRect(0, 0, app.view.width, app.view.height);
firstPage.addChild(BlackRect);
let text = new PIXI.Text("Welcome!!!");
text.anchor.set(0.5);
text.x = app.view.width / 2;
text.y = app.view.height / 3;
text.width = 500;
text.style = new PIXI.TextStyle({
    fill: 0xe74c3c,
    fontSize: 80,
    fontFamily: "Arcade"
});

//lose Page
let NewRect = new PIXI.Graphics();
NewRect.beginFill(0x111111);
NewRect.drawRect(0, 0, app.view.width, app.view.height);
LosePage.addChild(NewRect);

//replay button for lose
var loseReplay = new PIXI.Sprite(replay);
loseReplay.height = 80;
loseReplay.width = 80;
loseReplay.anchor.set(0.5);
loseReplay.x = app.view.width / 2;
loseReplay.y = 300;
loseReplay.buttonMode = true;
loseReplay.interactive = true;

//lose quite button
loseQuitButton = new PIXI.Sprite.from("img/quitButton.png");
loseQuitButton.height = 60;
loseQuitButton.width = 100;
loseQuitButton.anchor.set(0.5);
loseQuitButton.x = app.view.width / 2;
loseQuitButton.y = 400;

loseQuitButton.buttonMode = true;
loseQuitButton.interactive = true;

//lose replay functionality
loseReplay.on("click", startGame)
LosePage.addChild(loseQuitButton);
LosePage.addChild(loseReplay);


//win Page
let winRect = new PIXI.Graphics();
winRect.beginFill(0x111111);
winRect.drawRect(0, 0, app.view.width, app.view.height);
winPage.addChild(winRect);


var replayButton = new PIXI.Sprite(replay);
replayButton.height = 100;
replayButton.width = 100;
replayButton.anchor.set(0.5);
replayButton.x = app.view.width / 2;
replayButton.y = 300;

replayButton.buttonMode = true;
replayButton.interactive = true;

//replay functionality
replayButton.on("click", startGame)

//win quite button
winQuitButton = new PIXI.Sprite.from("img/quitButton.png");
winQuitButton.height = 60;
winQuitButton.width = 100;
winQuitButton.anchor.set(0.5);
winQuitButton.x = app.view.width / 2;
winQuitButton.y = 400;

winQuitButton.buttonMode = true;
winQuitButton.interactive = true;

//win quit 
// winQuitButton.on("click", leaveGame);
winPage.addChild(winQuitButton);


onload = function(e) {
    app.stage.addChild(backGroundImage);
    e.preventDefault();
    canvas.appendChild(app.view);

    app.stage.addChild(firstPage);
    app.stage.addChild(winPage);
    app.stage.addChild(LosePage);

    firstPage.addChild(text);
    firstPage.addChild(button);
    firstPage.visible = true;
    LosePage.visible = false;
    winPage.visible = false;
}

vx = 10;
vy = -10;

function startGame() {
    loadBricks();
    point = 0;
    LosePage.removeChild(text1);
    winPage.visible = false;
    LosePage.visible = false;
    ball.x = app.view.width / 2;
    ball.y = app.view.width / 2;
    app.stage.addChild(player);
    app.stage.addChild(ball);
    life = 3;
    firstPage.visible = false;
    document.querySelector("#life").innerHTML = life;
    gameLoop = setInterval(moveBall, 1000 / speed);
    app.loader.load(doneLoading);

}

function movePlayer(e) {
    let pos = e.data.global;
    player.x = pos.x;
}

function moveBall() {
    ball.x += vx;
    ball.y += vy;
    bounceBricks();
    if (ball.x + ballRadius >= app.view.width - 5 || ball.x - ballRadius <= 5) {
        vx = -vx;
    }

    if (ball.y - ballRadius < 0) {
        vy = -vy;
    }

    if (ball.y + (ball.width / 2) >= app.view.height) {
        life--;
        point = point;
        if (life == 0) {
            clearInterval(gameLoop);
            app.stage.removeChild(ball);
            app.stage.removeChild(player);
            app.stage.removeChild(treasure);
            text1 = new PIXI.Text(`Game Over: ${point}`);
            text1.anchor.set(0.5);
            text1.x = app.view.width / 2;
            text1.y = app.view.height / 3;
            text1.style = new PIXI.TextStyle({
                fill: 0x4ec7f2,
                fontSize: 30,
                fontFamily: "Arcade"
            });
            LosePage.addChild(text1);
            LosePage.visible = true;

        } else {
            resetBall();
        }
    }
    if (hitPlayer(ball, player)) {
        point += 10;
        changeDirection();
    }

}

function resetBall() {
    ball.x = app.view.width / 2;
    ball.y = player.y - ballRadius
    vx = 3 * (Math.random() * 2 - 1);
}

function hitPlayer(bll, ply) {
    return bll.x + bll.width / 2 > ply.x - (player.width / 2) &&
        ply.x + (ply.width / 2) > ball.x &&
        bll.y + bll.height > ply.y && ply.y + (ply.height / 2) > ball.x

}

function changeDirection() {
    let collisionPoint = ball.x - (player.x + player.width / 2);
    collisionPoint = collisionPoint / (player.width / 2);
    angle = collisionPoint * Math.PI / 3;

    vx = Math.cos(angle) * speed;
    vy = Math.sin(angle) * speed;
    document.querySelector("#life").innerHTML = life;

}

function hitTreasure() {
    if (true) {
        clearInterval(gameLoop);
        app.stage.removeChild(player);
        app.stage.removeChild(ball);
        app.stage.removeChild(treasure);

        let winText = new PIXI.Text(`You Win ! ! ! Score :  ${point}`);
        winText.anchor.set(0.5);
        winText.x = app.view.width / 2;
        winText.y = app.view.height / 3;
        winText.width = 500;
        winText.style = new PIXI.TextStyle({
            fill: 0xAAAA,
            fontSize: 80,
            fontFamily: "Arcade"
        });
        winPage.addChild(winText);
        winPage.addChild(replayButton);

        app.stage.addChild(winPage);


        winPage.visible = true;

    }
}