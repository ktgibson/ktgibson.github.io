function init(){
    //set init vars
    let guessArr = [];
    let randomNumber = Math.floor(Math.random() * 51);
    let triesRemaining = 10;

    //get page elements
    let userInput = document.getElementById("userInput");
    let guessArea = document.getElementById("guessArea");
    let title = document.getElementById("title");
    let guessBtn = document.getElementById("guessBtn");
    let triesLeft = document.getElementById("triesLeft");
    let highLow = document.getElementById("highLow");

    //reset user input field on reload
    resetUserInputField();

    //Run function `numberGen` when guess button is clicked
    guessBtn.onclick = function() {numberGen()};

    // Main function
    function numberGen(){
            if(userInput.value >= 0 && userInput.value <= 50 && userInput.value != ''){
                if(userInput.value != randomNumber){
                    if(!guessArr.includes(userInput.value)){
                        if(guessArr.length < 9){
                            guessArr.push(userInput.value);
                            guessArea.innerText = guessArr;
                            triesRemaining -= 1;
                            triesLeft.innerText = String(triesRemaining);
                            title.innerText = ("Guess the Number between 1 & 50");
                            highOrLow();
                            resetUserInputField();
                            colorChange();
                    } else{
                            createResetButton();
                            guessArr.push(userInput.value);
                            guessArea.innerText = guessArr;
                            title.innerText = (`Stupid human.. The number was ${randomNumber}`);
                            title.style.color = "red";
                            triesLeft.innerText = "0";
                            userInput.value = '';
                            userInput.setAttribute("placeholder", "You're a failure...");
                            guessBtn.disabled = true;
                    }
                    }else{
                        title.innerText = "NO DUPLICATES!";
                        resetUserInputField();
                    }
                }else{
                    createResetButton();
                    title.innerText = (`You beat me, human... ${randomNumber} was the correct number.`);
                    guessBtn.disabled = true;
                    title.style.color = "forestgreen"; 
                    highLow.innerText = "WINNER!";
                    highLow.style.color = "forestgreen";
                    highLow.style.fontSize = "3em";
                }
            }else{
                title.innerText = ("ERROR: INVALID NUMBER");
                resetUserInputField();
            }
    } 

    // Give high or low hints on guess
    function highOrLow(){
        let diff = Math.abs(parseInt(userInput.value) - randomNumber);

        if(userInput.value < randomNumber){
            highLow.innerText = ("Too low!");
        }else if(diff <= 3){
            highLow.innerText = ("You're so close!");
        }else{
            highLow.innerText = ("Too high!");
        }
    }

    // Create the reset button and append to btnContainer
    function createResetButton(){
        var resetBtn = document.createElement("button");
        document.getElementById("btnContainer").append(resetBtn);
        resetBtn.innerHTML = "Try Again";
        resetBtn.setAttribute("id","resetBtn");
        resetBtn.setAttribute("class","nes-btn is-error")
        resetBtn.setAttribute("onClick", "resetGame()");
    }

    // Reset user input field
    function resetUserInputField(){
        userInput.value='';
        userInput.setAttribute("placeholder", "Enter your guess..")
        userInput.focus();
    }

    //Handle color change on tries remaining
    function colorChange(){
        if(triesRemaining > 3 && triesRemaining <= 6){
            triesLeft.style.color = "yellow";
        }else if(triesRemaining <= 3){
            triesLeft.style.color = "red";
        }
    }
}

// Reload page on button press
function resetGame(){
    window.location.reload();
}

window.addEventListener('load', init);