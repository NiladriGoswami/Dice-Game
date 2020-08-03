/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/




var score, roundScore, activePlayer, gamePlaying;

 init();

 //creating dice
 dice = Math.floor(Math.random()*6) +1; //to create random between 1 t0 6.
  

  /*document.querySelector('#current-' + activePlayer).textContent = dice; //setter, we use it to set a value.
  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>';

  var x = document.querySelector('#score-0').textContent; //getter, we use it to get a value.
  console.log(x); */



  //setting the event handler.
 /* function btn(){
    //do something here
  }
  btn();*/
  document.querySelector('.btn-roll').addEventListener('click', function(){
      if (gamePlaying){
        //1. Random number
    var dice = Math.floor(Math.random() * 6) +1; //need the variable dice only for this functions scope.

    //2. Display the result
    var diceDOM = document.querySelector('.dice');//storing the querySelector() in a var for reusability.
    diceDOM.style.display = 'block';//displaying the dice.
    diceDOM.src= 'dice-' + dice + '.png';//switching the image of dice in UI.


    //3. Update the round score If the rolled numbr was NOT a 1.
    if (dice !== 1) {
        //Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Next Player
        nextPlayer();
        }
    }
  });


  //Holding the score of players.
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
        //1. Add current score to global score.
    scores[activePlayer] += roundScore;
    //scores[activePlayer] = scores[activePlayer] + roundScore;
    
    //2. Update UI.
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //3. Check if player won the game or not.
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        //hide the dice and hide thwe player active.
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');//highlighting the active player as winner in UI if the player wins.
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');//removing the active class from the winner player.
        gamePlaying = false;
    } else {
        //Next Player
    nextPlayer();//if palyer doesn't win the game, then we want the next palyer to take the turn.
         }
    }  
});

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;//setting roundScore to 0.

        //after getting 1 in dice, setting scores back to zero.
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';

        //changing the background to show current palyers turn by adding and removing classes form html.

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

       /* document.querySelector('.player-0-pannel').classList.remove('active');
        document.querySelector('.player-1-pannel').classList.add('active');*/

        //When palyer switches, dice will be hidden, until the player click toroll's the dice.
        document.querySelector('.dice').style.display = 'none';
}

//Initializing the Game.
document.querySelector('.btn-new').addEventListener('click', init);

//Initializing function
function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;//Keep track of player that is currently playing.
    gamePlaying = true;//State variable initialization.
    //hidding the dice using the document object.
  document.querySelector('.dice').style.display = 'none';

  //resetting the scores.
  //selecting HTML element only by id using document.getElementById.
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  //removing all the winner and active classes form both the palyers after the game is over.
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  //adding the active class to player one for new start.
  document.querySelector('.player-0-panel').classList.add('active');
}

//Rules alert
var rulesShow = document.querySelector('#rules');
rulesShow.addEventListener('click', function() {
    swal({
        title: "Game Rules",
        text: "-   The game has 2 players, playing in rounds.\n"+
        "-   In each turn, a player rolls a dice as many times as he/she wishes. Each result get added to his ROUND score.\n"+
        "-   BUT, if the player rolls a '1', all his ROUND score gets lost. After that, it's the next player's turn.\n"+
        "-   The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn.\n"+
        "-   The first player to reach 100 points on GLOBAL score wins the game" ,
        //icon: "success",
        button: null,
      });
});