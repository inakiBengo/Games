let count = 0,
colors = [],
round = 1,
on = false;

var idInterval;

const d = document,
$round = d.getElementById("round"),
$top = d.getElementById("top"),
$left = d.getElementById("left"),
$right = d.getElementById("right"),
$bottom = d.getElementById("bottom"),
$btn = d.getElementById("btn"),
$container = d.getElementById("container"),
$loser = d.getElementById("loser"),
$delete = d.getElementById("delete");

$btn.addEventListener("click", () => {
    play()
    $btn.textContent = "RESTART"
})

// creamos los movimientos de simon y activamos el juego
function play() {
    for(let i = 0; i < 20; i++) {
        colors.push(Math.floor(Math.random()*4))
    }
    on = true 

    paint()

}

//aqui la pc le da color a los botones y activa los audios
function paint() {
    //activamos el color para la pc
    let color = $container.children[colors[count]]
    color.classList.add("active")

    //activamos el audio para la pc
    let clip = `clip${colors[count]}`;
    let $audio = d.getElementById(clip);
    $audio.play()

    //removemos los colores de la pc
    setTimeout(() => {
        color.classList.remove("active")
    }, 500)

    //validamos si detemos el intervalo segun la cantidad de rondas
    count++
    if(count === round){
    clearInterval(idInterval)
        count = 0
    }
}

//aqui el jugador le da color a los botones y activa los audios
$container.addEventListener("click", e => {
    let color = $container.children[colors[count]]
    if(color === e.target){

        let clip = `clip${colors[count]}`;
        let $audio = d.getElementById(clip);
        $audio.play()

        count++
        if(count !== 20){
            //validamos si se activo el boton start
            if(on === true){
                // validamos si el usuario clickeo la misma cantidad de veces que la pc ejecuta las rondas
                if(count === round){
                    count = 0
                    round ++
                    idInterval = setInterval(paint, 1000)   
                }
            }
        } else{
            win()
        }
    }else {
        if(on === true)lose()
    }
})

function lose () {
    d.getElementById("loserImg").src = "assets/tenor.gif"
    d.getElementById("audioLose").play()
    colors = []
    on = false
    count = 0
    round = 1
    $btn.textContent = "START"
    $loser.classList.remove("hidden");
}


function win () {
    for(let i = 0; i < 4; i++){
        $container.children[i].classList.add("winner")
    }
    d.getElementById("loserImg").src = "assets/boss.gif"
    d.getElementById("loserText").textContent = "WIN"
    colors = []
    on = false
    count = 0
    round = 1
    $btn.textContent = "START";
    setTimeout(() => {
        $loser.classList.remove("hidden")
        for(let i = 0; i < 4; i++){
            $container.children[i].classList.remove("winner")
        }
    }, 1000)
    
}

$delete.addEventListener("click", () => $loser.classList.add("hidden") )