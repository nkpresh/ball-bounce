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
let ballRadius;

app = new PIXI.Application({
    width: 600,
    height: 600,
    backgroundColor: 0xAAAAAA,

});

app.stage.interactive = true;
app.stage.on("pointermove", movePlayer);

//create ball
ball = new PIXI.Sprite.from("img/ball.png");
ball.width = 30;
ball.height = 30;
ball.anchor.set(0.5);
ballRadius = ball.width / 2;

//create player
player = new PIXI.Sprite.from("img/player.png");
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

//replay button for lose
var loseReplay = new PIXI.Sprite(replay);
loseReplay.height = 100;
loseReplay.width = 100;
loseReplay.anchor.set(0.5);
loseReplay.x = app.view.width / 2;
loseReplay.y = 300;
loseReplay.buttonMode = true;
loseReplay.interactive = true;

//lose replay functionality
loseReplay.on("click", startGame)


//initialize pages
firstPage = new PIXI.Container();
LosePage = new PIXI.Container();
winPage = new PIXI.Container();

//button
button = new PIXI.Sprite.from("img/play.png");
button.height = 100;
button.width = 100;
button.x = app.view.width / 3;
button.y = app.view.height / 2;
button.interactive = true;
button.buttonMode = true;
button.on("click", startGame);

//create first page
let BlackRect = new PIXI.Graphics();
BlackRect.beginFill(0xAAAAA);
BlackRect.drawRect(0, 0, app.view.width, app.view.height);
firstPage.addChild(BlackRect);
let text = new PIXI.Text("Welcome!!!");
text.anchor.set(0.5);
text.x = app.view.width / 2;
text.y = app.view.height / 3;
text.width = 500;
text.style = new PIXI.TextStyle({
    fill: 0x111111,
    fontSize: 80,
    fontFamily: "Arcade"
});

//lose Page
let NewRect = new PIXI.Graphics();
NewRect.beginFill(0x111111);
NewRect.drawRect(0, 0, app.view.width, app.view.height);
LosePage.addChild(NewRect);

//win Page
let winRect = new PIXI.Graphics();
winRect.beginFill(0x111111);
winRect.drawRect(0, 0, app.view.width, app.view.height);
winPage.addChild(winRect);

onload = function(e) {

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

vx = Math.floor(Math.random() * 10 + 100 / speed);
vy = Math.floor((-1 * Math.random() * 10 + 100) / speed);

function startGame() {
    ball.x = app.view.width / 2;
    ball.y = app.view.height / 2;
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

    if (hitPlayer(ball, player)) {
        changeDirection();
    }
    if (ball.x + (ball.width / 2) > app.view.width || ball.x - (ball.width / 2) < 0) {
        vx = -vx;
    }

    if (ball.y - (ball.height / 2) < 0) {
        vy = -vy;
    }

    if (ball.y + (ball.height / 2) > app.view.height) {
        life--;
        if (life == 0) {
            clearInterval(gameLoop);
            let text1 = new PIXI.Text(`YOU LOSE!  SCORE: ${point}`);
            text1.anchor.set(0.5);
            text1.x = app.view.width / 2;
            text1.y = app.view.height / 3;
            text1.width = 500;
            text1.style = new PIXI.TextStyle({
                fill: 0xAAAA,
                fontSize: 30,
                fontFamily: "Arcade"
            });
            LosePage.addChild(text1);
            app.stage.removeChild(ball);
            app.stage.removeChild(player);
            LosePage.visible = true;
        }

    }

}

function hitPlayer(bll, ply) {
    return
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
    } else {
        let CollidPoint = ball.x - player.x;
        let angle = CollidPoint * (Math.PI / 3);
        document.querySelector("#speedAndDirection").innerHTML = vy;
    }
    document.querySelector("#life").innerHTML = life;

}