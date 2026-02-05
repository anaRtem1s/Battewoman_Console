const goodGame = () => 
{   
   // =================== VARIABLES  ===================

    const secretWordsA = ["ENCAPSULATION", "POLYMORPHISM", "ABSTRACTION", "INHERITANCE", "COMPOSITION"]; // 1. Creation of a list of 5 words for the player to guess.       
  
    let chosenWordA = chooseWord(secretWordsA); // 2. Calling of the function choosing a random word from the list.
  
    let hiddenChosenWordA = createHiddenWord(chosenWordA); // 3. Calling of the function creating a representation of the chosen word, with hidden letters as underscores.

    let lives = 6; // 4. Determination of the amount of lives / attempts allowed.
   
    let inputLettersA = []; // 5. Creation of an empty array containing the letters already tried by the player. 

    let inputLetterPrompt;

    // =================== FUNCTIONS  ===================

    function chooseWord(secretA) // 6. Creation of a function picking a word from the list.
    {
        let chosenWordIndex = (Math.floor(Math.random() * (secretA.length))); // 6.1. Random choice of a word from the list.      
   
        let secretW = secretA[chosenWordIndex]; // 6.2. Capture of the chosen word into a variable.                   
   
        return secretW
    }

    function createHiddenWord(secretW)  // 7. Creation of a function representing the chosen word, with hidden letters as underscores.                 
    {
      let hidden = [];                   

         for(let i = 0; i < secretW.length; i++)     
            {

               hidden.push("_");                                       
   
            } 
      return hidden
    } 

    function displayGameState(hidden, lives, input) // 8. Creation of a function displaying the current state of the game to the player.
    { 
     console.log(`Word to guess: 

     - ${hidden.join(' ')} 


     - You are ${lives} step(s) closer to death! 


     - Letters already tried: ${input}`);
    }

    function isLetter(input) // 9. Creation of a function verifying that the player entered indeed a letter.
    { 
      let letter = input.charCodeAt(0) > 64 && input.charCodeAt(0) < 91;
 
      return letter;
    } 


    function checkLetter(input, secret, hidden, inputList) // 10. Creation of a function verifying that the letter entered matches a letter in the word. 
    {
      let found = false;

      for(let i = 0; i < secret.length; i++)  
      {
         if(secret[i] === input)
         {
            found = true;
            hidden[i] = secret[i]; 
         }
      }
 
      if (!found) 
      {   
         if (inputList.includes(input))           
         {
            lives--;       

            console.log(`Nope. Be careful... She's coming for ya.
                                                                                    
                        You'd better think twice on your next try, huh?`);

         } else 
         {
            inputList.push(input);
         }
      }
    }

   // =================== MAIN GAME LOOP  ===================

    const mainGameLoop = () => 
    { 
        while(lives > 0 && hiddenChosenWordA.indexOf('_') !== -1) // 1. Creation of a loop for the game: While the player still has lives - and the word is not found - the game keeps going.                                                        
        { 
            displayGameState(hiddenChosenWordA, lives, inputLettersA); // 2. Calling the function to display the state of the game.

            inputLetterPrompt = prompt("Let's try a letter:"); // 3. Asking the player to enter a letter.    

                if(inputLetterPrompt === null) // 4. If the player clicks "cancel", showing him a message and exit the game. 

                {    
                     alert("Bye, quitter!");
                     break;
                    
                }

         inputLetterPrompt = inputLetterPrompt.toUpperCase().trim(); // 5. Asking the player to enter a letter.

         let checkInputLetter = !isLetter(inputLetterPrompt); // 6. Calling the function to check if the input is not a letter, and if not, ask again.   

                
            while(!isNaN(inputLetterPrompt) || checkInputLetter || inputLetterPrompt.length !== 1) // 7. Checking if the input is a valid letter (not a number, an empty string, or another ASCII character)..
            {  
               inputLetterPrompt = prompt("ONE letter ONLY - from the English alphabet. You can do this :] Go:"); // 8. Capturing the input.   

               if(inputLetterPrompt === null)
               {
                  alert("Bye, quitter!"); // 9. If the player clicks "cancel", showing him a message and exit the game.
                  return;                         
               
               } else 
               {
                  inputLetterPrompt = inputLetterPrompt.toUpperCase().trim();

                  checkInputLetter = !isLetter(inputLetterPrompt); //  10. Calling the function checking again if the input is a valid letter.
               }
            }
            
            if(inputLettersA.includes(inputLetterPrompt)) // 11. If the letter has already been entered, informing the player. 
            {
               console.log (`FOCUS, pal! You've already tried the letter ${inputLetterPrompt}...`); 

            } else 
            {
               inputLettersA.push(inputLetterPrompt); // 12.If it's a new letter, adding the new letter to the letters already tried.

               checkLetter(inputLetterPrompt, chosenWordA, hiddenChosenWordA, inputLettersA); // 12. Calling the function verifying that the letter entered matches a letter in the word.
            } 
         } 
   }


mainGameLoop(); // 13. Starting the game.

   // =================== ENDING GAME  ===================

   const endingGame = () => // 14. Creation of an arrow function ending the game.
   {  
      if (inputLetterPrompt === null) // 15. If the player clicks "cancel", exit the game.
      {
         
         return;

      }

      function checkVictory(lives) // 16. Creation of a function verifying if the player won or lost the game.
      { 
         if(lives > 0) 
         {
               displayGameState(hiddenChosenWordA, lives, inputLettersA); // 16. Calling the function to display the state of the game.

               console.log ( `C0ngr4tZ! You found the word (${chosenWordA}) AND are still alive - Lives left: ${lives}!`);

         } else 
         {
               console.log(`G4m3 0v4... 
      
                           U = dead. 

                           The word was: ${chosenWordA}. 

                           But who's gonna care now, hm?`); 
         }
      }
      
      checkVictory(lives); // 17. Calling the function verifying if the player won or lost the game.
    }

   endingGame(); // 18. Calling the function ending the game.}
};

goodGame(); // Launching the game.