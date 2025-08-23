//============================================================================== I. DECLARATION OF ALL FUNCTIONS (AND VARIABLES) / INITIALIZING SCRIPT ==============================================================================

// function preparingGame () {} - Initialization function replaces and includes what follows.


const secretWordsA = ["ENCAPSULATION", "POLYMORPHISM", "ABSTRACTION", "INHERITANCE", "COMPOSITION"];                      // 1. Creation of a list of 5 words to guess.        
  
let chosenWordA = chooseWord(secretWordsA);                      // 2. Calling the function to choose random word from list.
  
let hiddenChosenWordA = createHiddenWord(chosenWordA);                      // 3. Calling the function to create a representation of the chosen word, with hidden letters as underscores. (A)

let lives = 6;                      // 4. Determination of the amount of lives / attempts allowed. (N)
   
let inputLettersA = [];                    // 5. Creation of an empty array containing the input letters already inputted by the player. (A)


function chooseWord(secretA)
{
   let chosenWordIndex = (Math.floor(Math.random() * (secretA.length)));                    // 6. Random choice of a word's index from the list.      
   
   let secretW = secretA[chosenWordIndex];                    // 7. Capturing of the chosen word into a variable. (S)                    
   
   return secretW
}

function createHiddenWord(secretW)                   
{
   let hidden = [];                    // 8. Creation of a representation of the chosen word, with hidden letters as underscores. (A)

      for(let i = 0; i < secretW.length; i++)     
   {

     hidden.push("_");                                       
   
   } return hidden
} 

function displayGameState(hidden, lives, input)
   { 
     console.log(`Word to guess: 

     - ${hidden.join(' ')} 


     - You are ${lives} step(s) closer to death! 


     - Letters already tried: ${input}`);
}

function isNotLetter(input)
{ let letter = input.charCodeAt(0) > 64 && input.charCodeAt(0) < 91;
 
 if(!letter)
 
 return true
} 

function checkLetter(input, secret, hidden, inputList) 
{
   let found = false;
   for(let i = 0; i < secret.length; i++)  
   {
      if(secret[i] === input)
      {
         found = true;
         hidden[i] = secret[i] // or input
      }
   }
 
   if (!found) 
   {   
      let alreadyTried = false;

      if (!inputList.includes(input))           // voir si ce "if" est utile ou s'exécute ever?
      {
         alreadyTried = true;
         inputList.push(input);
      } 
      else 
      {
         lives--;       
         console.log(`Nope. Be careful... She's coming for ya.
                                                                                  
         You'd better think twice on your next try, huh?`);
      }
   }
}

 
function checkVictory(lives)
{ 
   if(lives > 0) 
   {
      return `C0ngr4tZ! You found the word (${chosenWordA}) AND are still alive!`;
   } 
   console.log(`G4m3 0v4... 
      U = dead. 

      The word was: ${chosenWordA}. 

      But who's gonna care now, hm?`); // undefined
}

//============================================================================== II. MAIN GAME LOOP ==============================================================================================================

while(lives > 0 && hiddenChosenWordA.indexOf('_') !== -1)                    // 1. Creation of a loop for the game. While the player still has lives, and the word is not found, the game keeps going.                                                        
{ 
   displayGameState(hiddenChosenWordA, lives, inputLettersA);                    // 2. Calling the function to display the state of the game.

   let inputLetterPrompt = prompt("Let's try a letter:");                // 3. Asking the player to input a letter.    

   if(inputLetterPrompt === null)                // 4. If the player clicks "cancel", showing him a message and ending the game. !!! [Bug: sometimes does not appear at later stages]
   { 
      alert("Bye, quitter!");
      break;
   }

   inputLetterPrompt = inputLetterPrompt.toUpperCase().trim();                // 5. Asking the player to input a letter.

   let checkInputLetter = isNotLetter(inputLetterPrompt);              // 6. Calling the function to check if the input is not a letter, and if not, ask again.   
                  
   while(!isNaN(inputLetterPrompt) || checkInputLetter || inputLetterPrompt.length !== 1)                // 7. Checking if the input is a valid letter [not an empty string, a number, or another ASCII character];
   { 
      inputLetterPrompt = prompt("ONE letter ONLY - from the English alphabet. You can do this :] Go:").toUpperCase().trim();                // 8. Capturing the input letter.   
      checkInputLetter = isNotLetter(inputLetterPrompt);                     //  9. Calling a function to check again if input is a valid letter.
   }

   if(inputLettersA.includes(inputLetterPrompt))                                            // 10. If letter has already been inputted, inform the player. 
   {
      console.log (`FOCUS, pal! You've already tried the letter ${inputLetterPrompt}...`);   
   } 
   else 
   {
      inputLettersA.push(inputLetterPrompt);                                  // 11.If it's a new letter, adding the new letter to the letters already tried.
      checkLetter(inputLetterPrompt, chosenWordA, hiddenChosenWordA, inputLettersA);
   }
}

//========================================================================== III. END OF THE GAME ==============================================================================================================

let endGame = checkVictory(lives);                // 1. Verifying if player loses or wins.

console.log(endGame);                // 2. Informing the player.   !!!!! [Bug: returns undefined (other solution after the 'return')] ?



