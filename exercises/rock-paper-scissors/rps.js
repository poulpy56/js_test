const scorePrinted = document.querySelector('.scorePrinted')

const moveResult = document.querySelector('.actualMove')

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  }

scorePrinted.innerHTML = `wins : ${score.wins} ; losses : ${score.losses} ; ties : ${score.ties}`

function pickComputerMove() {
  const randomNumber = Math.floor(Math.random()*3);
  if (randomNumber === 0) {return 'Rock'}
  if (randomNumber === 1) {return 'Paper'}
  else {return 'Scissors'}
}

function playGame(playerMove) {
  let result = '';
  const computerMove = pickComputerMove();
  if (playerMove === computerMove) {
    score.ties++
    result = 'Tie'
  }
  else if (playerMove === 'Rock') {
    if (computerMove === 'Paper') {
      score.losses++
      result = 'You lose'
    }
    else {
      score.wins++
      result = 'You win'
    }
  }
  else if (playerMove === 'Scissors') {
    if (computerMove === 'Paper') {
      score.wins++
      result = 'You win'
    }
    else {
      score.losses++
      result = 'You lose'
    }
  }
  else if (computerMove === 'Rock') {
    score.wins++
    result = 'You win'
  }
  else {
    score.losses++
    result = 'You lose'
  }
  localStorage.setItem('score', JSON.stringify(score))
  scorePrinted.innerHTML = `wins : ${score.wins} ; losses : ${score.losses} ; ties : ${score.ties}`
  moveResult.innerHTML = `<p>${result}</p>you <img class="pic" src="${playerMove}-emoji.png"> <img class="pic" src="${computerMove}-emoji.png"> computer`
  return result
}