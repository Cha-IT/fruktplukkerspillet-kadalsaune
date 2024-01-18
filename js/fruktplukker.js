const fruktArr = [];
let fruktId = 0;
let poeng = 0;

const infoScreen = document.createElement("div");
infoScreen.style.position = "absolute";
infoScreen.style.right = "0px";
infoScreen.style.bottom = "0px";
infoScreen.style.backgroundColor = "rgba(61, 98, 130, 0.498)";

document.body.appendChild(infoScreen)


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
        fruktArr[fruktArr.length-1].style.left = Math.random() * (window.innerWidth-50) + 'px'; // Plasser frukten på en tilfeldig x-posisjon
        fruktArr[fruktArr.length-1].style.top = Math.random() * (window.innerHeight-50) + 'px'; // Plasser frukten på en tilfeldig y-posisjon
        fruktArr[fruktArr.length-1].className = "animate__animated animate__zoomIn animate__fast"
        document.body.appendChild(fruktArr[fruktArr.length-1]);
        
        // Når frukten klikkes, fjern den fra skjermen
        fruktArr[fruktArr.length-1].addEventListener("click", fjernFrukt)

    }
    else
    {
        const gameOverScreen = document.createElement("div");
        gameOverScreen.innerHTML = `GAME OVER<br>Poeng: ${poeng}`;
        gameOverScreen.style.fontSize = "10em";
        gameOverScreen.style.fontWeight = "bold";
        gameOverScreen.style.height = "80vh";
        gameOverScreen.style.width = "80vw";
        gameOverScreen.margin = "auto";
        gameOverScreen.textAlign = "center";

        document.body.appendChild(gameOverScreen);
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
    setTimeout(
        () => {
        e.target.className = "animate__animated animate__zoomOut"
        }
        ,300
    )
    document.body.removeChild(e.target); 
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

nyFrukt();