let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Elzero Web School`;

// Setting Game Options
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
const words = ["Create", "Update", "Delete", "Master", "Branch", "Mainly", "Elzero", "School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
//getHintButton.addEventListener("click", getHint);

function generateInput() {
    const inputsContainer = document.querySelector(".inputs");

    // Create Main Try Div
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.classList.add(`boxs`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if (i !== 1) tryDiv.classList.add("disabled-inputs");
        for (let j = 1; j <= numbersOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    }
    // Focus On First Input In First Try Element
    inputsContainer.children[0].children[1].focus();

    let inputsDisable = document.querySelectorAll(".disabled-inputs input");
    inputsDisable.forEach((e) => e.disabled = true);
    let input = document.querySelectorAll("input");
    input.forEach((e , i)=>{
        e.addEventListener('input' , function(){
            this.value = this.value.toUpperCase();
            let inputfocus = input[i + 1];
            if(inputfocus) inputfocus.focus();
        })
        e.addEventListener('keydown' , function(event){
            let currentInput = Array.from(input).indexOf(event.target);
            if(event.key === "ArrowRight"){
                const nextInput = currentInput + 1;
                if(nextInput < input.length) {
                    input[nextInput].focus();
                    //input[nextInput].value = ""
                }
            }
            if(event.key === "ArrowLeft"){
                const prevInput = currentInput - 1;
                if(prevInput >= 0) input[prevInput].focus() ;
                //input[prevInput].value = ""
            }
        })
    })
}

const btn_check = document.querySelector(".check");
//console.log(wordToGuess)

btn_check.addEventListener('click' , hintTranning);
let input = document.querySelectorAll("input");
function hintTranning(){
    let successFull = true;
    for (let index = 1; index <= numbersOfLetters; index++) {
        let inputField = document.querySelector(`#guess-${currentTry}-letter-${index}`);
        let letter = inputField.value.toLowerCase();
        let actualLetter = wordToGuess[index-1];

        if(inputField.value !== ''){
            if(letter === actualLetter){
                inputField.classList.add("yes-in-place");
            }
            else if(wordToGuess.includes(letter)){
                inputField.classList.add("not-in-place");
                successFull = false;
            }
            else{
                inputField.classList.add("no");
                successFull = false;
            }
        }
        else{
            inputField.classList.add("no");
            successFull = false;
        }
    }
    if(successFull){
        btn_check.disabled = true;
        messageArea.innerHTML = `${wordToGuess}<br> &#129392<p style = "color : red">Right The Word</p>`;
        document.querySelectorAll("input").forEach((e) => {
            setTimeout(() => {
                e.value = '';
                e.classList.remove("yes-in-place");
                e.classList.remove("not-in-place");
                e.classList.remove("no");
                btn_check.disabled = false;
                messageArea.innerHTML = '';
                currentTry = 1;
                document.querySelectorAll("input").forEach((e) => e.disabled = true);
                document.querySelectorAll(".boxs").forEach((e) => e.classList.add("disabled-inputs"));
                document.querySelectorAll(".boxs")[currentTry-1].classList.remove("disabled-inputs");
                Array.from(document.querySelectorAll(".boxs")[currentTry-1].children).forEach((e) => e.disabled = false);
                numberOfHints = 2;
                document.querySelector(".hint span").innerHTML = numberOfHints;
                document.querySelector(".hint").disabled = false;
            }, 1500);
        });
    }
    else{
        messageArea.innerHTML = `&#129324<p style = "color : red">Wrong The Word</p>`;
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        currentTry++;
        document.querySelectorAll(".disabled-inputs input").forEach((e) => e.disabled = true);
        let boxInputs = document.querySelector(`.try-${currentTry}`);
        boxInputs.classList.remove("disabled-inputs");
        Array.from(boxInputs.children).forEach((e) => e.disabled = false);
        boxInputs.children[1].focus();
    }
}

getHintButton.addEventListener('click' , getHint)
/* ============================================================================ */
function getHint(){
    numberOfHints--;
    if(numberOfHints > 0){
        document.querySelector(".hint span").innerHTML = numberOfHints;
    }
    else{
        document.querySelector(".hint span").innerHTML = numberOfHints;
        document.querySelector(".hint").disabled = true;
    }
}
/* ============================================================================ */
/* ============================= Generation Game ============================== */
/* ============================================================================ */

getHintButton.onclick = function(){
    let currentInputs = document.querySelectorAll('input:not([disabled])');
    //==== getEmptyInput ====
    if(currentInputs.length > 0){
        let EmptyInput = Array.from(currentInputs).filter((input) => input.value === "");
        let random_index = Math.floor(Math.random()*EmptyInput.length);
        /* if(random_index === Other_random){
            Other_random = random_index === EmptyInput.length-1? random_index-- : random_index++;
            random_index = Other_random;
        } */
        let randomInput = EmptyInput[random_index];
        let filled = Array.from(currentInputs).indexOf(randomInput);
        /* console.log(filled);
        console.log(wordToGuess[filled]) */
        //randomInput.focus();
        randomInput.value = wordToGuess[filled].toUpperCase();
    }
}

window.onload = function(){
    generateInput()
}