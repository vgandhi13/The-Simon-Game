// import Math;
var closeModalBtn = document.getElementById('closeModalBtn');
var modalContainer = document.getElementById('modalContainer');

modalContainer.style.display = 'block';
document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open








gameHasBegin = false
level = 0
userClickedPattern = []
gamePattern=[]
buttonColors = ["red", "blue", "green", "yellow"]

closeModalBtn.addEventListener('click', function() {
    modalContainer.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
    if (gameHasBegin === false) {
      gameHasBegin=true
      nextSequence()
  }
  });

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
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
      
        var gameOverText = $("<h6>").text("Game Over, Press \"Go Again\" to Restart").addClass("game-over-text");
        var restartButton = document.createElement("button");
        
        restartButton.textContent = "Go Again";
        restartButton.classList.add("go-again"); // Adding a class to the button
        restartButton.addEventListener("click", function () {
          startOver();
          restartButton.parentNode.removeChild(restartButton);
          gameOverText.remove();
        });
      
        var container = document.createElement("div");
        container.appendChild(gameOverText[0]);
        container.appendChild(restartButton);
        
        $("#level-title").empty().append(container);
      }
}
function startOver() {
    gameHasBegin = false
    level = 0
    userClickedPattern = []
    gamePattern=[]
    nextSequence()
}