// game variable
const min = 1
const max = 10
const winingNum = randomNumber(min, max)
let guessesLeft = 3

// UI Elements
const game = document.querySelector('#game')
const minNum = document.querySelector('.min-num')
const maxNum = document.querySelector('.max-num')
const guessBtn = document.querySelector('#guess-btn')
const guessInput = document.querySelector('#guess-input')
const message = document.querySelector('.message')

// Assign UI min and max
minNum.textContent = min
maxNum.textContent = max

// play again
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload()
    }
})

// Listen for guess 
guessBtn.addEventListener('click', function () {
    const guess = parseInt(guessInput.value)

    // validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } else {
        // check if win
        if (guess === winingNum) {
            gameOver(true, `${winingNum} is correct, YOU WIN`)
        } else {
            guessesLeft -= 1
            if (guessesLeft === 0) {
                gameOver(false, `Game Over. You Lost, the correct number is ${winingNum}`) 
            } else {
                // border color
                guessInput.style.borderColor = 'red'
                // clear input
                guessInput.value = '' 
                // set message 
                setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red')
            }
    }
    }

})  

// set message
function setMessage(msg, color) {
    message.style.color = color
    message.textContent = msg
}

// game over 
function gameOver(won, msg) {
    let color
    won === true ? color = 'green' : color = 'red'
    // Disable input
    guessInput.disabled = true 
    // text color
    message.style.color = color
    // border color
    guessInput.style.borderColor = color
    setMessage(msg)

    // play again
    guessBtn.value = 'Play again'
    guessBtn.className += 'play-again'
    
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) 
}