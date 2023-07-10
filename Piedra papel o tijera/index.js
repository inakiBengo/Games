const d = document;
let yPoint = 0,
pcPoint = 0,
count = 3;

let pepe;

const $rock = d.getElementById("rock"),
$paper = d.getElementById("paper"),
$scissors = d.getElementById("scissors"),
$yPoint = d.getElementById("yPoint"),
$pcPoint = d.getElementById("pcPoint"),
$yourSelect = d.getElementById("yourSelect"),
$pcSelect = d.getElementById("pcSelect"),
$info = d.getElementById("info");

// añadimos clases
$rock.classList.add("hover:bg-black")
$paper.classList.add("hover:bg-black")
$scissors.classList.add("hover:bg-black")

//Aqui la pc toma su desicion
function getComputer () {
    const options = ["r", "p", "s"];
    const random = Math.floor(Math.random()*3);
    return options[random]
}

// cronometro decendiente
function countdown () {
    $info.innerHTML = count;
    count--
}

//rendereizacion de los elementos elegidos
function renderSelect (e, pcRndom) {
    if(e === "r"){
        $yourSelect.innerHTML = "👊"
    } else if (e === "p") {
        $yourSelect.innerHTML = "✋"
    } else if (e === "s") {
        $yourSelect.innerHTML = "✌️"
    }
    if(pcRndom === "r"){
        $pcSelect.innerHTML = "👊"
    } else if (pcRndom === "p") {
        $pcSelect.innerHTML = "✋"
    } else if (pcRndom === "s") {
        $pcSelect.innerHTML = "✌️"
    }
}

// se renderiza el mensaje de victrotia, derrota o empate. ademas que se suman los puntos
function renderMessage (position) {
    if(position === "WIN"){
        $info.innerHTML = position
        yPoint++
        $yPoint.innerHTML = yPoint
    } else if(position === "LOSE") {
        $info.innerHTML = position
        pcPoint++
        $pcPoint.innerHTML = pcPoint
    } else if (position === "TIE") {
        $info.innerHTML = position
    }
}

//ejecucion de las diferentes funciones de logica
function logica (e, pcRndom, position) {
    
    count = 3;
    pepe = setInterval(() => {
        if(count >= 0) {
            countdown()
    } else {
        clearInterval(pepe)
        renderSelect(e, pcRndom);
        renderMessage(position);
        $rock.disabled = false
        $rock.classList.add("hover:bg-black")
        $paper.disabled = false
        $paper.classList.add("hover:bg-black")
        $scissors.disabled = false
        $scissors.classList.add("hover:bg-black")
    }
}, 1000)
}

function game (e) {
    const pcRndom = getComputer()
    
    $rock.disabled = true
    $rock.classList.remove("hover:bg-black")
    $paper.disabled = true
    $paper.classList.remove("hover:bg-black")
    $scissors.disabled = true
    $scissors.classList.remove("hover:bg-black")

    if(e === pcRndom) { 
        console.log("TIE")
        logica(e, pcRndom,"TIE")
    }
    switch (e+pcRndom) {
        case "rs":
        case "pr":
        case "sp":
            console.log("WIN")
            logica(e, pcRndom, "WIN")
            break;
        case "sr":
        case "rp":
        case "ps":
            console.log("LOSE")
            logica(e, pcRndom, "LOSE")
            break;
    }
}

$rock.addEventListener("click", () => game("r"))
$paper.addEventListener("click", () => game("p"))
$scissors.addEventListener("click", () => game("s"))
