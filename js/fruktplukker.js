/* Deklarerer variabler som brukes i hele spillet 
 (som må fungere på tvers av funksjoner) */
const fruktArr = [];
let fruktId = 0;
let poeng = 0;
let missedFrukt = 0;
let gameOver = false;

/* Henter main-elementet på nettsida.
Alle elementer i spillet skal ligge inne main elementet (barn av main-elementet) */
const main = document.querySelector("main")
//Finner rektangelet til main-elementet, som gjør det lettere å finne nøyaktig høyde og bredde senere
const rect = main.getBoundingClientRect();

//Oppretter infoScreen-elementet, som skal vise info om poeng og antall frukt som en liten boks nederst til høyre 
const infoScreen = document.createElement("div");
    infoScreen.style.position = "fixed";
    infoScreen.style.right = "0px";
    infoScreen.style.bottom = "0px";
    infoScreen.style.backgroundColor = "rgba(61, 98, 130, 0.498)";



function tegnFrukt() 
{
    fruktArr.push(document.createElement("button"));
    //fruktArr[fruktArr.length-1].value = fruktArr.length - 1;
    fruktArr[fruktArr.length-1].id = fruktId;
    fruktId++;
    fruktArr[fruktArr.length-1].innerHTML = `🍎`; // Du kan endre dette til forskjellige frukt emojis
    fruktArr[fruktArr.length-1].style.backgroundColor = "transparent";
    fruktArr[fruktArr.length-1].style.border = "none";
    fruktArr[fruktArr.length-1].style.fontSize = "3em";
    fruktArr[fruktArr.length-1].style.position = "absolute";
    fruktArr[fruktArr.length-1].style.left = Math.random() * (rect.width) + 'px'; // Plasser frukten på en tilfeldig x-posisjon
    //fruktArr[fruktArr.length-1].style.top = -15 + 'vh'; // Plasser frukten på en tilfeldig y-posisjon
    fruktArr[fruktArr.length-1].style.animation = `drop ${Math.floor(Math.random() * 5) + 2}s ease-in 0s 1 normal forwards`
    fruktArr[fruktArr.length-1].style.cursor = `inherit`
    
    main.appendChild(fruktArr[fruktArr.length-1]);
    
    // Når frukten klikkes, fjern den fra skjermen
    fruktArr[fruktArr.length-1].addEventListener("click", fjernFrukt);
    fruktArr[fruktArr.length-1].addEventListener("mouseover", fjernFrukt);
}
 
    

    
    


/* Legg merke til bokstaven e inne i parentesen på linja under. 
Dette betyr at vi sender informasjon om hendelsen (event) som trigget funksjonen inn i funksjonen. e kalles hendelses-objektet */
function fjernFrukt(e)
{
    e.target.className = "animate__animated animate__zoomOut"
    setTimeout(
        () => {
            main.removeChild(e.target); 
        }
        ,200
    )
    
    //e.target er det elementet som trigget hendelsen, det vil si elementet vi klikket på for å aktivere funksjonen.
    //delete fruktArr[e.target.value];
    // infoScreen.innerHTML = 
    //         `Mistet frukt: ${missedFrukt}<br>
    //         Poeng: ${poeng}`;
    //const x = fruktArr.splice(e.target.value, 1)
    const i = fruktArr.indexOf(e.target)
    const x = fruktArr.splice(i, 1);
    console.log(x);
    poeng++;
}

function endGame()
{
    gameOver = true;
    const gameOverScreen = document.createElement("div");
    gameOverScreen.innerHTML = `GAME OVER<br>Poeng: ${poeng}<br>`;
    gameOverScreen.style.fontSize = "10vw";
    gameOverScreen.style.fontWeight = "bold";
    gameOverScreen.style.textAlign = "center";
    const restartButton = document.createElement("button");
    restartButton.className = "btn btn-primary"
    restartButton.innerHTML = "Klikk her for å starte på nytt"
    
    restartButton.addEventListener("click", () => {

        main.removeChild(gameOverScreen);
        for(const frukt of fruktArr){
            main.removeChild(frukt);
        }

        newGame()   
    })

    main.appendChild(gameOverScreen);
    gameOverScreen.appendChild(restartButton);
}


function startGame(){

    fruktArr.length = 0;
    fruktId = 0;
    poeng = 0;
    missedFrukt = 0;
    gameOver = false;

    main.style.cursor = "url(https://ani.cursors-4u.net/games/gam-16/gam1537.cur), auto";

    

    main.appendChild(infoScreen);

    const gameLoop = setInterval(() => {
        
        if(gameOver)
        {
            clearInterval(gameLoop);
        }
        else
        {
            tegnFrukt();

            const fruktToRemove = [];

            // Fjerner frukt som faller utenfor skjermen fra dokumentet
            for(const frukt of fruktArr) 
            {
                const frect = frukt.getBoundingClientRect();
                console.log(frect.bottom, rect.bottom)
                if(frect.bottom > rect.bottom){
                    
                    fruktToRemove.push(frukt);
                    main.removeChild(frukt);
                    missedFrukt++;
                    
                }
                infoScreen.innerHTML = 
                `Mistet frukt: ${missedFrukt}<br>
                Poeng: ${poeng}`;

            }

            // Fjerner frukt fra arrayen fruktArr
            for(const frukt of fruktToRemove)
            {
                const i = fruktArr.indexOf(frukt)
                const x = fruktArr.splice(i, 1);
            }

            if(missedFrukt > 10)
            {
                endGame();
            }



            
            
        }

    }, 700);
}

function newGame()
{
    
    
    const startScreen = document.createElement("div")
    startScreen.style.width = "50vw";
    startScreen.style.height = "70vh";
    startScreen.style.backgroundColor = "rgba(61, 98, 130, 0.7)"
    startScreen.style.padding = "10vw";
    startScreen.innerHTML = 
    `<h1>Fang frukten!</h1>
    <p>I <strong>Fang frukten</strong> skal du fange epler fra et tre der eplene faller ned hele tiden. Hvis mer enn ti epler faller ned, taper du spillet. Rekker du å fange eplene fort nok?</p>`

    const startButton = document.createElement("button");
    startButton.className = "btn btn-primary"
    startButton.innerHTML = "Klikk her for å spille"
    startButton.addEventListener("click", () => {
        startGame();
        main.removeChild(startScreen);
    })

    main.appendChild(startScreen);
    startScreen.appendChild(startButton);
    

    

}
newGame()
