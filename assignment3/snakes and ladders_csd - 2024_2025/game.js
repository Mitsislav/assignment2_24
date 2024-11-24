function setPositions() {
	var positions=[];
	var snakePositions   =[13,38,46,73,81,87]
	var snakeNewPositions=[2,17,26,43,51,67]

	var ladderPositions   =[3,9,32,48,56,78]
	var ladderNewPositions=[4,28,72,59,86,89]
	
	var snakes_or_ladders_Positions   =[25,65,70]
	var snakes_or_ladders_NewPositions=["5 or 45","44 or 74","49 or 90"]


	for (var i = 1; i <=90 ; i++) {
	 	positions[i]=new Object();
		positions[i].from=i;
	 
	  
		if(snakePositions.indexOf(i)!=-1){
	   		positions[i].to=snakeNewPositions[snakePositions.indexOf(i)];
	   		positions[i].type="Snake";
	 	}
		else if(ladderPositions.indexOf(i)!=-1){
			positions[i].to=ladderNewPositions[ladderPositions.indexOf(i)];
			positions[i].type="Ladders";
		}
		else if(snakes_or_ladders_Positions.indexOf(i)!=-1){
			positions[i].to=snakes_or_ladders_NewPositions[snakes_or_ladders_Positions.indexOf(i)];
			positions[i].type="Snake or Ladders";
		}
		else if(i===16 || i===47 || i===68 || i===84){
			positions[i].to="Other Player position";
			positions[i].type="Sheep";   
		}
		else if(i===21 || i===40 || i===57 || i===75){
			positions[i].to="1 with "+(100-i)+"% possibility or 90 with "+i+" % possibility";
			positions[i].type="ALL IN";
	 	}
	 	else{
	   		positions[i].to=i;
			positions[i].type="Normal";   
	   
		}
	}
	return positions; 
}

var cells=setPositions();
for (var i = 1; i <=90 ; i++) {
	console.log("Cell: "+i+" type: "+cells[i].type+" From: "+cells[i].from+" To: "+cells[i].to)
}


/* my code */

let turn=0;	/* 0 for player 1 1 for player 2 */
let player1=0; /* position of player 1 */
let player2=0;	/* position of player 2 */

let rollingSound = new Audio('sounds/dice.mp3');	/* open the mp3 file for dice rolling and victory sound */
let winSound = new Audio('sounds/victory.mp3');
let startAnewGame=new Audio('sounds/pressed.mp3');

function newGame(){		/* starts a new game */
	startAnewGame.play();
	turn=0;
	player1=0;
	player2=0;

	document.getElementById("turnInfo").innerText = "Player Turn: Red";	/* starting with the first player (RED) */
	document.getElementById("new").style.display="none";	/* hide the new game button */
	document.getElementById("continue").style.display="block";	/* Appear the roll the dice button */
}

async function start(){
	let dice=Math.floor(Math.random() * 6 + 1);	/* a random number between 1-6 */
	//document.getElementById("diceResult").innerText = `Rolling...`;

	//await RollAnimation(dice);

	if(turn === 0){
		document.getElementById("turnInfo").innerText="Player Turn: Red";	/* update the info box (Red's turn) */
		//play(turn, dice);
	}else if(turn !== 0){
		document.getElementById("turnInfo").innerText="Player Turn: White";	/* update the info box (White's turn) */
		//play(turn, dice);
	}
	
	await RollAnimation(dice); /* wait rollanimation function to end to continue */
	play(dice);	/* update the new positions depends of the turn */

	console.log("Player 1 position: ", player1);	/* console printing */
	console.log("Player 2 position: ", player2);

}

function play(dice){
	if(getPlayerTurn() === 0){

		if(player1+dice>90){	/* player position is greater than 90 and we move him back */
			player1=player1+dice;
			player1=90-(player1-90);
		}else{
			player1=player1+dice;
		}

	}else if(getPlayerTurn() === 1){

		if(player2+dice>90){	
			player2=player2+dice;
			player2=90-(player2-90);
		}else{
			player2=player2+dice;
		}

	}

	positionHandler();	/* handling the positions */

	/* update gui , checks if somebody won and change the turn unless the dice is 6 */

	updateGUI();
	hasPlayerWon();
	if(dice!==6)
		changePlayerTurn();
}

