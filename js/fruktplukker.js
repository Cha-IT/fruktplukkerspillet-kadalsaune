const fruktArr = [];
let fruktId = 0;
let poeng = 0;

const main = document.querySelector("main")
const rect = main.getBoundingClientRect();
const infoScreen = document.createElement("div");
    infoScreen.style.position = "fixed";
    infoScreen.style.right = "0px";
    infoScreen.style.bottom = "0px";
    infoScreen.style.backgroundColor = "rgba(61, 98, 130, 0.498)";



function nyFrukt() 
{
    if(fruktArr.length < 10)
    {
        fruktArr.push(document.createElement("button"));
        //fruktArr[fruktArr.length-1].value = fruktArr.length - 1;
        fruktArr[fruktArr.length-1].id = fruktId;
        fruktId++;
        fruktArr[fruktArr.length-1].innerHTML = `🍎`; // Du kan endre dette til forskjellige frukt emojis
        fruktArr[fruktArr.length-1].style.backgroundColor = "transparent";
        fruktArr[fruktArr.length-1].style.border = "none";
        fruktArr[fruktArr.length-1].style.fontSize = "2em";
        fruktArr[fruktArr.length-1].style.position = "absolute";
        fruktArr[fruktArr.length-1].style.left = Math.random() * (rect.width) + 'px'; // Plasser frukten på en tilfeldig x-posisjon
        fruktArr[fruktArr.length-1].style.top = Math.random() * (rect.height) + 'px'; // Plasser frukten på en tilfeldig y-posisjon
        fruktArr[fruktArr.length-1].className = "animate__animated animate__zoomIn animate__fast"
        main.appendChild(fruktArr[fruktArr.length-1]);
        
        // Når frukten klikkes, fjern den fra skjermen
        fruktArr[fruktArr.length-1].addEventListener("click", fjernFrukt)

    }
    else
    {
        const gameOverScreen = document.createElement("div");
        gameOverScreen.innerHTML = `GAME OVER<br>Poeng: ${poeng}`;
        gameOverScreen.style.fontSize = "10vw";
        gameOverScreen.style.fontWeight = "bold";
        gameOverScreen.style.textAlign = "center";
        // const restartButton = document.createElement("button");
        // restartButton.className = "btn btn-primary"
        // restartButton.innerHTML = "Klikk her for å starte på nytt"
        // restartButton.addEventListener("click", () => {
        
        // main.removeChild(gameOverScreen);
        
    })

        main.appendChild(gameOverScreen);
        gameOverScreen.appendChild(restartButton);
        return;
    }
 
    

    setTimeout(() => {
        nyFrukt();
        infoScreen.innerHTML = "";

        for(let i = 0; i<fruktArr.length; i++)
        {
            infoScreen.innerHTML = 
            `Antall frukt: ${fruktArr.length}<br>
            Poeng: ${poeng}`;
        }

        





    }, 700);
    
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
        ,300
    )
    
    //e.target er det elementet som trigget hendelsen, det vil si elementet vi klikket på for å aktivere funksjonen.
    //delete fruktArr[e.target.value];
    infoScreen.innerHTML = 
            `Antall frukt: ${fruktArr.length}<br>
            Poeng: ${poeng}`;
    //const x = fruktArr.splice(e.target.value, 1)
    const i = fruktArr.indexOf(e.target.id)
    const x = fruktArr.splice(i, 1);
    console.log(x);
    poeng++;
}

function startGame(){
    

    main.appendChild(infoScreen);

    nyFrukt();
}

function newGame()
{
    const startScreen = document.createElement("div")
    startScreen.style.width = "50vw";
    startScreen.style.height = "70vh";
    startScreen.style.backgroundColor = "rgba(61, 98, 130, 0.7)"
    startScreen.style.padding = "10vw";
    startScreen.innerHTML = 
    `<h1>Fruktplukkerspillet</h1>
    <p>I fruktplukkerspillet skal du plukke epler fra et tre der eplene vokser alt for fort. Hvis treet får mer enn ti epler dør treet, og du taper spillet. Rekker du å plukke eplene fort nok?</p>`

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
