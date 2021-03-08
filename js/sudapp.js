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
    height: 600,
    width: 600,
    backgroundColor: 000000
});

onload = function() {

    canvas.appendChild(app.view);
}