// New version, old version is commented at the bottom


const playTo = document.querySelector('#select');
const resetButton = document.querySelector('#reset');
let winningScore = parseInt(playTo.value);

playTo.addEventListener('change', () => {
    winningScore = parseInt(playTo.value); // Ici on récupère le mode de jeu choisis
    reset(); // On reinitialise le jeu
})

const player1 = {
    score: 0,
    button: document.querySelector('#p1Bttn'),
    display: document.querySelector('#p1')
};

const player2 = {
    score: 0,
    button: document.querySelector('#p2Bttn'),
    display: document.querySelector('#p2')
}

function updateScores(player, opponent) {
    if (!playTo.value) {
        alert('Please choose the game mode.');
        return;
    }
    player.display.className = '';
    opponent.display.className = '';

    player.display.innerText = ++player.score;
    if (player.score === winningScore && opponent.score < winningScore - 1) {
        // Player wins
        player.display.classList.add('winner');
        opponent.display.classList.add('loser');
        player.button.disabled = true;
        opponent.button.disabled = true;
    } else if (player.score === winningScore - 1 && opponent.score === winningScore - 1) {
        // Mise à jour du gameMode pour l'écart de 2 points
        winningScore += 1;
    } else if (player.score === winningScore - 1) {
        // Balle de match pour le joueur
        player.display.classList.add('ecart');
    }
}

function reset() {
    winningScore = parseInt(playTo.value);
    for (let p of [player1, player2]) {
        p.display.innerText = '0';
        p.score = 0;
        p.button.disabled = false;
        p.display.className = '';
    }
}

player1.button.addEventListener('click', () => (updateScores(player1, player2)));
player2.button.addEventListener('click', () => (updateScores(player2, player1)));
resetButton.addEventListener('click', reset);



// Old version:

// const selectGameMode = document.querySelector('#select');
// const scoreP = document.querySelector('#score');
// const playerOneButton = document.querySelector('#p1Bttn');
// const playerTwoButton = document.querySelector('#p2Bttn');
// const resetButton = document.querySelector('#reset');
// const playerOne = document.querySelector('#p1');
// const playerTwo = document.querySelector('#p2');
// let scoreOne = 0;
// let scoreTwo = 0;
// let gameMode = 5;
// let winningScore = gameMode;

// selectGameMode.addEventListener('change', () => {
//     gameMode = parseInt(selectGameMode.value); // Ici on récupère le mode de jeu choisis
//     winningScore = gameMode;
//     reset(); // On reinitialise le jeu
// })

// playerOneButton.addEventListener('click', (e) => {
// if (!gameMode) {
//     alert('Please choose the game mode.');
//     return;
// }
// playerOne.className = '';
// playerTwo.className = '';

// playerOne.innerText = ++scoreOne;
// if (scoreOne === winningScore && scoreTwo < winningScore - 1) {
//     // Player 1 wins
//     playerOne.classList.add('winner');
//     playerTwo.classList.add('loser');
//     playerOneButton.disabled = true;
//     playerTwoButton.disabled = true;
// } else if (scoreOne === winningScore - 1 && scoreTwo === winningScore - 1) {
//     // Mise à jour du gameMode pour l'écart de 2 points
//     winningScore += 1;
// } else if (scoreOne === winningScore - 1) {
//     // Balle de match pour le joueur 1
//     playerOne.classList.add('ecart');
// }
// })

// playerTwoButton.addEventListener('click', (e) => {
//     if (!gameMode) {
//         alert('Please choose the game mode.');
//         return;
//     }
//     playerOne.className = '';
//     playerTwo.className = '';

//     playerTwo.innerText = ++scoreTwo;
//     if (scoreTwo === winningScore && scoreOne < winningScore - 1) {
//         // Player 2 wins
//         playerOne.classList.add('loser');
//         playerTwo.classList.add('winner');
//         playerOneButton.disabled = true;
//         playerTwoButton.disabled = true;
//     } else if (scoreOne === winningScore - 1 && scoreTwo === winningScore - 1) {
//         // Mise à jour pour l'écart de 2 points
//         winningScore += 1;
//     } else if (scoreTwo === winningScore - 1) {
//         // Balle de Match pour le joueur 2
//         playerTwo.classList.add('ecart')
//     } else {
//         playerOne.className = '';
//         playerTwo.className = '';
//     }
// })

// resetButton.addEventListener('click', reset)

// function reset() {
//     winningScore = gameMode;
//     // On remet la vue des scores à 0
//     playerOne.innerText = '0';
//     playerTwo.innerText = '0';
//     // On remet les variables score à 0
//     scoreOne = 0;
//     scoreTwo = 0;
//     // On réactive les buttons de score
//     playerOneButton.disabled = false;
//     playerTwoButton.disabled = false;
//     // On remet les couleurs à blanc
//     playerOne.className = '';
//     playerTwo.className = '';
// }