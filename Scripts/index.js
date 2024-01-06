function createJokeBox() {
    const url = 'https://official-joke-api.appspot.com/random_joke' 
    fetch(url)
    .then(response => response.json()) //Convert the response to JSON
    .then(json => {
        console.log(json)  //for debugging
        displayJokeBox(json) 
    })
    .catch(error => {
        console.error('Error fetching data: ', error)  //Handle errors
    }) 
}


function displayJokeBox(jokeData) {
   
    const jokeBox = document.getElementById('jokeBox') 
    
    const setup = document.createElement('div') //Online help, get someone to explain it: Why does it have to be div or p? when I make them jokeContent, it's incorrect
    setup.textContent = jokeData.setup  
    jokeBox.appendChild(setup)  

    
    const punchline = document.createElement('div') 
    punchline.textContent = jokeData.punchline  
    punchline.style.display = 'none'
    punchline.id = 'punchline'

    const guessInput = document.createElement('input') 
    guessInput.type = 'text' 
    guessInput.placeholder = 'Enter your guess here' 
    guessInput.id = 'guessInput' 

    const guessButton = document.createElement('button') 
    guessButton.textContent = 'Submit Guess' 
    guessButton.onclick = function() {
        const userGuess = document.getElementById('guessInput').value 
        if (userGuess.toLowerCase() === jokeData.punchline.toLowerCase()) {
            punchline.style.display = 'block'  //Show the punchline if the guess is correct
            guessButton.style.display = 'none' 
            guessInput.style.display = 'none' 
            alert('Correct!')  //ALERT STOPS THE WHOLE WEBSITE AND DISPLAYS A MESSAGE AT THE TOP
        } else {
            alert('Incorrect, try again!')  
        }
    } 

    //REVEAL
    const revealButton = document.createElement('button') 
    revealButton.textContent = 'Reveal' 
    revealButton.onclick = function() {
        punchline.style.display = 'block' 
        revealButton.style.display = 'none' 
        guessButton.style.display = 'none' 
        guessInput.style.display = 'none' 
    } 

    jokeBox.appendChild(guessInput) 
    jokeBox.appendChild(guessButton) 
    jokeBox.appendChild(revealButton) 
    jokeBox.appendChild(punchline)  
}


//Call createJokeBox when the window loads
window.onload = function() {
    createJokeBox()
}

//response will have tons of stuff besides the json array
//getting or posting new data you use fetch
//Fetch takes time so a process right after will happen before the fetch is finished so call .then