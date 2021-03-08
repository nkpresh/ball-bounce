let app;
let player;
let ball;
let canvas = document.querySelector("#canvas");

//the app and stage
//the player and ball
//buttons
//container
//the wall reflection
//set ball direction and movement
//player movement
//

app = new PIXI.Application({
    height: window.height / 2,
    width: window.width / 2,
    backgroundColor: 000000
});

onload = function() {
    canvas.style.height = window.height / 2;
    canvas.style.width = window.width / 2;
    canvas.appendChild(app.view);

}