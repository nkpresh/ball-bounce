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
let continueGame;

app = new PIXI.Application({
    width: 600,
    height: 600,
    backgroundColor: 0xAAAAAA,

});
app.view.x = window.width / 2;
app.view.y = window.height / 2;

//replay button
replay = new PIXI.Texture.fromImage("")


//continue game button


//initialize pages
firstPage = new PIXI.Container();
LosePage = new PIXI.Container();
winPage = new PIXI.Container();

//create player
player = new PIXI.Sprite.from("img/player.png");
player.width = 150;
player.height = 20;
player.anchor.set(0.5);
player.x = app.view.width / 2;
player.y = app.view.height - 15;

//create ball
ball = new PIXI.Sprite.from("img/ball.png");
ball.width = 30;
ball.height = 30;
ball.x = app.view.width / 2;
ball.y = ball.y = app.view.height / 2;
ball.anchor.set(0.5);

//button
button = new PIXI.Sprite.from("img/playButton.png");
button.height = 40;
button.width = 140;
button.x = app.view.width / 3;
button.y = app.view.height / 2;
button.interactive = true;

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
    app.stage.addChild(player);
    app.stage.addChild(ball);
    app.stage.addChild(firstPage);
    app.stage.addChild(LosePage);
    app.stage.addChild(winPage);

    LosePage.visible = false;
    winPage.visible = false;

    firstPage.addChild(text);
    firstPage.addChild(button);

}
button.on("click", startGame);

function startGame() {
    firstPage.visible = false;
    document.querySelector("#life").innerHTML = life;
    gameLoop = setInterval(moveBall, 1000 / speed);

}
app.stage.interactive = true;
app.stage.on("pointermove", movePlayer);
vx = Math.floor(Math.random() * 20 - 60 / 20);
vy = Math.floor(Math.random() * 20 - 60 / 20);

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
    if (ball.x + (ball.width / 2) > app.view.width || ball.x - ball.width <= 0) {
        vx = -vx;
    }

    if (ball.y - ball.height < 0) {
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
    return bll.x + (bll.width / 2) >= ply.x - (player.width / 2) &&
        ply.x + (ply.width / 2) > ball.x &&
        bll.y + (bll.height) > ply.y &&
        ply.y + (ply.height / 2) > ball.y;
}

function changeDirection() {
    point += 10;
    if (point == 100) {
        clearInterval(gameLoop);
        app.stage.removeChild(player);
        app.stage.removeChild(ball);
        let winText = new PIXI.Text(`Well done !!! Score: ${point}`);
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
        winPage.visible = true;
    } else {
        let CollidPoint = ball.x - player.x;
        let angle = CollidPoint * (Math.PI / 3);
        vx = speed * Math.sin(angle);
        vy = -speed * Math.cos(angle);
    }
    document.querySelector("#life").innerHTML = life;

}