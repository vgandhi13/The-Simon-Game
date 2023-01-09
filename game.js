// import Math;
gameHasBegin = false
level = 0
userClickedPattern = []
gamePattern=[]
buttonColors = ["red", "blue", "green", "yellow"]
$(document).keypress(function() {
    if (gameHasBegin === false) {
        gameHasBegin=true
        nextSequence()
    }
    
})
$('.btn').click(function() {
    userChosenColour = $(this).attr("id")
    $("#"+userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length-1)
})
function nextSequence() {
    $("#level-title").text("Level "+level)
    level+=1
    randNo = Math.floor(Math.random() * 4) 
    randomChosenColour = buttonColors[randNo]
    gamePattern.push(randomChosenColour)
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour)
   
}
function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern=[]
          }
          
    }
    else {
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        },200)
        $("#level-title").text("Game Over, Press Any Key to Restart")
        setTimeout(function () {
            startOver()
        },200)
      }
}
function startOver() {
    gameHasBegin = false
    level = 0
    userClickedPattern = []
    gamePattern=[]
}