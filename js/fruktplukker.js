/* 
Deklarerer variabler som brukes i hele spillet 
 (som må fungere på tvers av funksjoner) 
*/
const fruktArr = [];
let fruktId = 0;
let poeng = 0;
let missedFrukt = 0;
let gameOver = false;

/* 
Henter main-elementet på nettsida.
Alle elementer i spillet skal ligge inne main elementet (barn av main-elementet) 
*/
const main = document.querySelector("main")
/* 
Finner info om størrelsen og plasseringen til main-elementet, som gjør det lettere å finne nøyaktig høyde og bredde senere.
Les mer om getBoundingClientRect()-metoden her:  https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
*/
const rect = main.getBoundingClientRect();

/*
Oppretter infoScreen-elementet, som skal vise info om poeng og antall frukt som en liten boks nederst til høyre. 
*/
const infoScreen = document.createElement("div");
    infoScreen.style.position = "fixed";
    infoScreen.style.right = "0px";
    infoScreen.style.bottom = "0px";
    infoScreen.style.backgroundColor = "rgba(61, 98, 130, 0.498)";


/*
Lager en funksjon for å tegne opp frukten på skjermen
*/
function tegnFrukt() 
{
    // Oppretter et button-element og legger det til i listen fruktArr (frukt-array)
    fruktArr.push(document.createElement("button"));
    // Gir hvert button-element en unik id
    fruktArr[fruktArr.length-1].id = fruktId;
    // Øker id-variabelen med 1 slik at alle elementene får hvert sitt nummer
    fruktId++;
    // Legger inn emoji som innerHTML (tekst) for å vise frukt. Dette kan også være et bilde
    fruktArr[fruktArr.length-1].innerHTML = `🍎`;
    // Fjerner bakgrunnen og border på knappen, slik at det ikke blir en synlig firkant rundt frukten
    fruktArr[fruktArr.length-1].style.backgroundColor = "transparent";
    fruktArr[fruktArr.length-1].style.border = "none";
    // Siden bildet av frukten er tekst (emoji), kan vi sete størrelsen med fontSize
    fruktArr[fruktArr.length-1].style.fontSize = "3em";
    fruktArr[fruktArr.length-1].style.position = "absolute";
    // Plasser frukten på en tilfeldig x-posisjon innenfor main-elementet. rect brukes for å finne størrelsen til elementet i px
    fruktArr[fruktArr.length-1].style.left = Math.random() * (rect.width) + 'px'; 
    /*
    Legger til CSS-animasjonen 'drop' med animation shorthand (https://developer.mozilla.org/en-US/docs/Web/CSS/animation). Bruker Math.random for å gi fruktene tilfeldig hastighet mellom 2 og 7 sekunder.
    Animasjonen '@keyframes drop' er definert i CSS-filen '../CSS/style.css'.
    */
    fruktArr[fruktArr.length-1].style.animation = `drop ${Math.floor(Math.random() * 5) + 2}s ease-in 0s 1 normal forwards`
    // Når musen holdes over frukten skal pekeren være lik som i foreldreelementet
    fruktArr[fruktArr.length-1].style.cursor = `inherit`
    
    // Legger frukten til som barn av main-elementet slik at det vises på nettsida
    main.appendChild(fruktArr[fruktArr.length-1]);
    
    // Når frukten klikkes eller når musen føres over frukten, kjøres funksjonen fjernFrukt
    fruktArr[fruktArr.length-1].addEventListener("click", fjernFrukt);
    fruktArr[fruktArr.length-1].addEventListener("mouseover", fjernFrukt);
}
 
    

    
    
/* 
Lager en funksjon for å fjerne frukt som har blitt klikket på eller som musen har blitt ført over.

    Legg merke til bokstaven 'e' inne i parentesen på linja under. 
    Dette betyr at vi sender informasjon om hendelsen (event) som trigget funksjonen inn i funksjonen. e kalles hendelses-objektet */
function fjernFrukt(e)
{
    const frect = e.target.getBoundingClientRect()
    const animationName = `explode${Date.now()}`
    const sheet = document.styleSheets[0];
    sheet.insertRule(`@keyframes ${animationName}{
        from {top:${frect.top}px;}
        to {top:${frect.top}px; left: -150px;}
    }`, 0);
   
    //e.target.style.animationPlayState = "paused"
    e.target.style.animation = `${animationName} 0.5s ease-in-out 0s 1 normal forwards`;
   
    
    setTimeout(
        () => {
            main.removeChild(e.target); 
        }
        ,2000
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
                    
                    missedFrukt++;
                    
                }
                infoScreen.innerHTML = 
                `Mistet frukt: ${missedFrukt}<br>
                Poeng: ${poeng}`;

            }

            // Fjerner frukt fra arrayen fruktArr
            for(const frukt of fruktToRemove)
            {
                main.removeChild(frukt);
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
