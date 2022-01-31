<template>
    <div class="diceGame">
        <div class="modal-overlay" v-if="this.showModal" @click="this.showModal = false">
            <div class="modal" @click.stop>
                <div class="cross" @click="this.showModal = false">
                    <svg 
                        class="svg-inline--fa fa-times fa-w-11 close" 
                        aria-hidden="true" 
                        focusable="false" 
                        data-prefix="fas" 
                        data-icon="times" 
                        role="img" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 352 512" 
                        data-v-132cabf7="">
                        <path 
                            class="" 
                            fill="currentColor" 
                            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                            >
                        </path>
                    </svg>
                </div>
                <h1>Règles du jeu</h1>
                <p> Le premier joueur lance le dé et observe son score. Si le dé indique un nombre entre 2 et 6, le joueur peut décider
                    de relancer et d'ajouter chaque nouveau résultat à son score actuel ou de converser les points obtenus pour son score total.
                </p>
                <p>Attention, si le dé indique 1, le score actuel retombe à 0 et c'est à l'adversaire de jouer.</p>
                <p>Le gagnant est le premier joueur à atteindre les 100 points.</p>
            </div>
        </div>

        <div class="startGame">
            <div @click="newGame()">Nouvelle partie</div>
            <div @click="this.showModal = true">Règles</div>
        </div>
        <div class="board">
            <div class="player" :class="{'playerActive' : this.player1Turn}">
                <span class="name">Joueur 1</span>
                <span class="score">
                    <span>{{ this.scoreP1 }}</span>
                </span>
                <span class="actualScore">Score actuel : <span>{{ this.currentScoreP1 }}</span></span>
            </div>
            <div class="infs">
                <div class="dice">
                    <img :src="require(`@/assets/img/dice/${this.dice}.png`)" alt="">
                </div>
                <div 
                    class="dicePossibility" 
                    :class="{'disable' : this.endGame}" 
                    @click="rollDice()">
                    Lancer
                </div>
                <div 
                    class="dicePossibility" 
                    :class="{'disable' : this.endGame}" 
                    @click="keepScore()">
                    Garder
                </div>
            </div>
            <div class="player" :class="{'playerActive' : !this.player1Turn}">
                <span class="name">Joueur 2</span>
                <span class="score">
                    <span>{{ this.scoreP2 }}</span>
                </span>
                <span class="actualScore">Score actuel  : <span >{{ this.currentScoreP2 }}</span></span>
            </div>
        </div>
        <div v-if="this.winnerMessage" class="winnerMessage"> {{ this.winnerMessage }}</div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            showModal: false,
            dice: 3,
            scoreP1: 0,
            scoreP2: 0,
            currentScoreP1: 0,
            currentScoreP2: 0,
            player1Turn: true, 
            winnerMessage: undefined,
            endGame: false
        }
    },
    methods: {
        newGame() {
            this.scoreP1 = 0
            this.scoreP2 = 0
            this.currentScoreP1 = 0
            this.currentScoreP2 = 0
            this.player1Turn = true
            this.dice = 3
            this.winnerMessage = undefined
            this.endGame = false
        },
        rollDice() {
            this.dice = Math.floor(Math.random() * 6) + 1
            if (this.dice == 1) {
                this.player1Turn = !this.player1Turn
                this.currentScoreP1 = 0
                this.currentScoreP2 = 0
            } else {
                if (this.player1Turn) {
                    this.currentScoreP1 += this.dice
                } else {
                    this.currentScoreP2 += this.dice
                }
            }
        },
        keepScore() {
            if (this.player1Turn) {
                this.scoreP1 += this.currentScoreP1
                this.currentScoreP1 = 0
                if ( this.scoreP1 >= 100) {
                    this.winnerMessage = "Le joueur 1 a gagné !"
                    this.endGame = true
                }
            } else {
                this.scoreP2 += this.currentScoreP2
                this.currentScoreP2 = 0
                if ( this.scoreP2 >= 100) {
                    this.winnerMessage = "Le joueur 2 a gagné !"
                    this.endGame = true
                }
            }
            if (!this.endGame) {
                this.player1Turn = !this.player1Turn
            }
        }
    }
}

</script>

<style lang="scss" scoped>

