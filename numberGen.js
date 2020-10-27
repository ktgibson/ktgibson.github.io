function init(){
    //set init vars
    let guessArr = [];
    let rando = Math.floor(Math.random() * 51);
    let triesRemaining = 10;

    //get page elements
    let userInput = document.getElementById("userInput");
    let guessArea = document.getElementById("guessArea");
    let title = document.getElementById("title");
    let guessBtn = document.getElementById("guessBtn");
    let triesLeft = document.getElementById("triesLeft");

    //when submit button is clicked
    guessBtn.onclick = function() {numberGen()};

    function numberGen(){
        if(guessArr.length < 9){ // if length of guesses array is < 10
            if(userInput.value >= 0 && userInput.value <= 50){ //if the input is within range
                if(userInput.value != rando){ // if the number was not just guesses
                    if(!guessArr.includes(userInput.value)){ //check if array has duplicate value
                        guessArr.push(userInput.value); // add user input to array
                        guessArea.innerText = guessArr; //print whole array on text area
                        title.innerText = "Guess the Number between 1 & 50"; //reset the title
                        triesRemaining -= 1; //subtract 1 from triesRemaining
                        triesLeft.innerText = String(triesRemaining);//set tries remaining
                        userInput.value = ""; //reset userinput
                        userInput.focus(); //focus textbox
                        colorChange(); //change color based on tried left
                    } else{
                        title.innerText = "NO DUPLICATES!"; //throw error if duplicate number
                    }
                }else{
                    createResetButton();
                    guessBtn.className = "nes-btn is-disabled";
                    guessBtn.disabled = true;
                    title.innerText = (`You beat me, human... ${rando} was the correct number.`); //win!
                    triesLeft.innerText = "WINNER"; //set triesleft text to winner!
                    title.style.color = "#89C171"; //change color
                    triesLeft.style.color = "#89C171";
                }
            }else{
                title.innerText = ("ERROR: INVALID NUMBER"); //enter number in range
            }
        }else{
            createResetButton();
            guessArr.push(userInput.value); //push last guess
            guessArea.innerText = guessArr; //set last guess to area text
            title.innerText = (`Stupid human.. The number was ${rando}`); //notify player of the number
            title.style.color = "red";
            triesLeft.innerText = "0"; //set tries to 0
            userInput.value = '';
            userInput.setAttribute("placeholder", "You're a failure...");
            guessBtn.className = "nes-btn is-disabled";
            guessBtn.disabled = true;
        }
    }

    function createResetButton(){
        var resetBtn = document.createElement("button"); //create element button
        document.getElementById("btnContainer").append(resetBtn); //append button to the btn container
        resetBtn.innerHTML = "Try Again"; //set button text to 'try again'
        resetBtn.setAttribute("id","resetBtn"); //set attribute id to "reesetBtn"
        resetBtn.setAttribute("class","nes-btn is-error")
        resetBtn.setAttribute("onClick", "resetGame()"); //Set attribute 'onClick' to run function resetGame()
    }

    function colorChange(){
        if(triesRemaining > 3 && triesRemaining <= 6){
            triesLeft.style.color = "yellow";
        }else if(triesRemaining <= 3){
            triesLeft.style.color = "red";
        }
    }
}

function resetGame(){
    window.location.reload(); //reload page on button press
}

window.addEventListener('load', init);
