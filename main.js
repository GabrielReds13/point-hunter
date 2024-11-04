const menu = {
    currentScore: document.getElementById("currentScore"),
    bestScore: document.getElementById("bestScore"),
    countdown: document.getElementById("countdown")
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

async function ballClick() {
    // toogle
    ball.tooglePosition();
    game.sumScore();
    game.roundTimer.setCountdown();
    await window.clearTimeout();
    game.roundTimer.cronometer();

}

// player
const player = {
    bestScore: 0,
    currentScore: 0
}

// game settings
const game = {
    // score
    scorePoint: 100,
    sumScore() {
        player.currentScore += this.scorePoint;
        menu.currentScore.innerHTML = player.currentScore;
        
        // best score
        if(player.currentScore >= player.bestScore) {
            player.bestScore = player.currentScore;
            menu.bestScore.innerHTML = player.bestScore;
        }
    },
    clearScore() {
        player.currentScore = 0;
    },
    // timer
    roundTimer: {
        counterTime: 0,
        countdown: 0,
        // dificulty
        dificulty: {
            v1: 6,
            v2: 5,
            v3: 4,
            v4: 3,
            v5: 2,
        },
        dScore: {
            stage1: 750,
            stage2: 2000,
            stage3: 4000,
            stage4: 8000,
        },
        cronometer() {
            setTimeout(() => {
                this.countdown -= 1;
                menu.countdown.innerHTML = this.countdown;
                this.cronometer();
            }, 1000);
        },
        clearCronometer() {
            clearTimeout();
        },
        setCountdown() {
            if(player.currentScore >= this.dScore.stage1 && player.currentScore < this.dScore.stage2) this.countdown = this.dificulty.v2;
            else if(player.currentScore >= this.dScore.stage2 && player.currentScore < this.dScore.stage3) this.countdown = this.dificulty.v3;
            else if(player.currentScore >= this.dScore.stage3 && player.currentScore < this.dScore.stage4) this.countdown = this.dificulty.v4;
            else if(player.currentScore >= this.dScore.stage4) this.countdown = this.dificulty.v5;
            else  this.countdown = this.dificulty.v1;
        }
    },
}

