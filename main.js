const menu = {
    currentScore: document.getElementById("currentScore"),
    bestScore: document.getElementById("bestScore"),
}

// ball
const ball = {
    ball: document.getElementById("ball"),
    position: {
        x: 0,
        y: 0
    },
    tooglePosition() {
        ball.position = {
            x: Math.random() * 90,
            y: Math.random() * 90
        };

        ball.ball.style.left = `${ball.position.x}%`;
        ball.ball.style.top = `${ball.position.y}%`;
    }
    
}

function ballClick() {
    // toogle
    ball.tooglePosition();

    
}



const player = {
    bestScore: 0,
}

const game = {
    roundDelay: {
        min: 2,
        max: 6,
    },
    scorePoint: 100,
}

