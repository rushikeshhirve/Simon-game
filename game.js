var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var score = 0

const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // console.log(randomChosenColour);  -------> debugging
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level = level + 1;
    $("h1").text("level " + level);  
}

$("div[type='button']").on("click", function(event) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length -1); 
})

function playSound(name) {
    new Audio("sounds/"+name+ ".mp3").play();
}

function animatePress(currentColour) {
    console.log(currentColour);
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
      }, 100);
}


$(document).on("keypress", function() {
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("sucess");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); 
              }, 1000);
        }
    }
    else{
        playSound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        score = level -1;
        $("h1").text("Game Over, Your score is :" + score + ", Press Any Key to Restart");

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}