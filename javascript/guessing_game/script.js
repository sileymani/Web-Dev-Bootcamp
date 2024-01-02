let max = parseInt(prompt('Enter the maximum number'));
while(!max){
    max = pasteInt(prompt('Please enter a valid number:')); 
}

const random_num = Math.floor(Math.random() * max)+1;
let guessed_num = prompt("Go ahead, guess:");
let score = 1;


while (parseInt(guessed_num) !== random_num){
    score++;

    if (guessed_num < random_num){
        guessed_num = prompt('Nuh, too low.Try again:');
    }else if (guessed_num > random_num){
        guessed_num = prompt('Nuh, too high. Try again:');
    }

    if (guessed_num === 'q'){
        break;
    }
}

alert(`it took you ${score} guesses.`);