function positionHandler(){
	
	if(getPlayerTurn()===0){	/* turn of red player */

		const cell = cells[player1];	/* takes the cell that corresponds to player position */
		
		if(cell.type=="Snake"){		/* checking the type and if its one of them move him based to cell.to */
			player1=cell.to;
		}else if(cell.type === "Ladders") {
			player1=cell.to
		}else if (cell.type === "Snake or Ladders") {
			let score = Math.floor(Math.random() * 11);
			if (score<=4) {
				player1 = parseInt(cell.to.split(" or ")[0]); 
			} else if(score>=5){
				player1 = parseInt(cell.to.split(" or ")[1]);
			}
		}else if (cell.type==="Sheep"){
			player1=player2;
		}else if (cell.type==="ALL IN") {
			if (confirm(`You have ${player1}% probability to take your Master and ${100-player1}% start from starting over.\n\nTry ALL IN?`)) {
				
				let random = Math.random() * 100;

				if(random<=player1){
					player1=90;
				}else{
					player1=1;
				}
			}
		}

	}else if(getPlayerTurn()===1){		/* turn of white player */

		const cell = cells[player2];	/* and do the same thing ...*/

		if(cell.type=="Snake"){
			player2=cell.to;
		}else if(cell.type === "Ladders") {
			player2=cell.to
		}else if (cell.type === "Snake or Ladders") {
			let score = Math.floor(Math.random() * 11);
			if (score<=4) {
				player2 = parseInt(cell.to.split(" or ")[0]); 
			} else if(score>=5){
				player2 = parseInt(cell.to.split(" or ")[1]);
			}
		}else if (cell.type==="Sheep"){
			player2=player1;
		}else if (cell.type==="ALL IN") {
			if (confirm(`You have ${player2}% probability to take your Master and ${100-player2}% start from starting over.\n\nTry ALL IN?`)) {
				
				let random = Math.random() * 100;

				if(random<=player2){
					player2=90;
				}else{
					player2=1;
				}
			}
		}
	}

	return;
}

function changePlayerTurn(){ /* change the turn */
	if(turn === 0){
		turn = 1;
	}else if(turn === 1){
		turn = 0;
	}
	return;
}

function getPlayerTurn(){ return turn; } /* returns player's turn */

function hasPlayerWon(){	/* checks if somebody win */
	if(player1 === 90){
		winSound.play();
		alert("Red Won!");
		location.reload() 
	}
	if(player2 === 90){
		winSound.play();
		alert("White Won!");
		location.reload() 
	}
}

function updateGUI() {
    
    for (let i = 1; i <= 90; i++) {/* all the squeres goes to default */
        document.getElementById("position" + i).innerHTML ="<img  src='images/"+i+".png'  height=70 width=80></div>";
    }
	/* add pawns to the board table indipents to the pawns position */
    if (player1 > 0 && player1 === player2) {
		document.getElementById("position"+player1).innerHTML="<img  src='imagesBoth/"+player1+".png'  height=70 width=80></div>";		

    } else {
        
        if (player1 > 0) {
            document.getElementById("position"+player1).innerHTML="<img  src='imagesRed/"+player1+".png'  height=70 width=80></div>";	
		}

        if (player2 > 0) {
            document.getElementById("position"+player2).innerHTML="<img  src='imagesWhite/"+player2+".png'  height=70 width=80></div>";	
        }
    }
}

function RollAnimation(finalDiceRoll) { /* roll the dice animation */
    return new Promise((resolve) => {
	let count = 0;
    let diceImages = ['ImagesDice/1.png', 'ImagesDice/2.png', 'ImagesDice/3.png', 'ImagesDice/4.png', 'ImagesDice/5.png', 'ImagesDice/6.png'];
    let diceResult = document.getElementById("diceResult");

    
    let interval = setInterval(function () {
        let randomIndex = Math.floor(Math.random() * diceImages.length);
        diceResult.innerHTML = `<img style="display: block; margin-left: auto; margin-right: auto;" src="${diceImages[randomIndex]}" height="70" width="80">`;
		
        count++;
        if (count >= 10) { 
            clearInterval(interval);
            diceResult.innerHTML = `<img style="display: block; margin-left: auto; margin-right: auto;" src="ImagesDice/${finalDiceRoll}.png" height="70" width="80">`; 
            
			setTimeout(() => {
				rollingSound.play();
                resolve();
            }, 300); 
        }
		
    }, 50); 
	})
}

