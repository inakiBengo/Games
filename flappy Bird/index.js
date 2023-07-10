const d = document;

document.addEventListener("DOMContentLoaded", () => {
    const $root = d.getElementById("root"),
    $bird = d.getElementById("bird"),
    $ground = d.getElementById("ground"),
    $gameOverCard = d.getElementById("gameOverCard"),
    $retry = d.getElementById("retry");


    let birdLeft = 220,
    birdBottom = 300,
    gravity = 3,
    isGameOver = false,
    gap = 700,
    visible = true;

    /***** Imprimimos la posicion del jugador *****/
    let stopFirstPosition = setInterval(firstPosition, 20)
    function firstPosition () {
        birdBottom -= gravity
        $bird.style.left = birdLeft + "px";
        $bird.style.bottom = birdBottom + "px";
    }

    /***** Controles *****/
    //mouse
    d.addEventListener("click", () => {
            jump()
            flyAnimation()
        })
    //teclado
    d.addEventListener("keydown", e => {
        control(e)
    })
    function control (e) {
        if(e.keyCode === 32 || e.keyCode === 38){
            flyAnimation()
            jump()
        }
    }
    //movimiento
    function jump () {
        if(birdBottom < 480) birdBottom += 100;
        $bird.style.bottom = birdBottom + "px"
    }
    function flyAnimation () {
        $bird.src = "assets/flapy2.png"
        setTimeout(() => {
            $bird.src = "assets/flapy1.png"
        }, 200)
    }

    function generateObstacle () {
        let obstacleLeft = 1200,
        randomHeight = Math.random() * -350,
        obstacleBottom = randomHeight;
        const $obstacle = d.createElement("img"),
        $topObstacle = d.createElement("img")
        $obstacle.src = "assets/piple.png";
        $topObstacle.src = "assets/piple.png";
        $obstacle.classList.add("obstacle");
        $topObstacle.classList.add("topObstacle");

        
        $root.appendChild($obstacle)
        $root.appendChild($topObstacle)
        
        $obstacle.style.left = obstacleLeft + "px"
        $obstacle.style.bottom = obstacleBottom + "px"
        $topObstacle.style.left = obstacleLeft + "px"
        $topObstacle.style.bottom = obstacleBottom + gap + "px"

        function moveObstacle () {
            obstacleLeft -=  2
            $obstacle.style.left = obstacleLeft + "px"
            $topObstacle.style.left = obstacleLeft + "px"
            if(isGameOver) clearInterval(moveObstacleStop)

            if(obstacleLeft === -80) {
                clearInterval(moveObstacleStop)
                $root.removeChild($obstacle)
                $root.removeChild($topObstacle)
            }
            if(
                obstacleLeft > 220 && obstacleLeft < 300 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 350 || birdBottom > obstacleBottom + gap) ||
                birdBottom <= 22
                ) {
                console.log("game over")
                gameOver() 
                clearInterval(moveObstacleStop)

            }
        }

        let moveObstacleStop = setInterval(moveObstacle, 20)
        if(!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()

    function gameOver() {
        clearInterval(stopFirstPosition)
        isGameOver = true
        d.removeEventListener("keydown", control)
        d.removeEventListener("click", jump)
        
    }
})

