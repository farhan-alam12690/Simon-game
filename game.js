var gamePattern = []; //stores randomly generated colors
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = []; //stores user clicked colors
var level = 0;
var currentLevel = 0;

//Start Game by keypress
$(document).keydown(function (event) {
    if (level === 0) {
        nextSequence();
    }
});

//User CLICK
$(".btn").click(function (event) {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);

    //Animation + Sound======
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //========================
    checkAnswer(currentLevel);
});

function nextSequence() { //randomly generated color sequence
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);

    setTimeout(function () { //waits 1 sec before showing pattern

        for (let i = 0, time = 1; i < gamePattern.length; i++) {

            setTimeout(function () { //waits 0.5 sec before showing next color
                //Animation + Sound======
                $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100); //flash animation
                playSound(gamePattern[i]);
                //=======================
            }, i * 500);
        }
    }, 1000);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}

function checkLastLevel() { //Checks whether last color of the pattern is reached 
    if (currentLevel === level) {
        currentLevel = 0;
        nextSequence();
    }
}

function checkAnswer(cl) { //cl = currentLevel
    var bool = true;

    if (userClickedPattern[cl] === gamePattern[cl]) {
        currentLevel++;
        checkLastLevel();
    } else {
        gameOver();
        bool = false;
    }
}

function gameOver() {
    level = 0;
    currentLevel = 0;
    gamePattern = [];
    userClickedPattern = [];

    $("h1").html("Gamve Over <br/><br/> Press Any Key to Restart");

    //Animation + Sound====
    $("body").addClass("game-over");
    playSound("wrong");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    //=====================

}