.diceGame {
    font-family: Yanone Kaffeesatz,sans-serif;
    background-image: linear-gradient(#4db363, #b5f3c2);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .modal-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000000da;

        .modal {
            text-align: center;
            background-color: white;
            max-width: 500px;
            width: 80%;
            padding: 30px;
            border-radius: 20px;
            position: relative;
            opacity: 0;
            animation: openModal 1s ease forwards;

            @keyframes openModal {
                0% {
                    transform: translateY(-100px);
                }
                100% {
                    opacity: 1;
                }
            }

            .cross {
                position: absolute;
                right: 15px;
                top: 15px;

                svg {
                    height: 22px;
                    transition: color 0.2s ease-out;

                    &:hover {
                        cursor: pointer;
                        color: grey;
                    }

                    @media screen and (max-width: 1024px) {
                        height: 19px;
                    }

                    @media screen and (max-width: 720px) {
                        height: 16px;
                    }
                }
            }
            
            @media screen and (max-width: 1024px) {
                font-size: 19px;
                line-height: 22px;
                max-width: 400px;
            }

            @media screen and (max-width: 720px) {
                font-size: 15px;
                line-height: 18px;
                max-width: 300px;
            }

            h1 {
                font-size: 30px;
                margin-top: 5px;
                margin-bottom: 25px;

                @media screen and (max-width: 1024px) {
                    font-size: 27px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 24px;
                }
            }

            p {
                font-size: 22px;
                text-align: justify;
                line-height: 25px;

                &:nth-of-type(2) {
                    margin: 20px 0px
                }

                @media screen and (max-width: 1024px) {
                    font-size: 18px;
                    line-height: 22px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 16px;
                    line-height: 18px;
                }
            }
        }
    }

    .startGame {
        display: flex;

        div {
            font-size: 28px;
            margin: 0px 20px 40px 20px;
            background-color: rgb(236, 216, 30);
            padding: 7px 12px 4px 12px;
            border-radius: 5px;
            box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 10px 0px;
            transition: background-color 0.35s ease-out;

            @media screen and (max-width: 1024px) {
                font-size: 26px;
            }

            @media screen and (max-width: 720px) {
                font-size: 23px;
            }

            &:hover {
                cursor: pointer;
                background-color: rgb(255, 241, 112);
            }
        }
    }

    .board {
        max-width: 800px;
        width: 80%;
        height: 400px;
        display: flex;
        background-color: white;
        border-radius: 5px;
        box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 10px 0px;

        @media screen and (max-width: 1024px) {
            height: 320px;
        }

        @media screen and (max-width: 720px) {
            flex-direction: column;
            max-width: 400px;
            height: 100%;
        }

        .player {
            width: 40%;
            display: flex;
            flex-direction: column;
            padding: 30px;

            @media screen and (max-width: 720px) {
                flex-direction: row;
                width: 100%;
                align-items: center;
                height: 40%;
                padding: 55px 30px; 
            }

            .name {
                font-size: 35px;

                @media screen and (max-width: 1024px) {
                    font-size: 30px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 22px;
                }
            }

            .score {
                font-size: 45px;
                font-weight: bold;
                flex: 1;
                display: flex;
                justify-content: center;
                align-items: center;

                @media screen and (max-width: 1024px) {
                    font-size: 40px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 30px;
                }
            }

            .actualScore {
                font-size: 20px;

                @media screen and (max-width: 1024px) {
                    font-size: 18px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 15px;
                }

                span {
                    margin-left: 8px;
                    font-size: 25px;

                    @media screen and (max-width: 1024px) {
                        font-size: 22px;
                    }

                    @media screen and (max-width: 720px) {
                        font-size: 19px;
                    }
                }
            }
        }

        .playerActive {
            border: red solid 2px;
        }

        .infs {
            width: 20%;
            border-right: 1px solid gray;
            border-left: 1px solid gray;
            display: flex;
            flex-direction: column;
            justify-content: center;

            @media screen and (max-width: 720px) {
                flex-direction: row;
                align-items: center;
                width: 100%;
                height: 20%;
                border: none;
                border-bottom: 1px solid gray;
                border-top: 1px solid gray;
            }

            .dice {
                margin-bottom: 50px;

                @media screen and (max-width: 720px) {
                    margin: 25px 0px;
                }

                img {
                    height: 55px;
                    width: 55px;

                    @media screen and (max-width: 1024px) {
                        height: 50px;
                        width: 50px;
                    }

                    @media screen and (max-width: 720px) {
                        height: 45px;
                        width: 45px;
                        margin-right: 30px;
                    }
                }
            }

            .dicePossibility {
                font-size: 22px;
                color: white;
                background-color: rgb(45, 91, 189);
                padding: 10px 10px 7px 10px;
                border-radius: 5px;
                box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 10px 0px;
                width: 60%;
                align-self: center;
                margin-bottom: 15px;
                transition: background-color 0.35s ease-out;

                @media screen and (max-width: 1024px) {
                    font-size: 19px;
                    padding: 8px 6px 5px 6px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 17px;
                    padding: 8px 4px 5px 4px;
                    width: 20%;
                    margin: 0px 5px 0px 5px;

                }

                &:hover {
                    cursor: pointer;
                    background-color: rgb(93, 139, 238);
                }
            }

            .disable {
                pointer-events: none;
                background-color: rgb(148, 146, 146);
            }
        }
    }

    .winnerMessage {
        margin-top: 40px;
        font-size: 30px;

        @media screen and (max-width: 1024px) {
            font-size: 28px;
        }

        @media screen and (max-width: 720px) {
            font-size: 26px;
        }
    }
}

</style>