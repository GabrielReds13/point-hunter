// audios
const audios = {
    startGame: new Audio("./assets/sounds/start-game-sound.mp3"),
    tryAgain: new Audio("./assets/sounds/try-again-sound.mp3"),
    lose: new Audio("./assets/sounds/lose-sound.mp3"),
    newRecord: new Audio("./assets/sounds/new-record-sound.mp3"),
    countdown: new Audio("./assets/sounds/countdown-sound.mp3"),
    ballClick: new Audio("./assets/sounds/ball-click.mp3"),
}

// code
const menu = {
    currentScore: document.getElementById("currentScore"),
    bestScore: document.getElementById("bestScore"),
    timerSection: document.getElementById("timerSection"),
    countdown: document.getElementById("countdown"),
    playButton: document.getElementById("playButton"),
    messageContainer: document.getElementById("messageContainer"),
    messageText: document.getElementById("message"),
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

// player
const player = {
    bestScore: 0,
    currentScore: 0
}

// game settings
const game = {
    // score
    score: {
        point: 100,
        sumScore() {
            player.currentScore += this.point;
            menu.currentScore.innerHTML = player.currentScore;
            
            // best score
            if(player.currentScore >= player.bestScore) {
                player.bestScore = player.currentScore;
                menu.bestScore.innerHTML = player.bestScore;
            }
        },
        clearScore() {
            player.currentScore = 0;
            menu.currentScore.innerHTML = player.currentScore;
        },
    },

    // timer
    roundTimer: {
        // dificulty
        dificulty: {
            v1: 5,
            v2: 4,
            v3: 3,
            v4: 2,
            v5: 1,
        },
        dScore: {
            stage1: 750,
            stage2: 2000,
            stage3: 6000,
            stage4: 10000,
        },
        setCountdown() {
            if(player.currentScore >= this.dScore.stage1 && player.currentScore < this.dScore.stage2) return this.dificulty.v2;
            else if(player.currentScore >= this.dScore.stage2 && player.currentScore < this.dScore.stage3) return this.dificulty.v3;
            else if(player.currentScore >= this.dScore.stage3 && player.currentScore < this.dScore.stage4) return this.dificulty.v4;
            else if(player.currentScore >= this.dScore.stage4) return this.dificulty.v5;
            else  return this.dificulty.v1;
        }
    },
    messages() {
        function phrases() {
            if(player.currentScore < player.bestScore || player.currentScore === 0) {
                audios.lose.play();
                return "GAME OVER";
            }
            else {
                audios.newRecord.play();
                return "NEW SCORE";
            }
        }

        menu.messageText.innerHTML = phrases();
    }
}

let cronometer = {
    timerId: null,
    countdown: game.roundTimer.setCountdown(),
    // start countdown
    start() {
        if (!this.timerId) {
            this.timerId = setInterval(() => {
                if(this.countdown > 0 && this.countdown <= 3) {
                    audios.countdown.currentTime = 0;
                    audios.countdown.play();
                } 
                if (this.countdown < 1) {
                    menu.messageContainer.style.display = "flex";
                    ball.ball.style.display = "none";
                    game.messages();
                    this.reset();
                } else {
                    this.countdown -= 1;
                    this.updateDisplay();
                }
            }, 1000);
        }
    },
    
    // reset countdown
    reset() {
        clearInterval(this.timerId);
        this.timerId = null;
        this.countdown = game.roundTimer.setCountdown();
        this.updateDisplay();
    },
    
    // update timer dom
    updateDisplay() {
        menu.countdown.innerHTML = this.countdown;
    },
}

// other functions
async function ballClick() {
    // toogle
    ball.tooglePosition();
    game.score.sumScore();
    cronometer.reset();
    cronometer.start();
    audios.ballClick.currentTime = 0;
    audios.ballClick.play();
}

async function startGame(type) {
    cronometer.reset();

    if(type === "play") {
        menu.playButton.style.display = "none";
        menu.timerSection.style.display = "flex";
        audios.startGame.play();
    }
    else if(type === "tryAgain") {
        menu.messageContainer.style.display = "none";
        game.score.clearScore();
        audios.tryAgain.play();
    }

    ball.ball.style.display = "flex";
    
    ball.ball.style.left = `46%`;
    ball.ball.style.top = `46%`;

    cronometer.start();
}