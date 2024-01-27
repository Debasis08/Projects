// 'use strict';

let secretNumber = Math.trunc(Math.random()*20 + 1);
let score = 20;
let highscore = 0;

const displayMessage = function(message) {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener
('click', ()=>{
    const guess = Number(document.querySelector('.guess').value);

    if(!guess) {
        displayMessage('No Number!');

    // when player wins
    } else if (guess === secretNumber) {
        displayMessage('🏆 Correct Guess!');

        document.querySelector('.number').textContent = secretNumber;

        document.querySelector('body').style.backgroundColor = '#60b347';

        document.querySelector('.number').style.width = '30rem';

        if (score >highscore) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }

    } else if (guess !== secretNumber) {    
        if (score > 1) {
            displayMessage(guess > secretNumber ? 'Too HIGH !!' : 'Too LOW !!');
            score--;
            document.querySelector('.score').textContent = score;
        }else {
            displayMessage('💥 You Lost the Game !');
            document.querySelector('.score').textContent = 0;
        }
    }
    //  when the guess is too high
    //  else if (guess > secretNumber) {
    //     if (score > 1) {
    //     document.querySelector('.message').textContent = 'Too HIGH !!';
    //     score--;
    //     document.querySelector('.score').textContent = score;
    //     }else {
    //         document.querySelector('.message').textContent = '💥 You Lost the Game !';
    //         document.querySelector('.score').textContent = 0;
    //     }

    //  when the guess is too low
    // } else if (guess < secretNumber) {
    //     if (score > 1) {
    //         document.querySelector('.message').textContent = 'Too LOW !!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //     }else {
    //         document.querySelector('.message').textContent = '💥 You Lost the Game !';
    //         document.querySelector('.score').textContent = 0;
    //     }
    // }
});


document.querySelector('.again').addEventListener
('click', function() {
    score = 20;
    secretNumber = Math.trunc(Math.random()*20 + 1);

    displayMessage('Start Guessing...');
    document.querySelector('.score').textContent = score;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = ' ';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
})