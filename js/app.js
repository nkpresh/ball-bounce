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
let replay;
let backGroundImage;
//unstaged
let winQuitButton;
let loseQuitButton;
let bricks;
let treasure;

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

//replay button winner
replay = new PIXI.Texture.from("img/replayBtn.png");
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

//replay button for lose
var loseReplay = new PIXI.Sprite(replay);
loseReplay.height = 100;
loseReplay.width = 100;
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

//button
button = new PIXI.Sprite.from("img/play.png");
button.height = 60;
button.width = 60;
button.x = app.view.width / 3;
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
LosePage.addChild(loseQuitButton);

//win Page
let winRect = new PIXI.Graphics();
winRect.beginFill(0x111111);
winRect.drawRect(0, 0, app.view.width, app.view.height);
winPage.addChild(winRect);
winPage.addChild(winQuitButton);

onload = function(e) {
    app.stage.addChild(backGroundImage);
    e.preventDefault();
    canvas.appendChild(app.view);

    app.stage.addChild(firstPage);
    app.stage.addChild(LosePage);
    app.stage.addChild(winPage);

    LosePage.visible = false;
    winPage.visible = false;

    firstPage.addChild(text);
    firstPage.addChild(button);
    LosePage.addChild(loseReplay);

}

vx = 10;
vy = -10;

function startGame() {
    ball.x = app.view.width / 2;
    ball.y = app.view.width / 2;
    app.stage.addChild(player);
    app.stage.addChild(ball);
    LosePage.visible = false;
    winPage.visible = false;

    firstPage.visible = false;
    document.querySelector("#life").innerHTML = life;
    gameLoop = setInterval(moveBall, 1000 / speed);

}

function movePlayer(e) {
    let pos = e.data.global;
    player.x = pos.x;
}

function moveBall() {
    ball.x += vx;
    ball.y += vy;

    if (ball.x + ballRadius >= app.view.width - 5 || ball.x - ballRadius <= 5) {
        vx = -vx;
    }

    if (ball.y - ballRadius < 0) {
        vy = -vy;
    }

    if (ball.y + ballRadius > app.view.height - 10) {
        life--;
        if (life === 0) {
            clearInterval(gameLoop);
            let text1 = new PIXI.Text(`Game Over: ${point}`);
            text1.anchor.set(0.5);
            text1.x = app.view.width / 2;
            text1.y = app.view.height / 3;
            text1.style = new PIXI.TextStyle({
                fill: 0x4ec7f2,
                fontSize: 30,
                fontFamily: "Arcade"
            });
            LosePage.addChild(text1);
            app.stage.removeChild(ball);
            app.stage.removeChild(player);
            LosePage.visible = true;
        }
    }
    if (hitPlayer(ball, player)) {
        changeDirection();
    }

}

function hitPlayer(bll, ply) {
    return bll.x + bll.width / 2 > ply.x - (player.width / 2) &&
        ply.x + (ply.width / 2) > ball.x &&
        bll.y + bll.height > ply.y && ply.y + (ply.height / 2) > ball.x

}

function changeDirection() {
    point += 10;
    if (point == 100) {
        clearInterval(gameLoop);
        app.stage.removeChild(player);
        app.stage.removeChild(ball);
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

        winPage.visible = true;
        point = 0;
    } else {
        let collisionPoint = ball.x - (player.x + player.width / 2);
        collisionPoint = collisionPoint / (player.width / 2);
        angle = collisionPoint * Math.PI / 3;

        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
    }
    document.querySelector("#life").innerHTML = life;

}