
		// Create object of the entire game
		

		var hangman = {

			// Array of Words 

			words: ["dog", "cat" , "bird", "cow", "pig", "bear", "fish", "lion", "zebra", "deer", "ant", "insect", "mammal", "reptile", "snake", "dolphin", "buffalo", "frog", "wolf", "fox", "eagle", "horse", "turtle", "elephant", "squarel"],

			// Variable the target the id playWord 
			wordPlace : document.querySelector("#playWord"),

			// Variable the target the id alreadyGuess
			alreadyGuessed : document.querySelector("#alreadyGuess"),

			// Variable that store the element that will goes in to wordPlace

			Gamecontainer: [],


			// Variable of Score
			wins: 0,

			// Variable of computerChoice that stores the random pice words
			computerChoice : "",
		
			// Variable of computerChoice thati split will b stores by letters
		
			split : "",
		
			// Vairaible of maximum Guesses
			MaxNumberOfGuess : 12,

			// variable of Number of Guess Remaining
			remainGuess: 12,

		
			
			

			// Function for the start up state
			
			Initialize: function(){


				// Create array named Gamecontainer, which will be use to store element showd in HTML for the picked word
				hangman.Gamecontainer = [];

				// Create array named alreadyGuess, which will be used to store all that user typed
				alreadyGuess = [];

				// Stored as computerChoice array picking random word from the array words
				hangman.computerChoice = hangman.words[Math.floor(Math.random() * hangman.words.length)];
				
				
				// Splitting the computerChoice of word into character
				hangman.split = hangman.computerChoice.split("");

				// At the start number of remaining guess is 12
				hangman.remainGuess = hangman.MaxNumberOfGuess;

				// Code to write the variable wordPlace on HTML
				hangman.wordPlace.innerHTML = "";

				// Code to write the variable alreadyGuess on HTML
				hangman.alreadyGuessed.innerHTML ="";

				console.log(hangman.computerChoice);
				console.log(hangman.split.length);

				console.log("start");
			},

			// Function for the start up and to restart the game
			ResetGame : function(){

				
						// Run this function

						hangman.Initialize();


						// in HTML write the remaining guess as remaingGuess

						document.querySelector("#remainGuess").innerHTML = hangman.remainGuess;

						// in HTML write the score as wins
						document.querySelector("#score").innerHTML = hangman.wins;

						//Loop for value of hangman.split
						for (var i = 0; i < hangman.computerChoice.length; i++) {

							
							// Object of properties for HTML display for 3 different state of user input
								// 1. Line: No right input 2. HiddenCharacter: letters of words 3. UserCharacter: user choice
					    hangman.Gamecontainer.push(
						{

					  		Line :" _ ",
					  		HiddenCharacter : hangman.split[i],
					  		UserCharacter : ""
					  	});

						

					    // Careat underscore for every letter in the choosen word at the very begiing of the game
					    hangman.wordPlace.innerHTML += hangman.Gamecontainer[i].Line;


					}


			},

			// Function to update the score

			UpdateWins : function(){

				hangman.wins += 1;
				document.querySelector("#score").innerHTML = (hangman.wins);

			},



			// Function to run event Handler for the user type
			EventHandler : function(event) {


				// EVERYTHING A USER ALREADY GUESSED WILL BE SHOWN WITHOUT REPEATING AS "ALREADY GUESSED LETTER" 
			
					// when a user typed a key, it is stored in userGuess
						
					var userGuess = String.fromCharCode(event.keyCode).toLowerCase();

					// store the position of userGuess in alreadyGuess array

					var guessIndex = alreadyGuess.indexOf(userGuess);

					
					// if what user typed is not found in the array, it will b add to the array and write in HTML
					if ( guessIndex == -1) {

								// Adding user input into alreadyGuess array
								alreadyGuess.push(userGuess);


								// Showing the alreadyGuess array in the HTML
								
								document.querySelector("#alreadyGuess").innerHTML += (userGuess + "\u00A0" + "\u00A0" + "\u00A0");   
					};

				// EVERY CORRECT GUESS WILL BE STORED IN AN OBJECT ARRAY AND SHOW UP IN THE SCREEN IN ITS PLACE OF THE UNDERSCORE

					// storing the position of userGuess in split in the Charindex variable
					var CharIndex = hangman.split.indexOf(userGuess);

					// if what user typed is found in the split, CORRECT GUESS, it will b add to the array and write in HTML
					if (CharIndex >= 0) {

							// write wordPlace Variable in HTML

							hangman.wordPlace.innerHTML = "";

							// Loop for the playing word, i specify index of each letter in the array
							for (var i = 0; i < hangman.Gamecontainer.length; i++) {


								// if the user input match any value (letter) of  HiddenCharactor (choosen word), the user input is store in UserCharacter
								if(hangman.Gamecontainer[i].HiddenCharacter == userGuess){

									hangman.Gamecontainer[i].UserCharacter = userGuess;
								}
							}

							// Creat variable of CorrectMatches in case of winning
							var CorrectMatches = 0;


							for (var i = 0; i < hangman.Gamecontainer.length; i++) {

								// If user input which is now store as UserCharacter is a match to the letter of chosen word in HiddenCharacter
								if(hangman.Gamecontainer[i].UserCharacter == hangman.Gamecontainer[i].HiddenCharacter){

									// , write that letter in on index i in the the HTML
									hangman.wordPlace.innerHTML += hangman.Gamecontainer[i].HiddenCharacter;

									
									// and add value of 1 to this variable, it represent the number of user input that match the word
									CorrectMatches += 1;

									console.log(CorrectMatches);

					// WHEN THE WHOLE WORD IS SUCESSFULLY GUESS, USER WINS, SCORE INCREASE BY 1 AND RESTART THE GAME WITH NEW WORD

									// if the value of CorrectMatches equal to the number of letter in a chosen word,

									if(CorrectMatches ==  hangman.Gamecontainer.length){

										// run this function to add score
										hangman.UpdateWins();
										// and run this function to reset the game
										hangman.ResetGame();

									}
								}
									// However, if the the input doesn't match, write underscore (Line) in place of each letter (i)
								 else {
										hangman.wordPlace.innerHTML += hangman.Gamecontainer[i].Line;
								 }
							 

							};

					}


				// FOR EVERY WRONG LETTER GUESSED, THE RENAIBG GUESS NUMBER WILL BE REDUCED BY 1 WITHOUT REPEATING FOR THE SAME CHARACTER

					// if what the user type was not found in split, WRONG GUESS, 
					else {

						// as long as user has the remaining guess left if what user typed is not found in the array, the remaingGuess value will be decrease by 1

						if((hangman.remainGuess > 0 ) && (guessIndex == -1)){

							document.querySelector("#remainGuess").innerHTML = (--hangman.remainGuess);
						}
						

					};

				// RESTART THE GAME WITH NEW WORD WHEN USER LOSE
					// if the remain guess is 0, user lost, the game will reset
				if (hangman.remainGuess < 1) {
					hangman.ResetGame();


				};
			
	  

				}




			}
			
			

		// GMAE STARTS, AND WORD IS PICKED

		// Start the game as the page load


		hangman.ResetGame();

			

		// Function User Guesing Begin when user press a key

		document.addEventListener('keyup', hangman.EventHandler);

