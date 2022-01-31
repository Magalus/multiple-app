<template>
    <div class="memoryGame">
        <div v-if="!this.gameStart">
            <form @submit.prevent="startGame()">
                <label for="nbCard">Nombre de cartes</label>
                <select v-model="this.cardNumber" id="nbCard">
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                    <option value="24">24</option>
                </select>
                <button>Nouvelle partie</button>
            </form>
        </div>
        <div v-else class="board" :class="{fiveColumn: this.cardNumber == 20, sixColumn: this.cardNumber == 24}">
            <div class="infs">
                <div class="restart" @click="this.gameStart = false">Recommencer</div>
                <div class="count">Nombre de coup : {{ this.count }}</div>
            </div>
            <div class="cards"
                 :style="this.cardsFind.length == this.cardNumber ? 'pointer-events: none;' : ''">
                <div class="card" 
                    v-for="(card, index) in this.cards" 
                    :key="index" 
                    @click="returnCard(index + 1, card)"
                    :class="{flipped: this.flippedCard.includes(index + 1)}"
                    :style="!this.canReturnCard ? 'pointer-events: none;' : ''"
                >
                    <div class="card_face card_front"></div>
                    <div class="card_face card_back" :style="{backgroundColor: card}"></div>
                </div>
            </div>
            <div v-if="this.cardsFind.length == this.cardNumber" class="win">
                Bien joué !
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            flippedCard: [],
            gameStart: false,
            gameEnd: false,
            cards: undefined,
            cardNumber: 8,
            count: 0,
            indexCard: undefined,
            indexSecondCard: undefined,
            colorCard: undefined,
            colorSecondCard: undefined,
            canReturnCard: true,
            cardsFind: []
        }
    },
    methods: {
        startGame() {
            this.count = 0
            this.canReturnCard = true
            this.indexCard = undefined
            this.indexSecondCard = undefined
            this.colorCard = undefined
            this.colorSecondCard = undefined
            this.flippedCard = []
            this.cardsFind = []
            var cardsArray = []
            if (this.cardNumber == 8) {
                cardsArray = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green"]
                this.cards = this.shuffleArr(cardsArray)
            } else if (this.cardNumber == 12) {
                cardsArray = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", 
                                  "orange", "orange", "black", "black"]
                this.cards = this.shuffleArr(cardsArray)
            } else if (this.cardNumber == 16) {
                cardsArray = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", 
                                  "orange", "orange", "black", "black", "lime", "lime", "purple", 
                                  "purple"]
                this.cards = this.shuffleArr(cardsArray)
            } else if (this.cardNumber == 20) {
                cardsArray = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", 
                                  "orange", "orange", "black", "black", "lime", "lime", "purple", 
                                  "purple", "gray", "gray", "maroon", "maroon"]
                this.cards = this.shuffleArr(cardsArray)
            } else if (this.cardNumber == 24) {
                cardsArray = ["red", "red", "blue", "blue", "yellow", "yellow", "green", "green", 
                                  "orange", "orange", "black", "black", "lime", "lime", "purple", 
                                  "purple", "gray", "gray", "maroon", "maroon", "pink", "pink", 
                                  "teal", "teal"]
                this.cards = this.shuffleArr(cardsArray)
            }
            this.gameStart = true
        },
        shuffleArr(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var rand = Math.floor(Math.random() * (i + 1));
                [array[i], array[rand]] = [array[rand], array[i]]
            }
            return array;
        },
        returnCard(index, card) {
            if (!this.indexCard) {
                this.count += 1
                this.flippedCard.push(index)
                this.indexCard = index
                this.colorCard = card
            } else {
                if (index != this.indexCard) {
                    this.count += 1
                    this.flippedCard.push(index)
                    this.indexSecondCard = index
                    this.colorSecondCard = card
                    if (this.colorCard == this.colorSecondCard) {
                        this.cardsFind.push(this.indexCard)
                        this.cardsFind.push(this.indexSecondCard)
                        this.indexCard = undefined
                        this.colorCard = undefined
                        this.indexSecondCard = undefined
                        this.colorSecondCard = undefined
                    } else {
                        this.canReturnCard = false
                        setTimeout(() => {
                            this.flippedCard = this.flippedCard.filter(e => (e != this.indexCard))
                            this.flippedCard = this.flippedCard.filter(e => (e != this.indexSecondCard))
                            this.indexCard = undefined
                            this.colorCard = undefined
                            this.indexSecondCard = undefined
                            this.colorSecondCard = undefined
                            this.canReturnCard = true
                        }, 1000);
                    }
                }
            } 
        }
    }
}

</script>

<style lang="scss" scoped>

.memoryGame {
    font-family: Yanone Kaffeesatz,sans-serif;
    background-image: linear-gradient(#93e4f8, #daf5fc);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        label {
            font-size: 27px;
            margin-left: 2px;

            @media screen and (max-width: 1060px) {
                font-size: 25px;
            }

            @media screen and (max-width: 720px) {
                font-size: 23px;
            }
        }

        select {
            font-size: 20px;
            background-color: white;
            padding: 5px 15px 3px 15px;
            border: none;
            border-radius: 5px;
            margin: 8px 0px 35px 0px;

            @media screen and (max-width: 1060px) {
                font-size: 18px;
                padding: 4px 13px 2px 13px;
            }

            @media screen and (max-width: 720px) {
                font-size: 16px;
                padding: 4px 11px 2px 11px;
            }

            &:focus {
                outline: none;
            }

            &:hover {
                cursor: pointer;
            }
        }

        button {
            font-size: 25px;
            color: white;
            background-color: rgb(45, 91, 189);
            padding: 15px 20px;
            border-radius: 5px;
            border: none;
            box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 10px 0px;
            transition: background-color 0.35s ease-out;

            @media screen and (max-width: 1060px) {
                font-size: 22px;
                padding: 13px 18px;
            }

            @media screen and (max-width: 720px) {
                font-size: 20px;
                padding: 11px 16px;
            }

            &:hover {
                cursor: pointer;
                background-color: rgb(93, 139, 238);
            }
        }
    }
    
    .board {
        display: flex;
        flex-direction: column;
        max-width: 600px;
        width: 90%;

        @media screen and (max-width: 1060px) {
            max-width: 400px;
        }

        @media screen and (max-width: 720px) {
            max-width: 300px;
        }

        .infs {
            margin-bottom: 50px;
            display: flex;
            justify-content: center;
            align-items: center;

            .restart {
                font-size: 20px;
                color: white;
                background-color: rgb(45, 91, 189);
                padding: 10px 15px 8px 15px;
                margin-right: 50px;
                border-radius: 5px;
                border: none;
                box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 10px 0px;
                transition: background-color 0.35s ease-out;

                @media screen and (max-width: 1060px) {
                    font-size: 18px;
                    padding: 8px 13px 6px 13px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 16px;
                    padding: 7px 12px 5px 12px;
                }

                &:hover {
                    cursor: pointer;
                    background-color: rgb(93, 139, 238);
                }
            }

            .count {
                font-size: 20px;

                @media screen and (max-width: 1060px) {
                    font-size: 18px;
                }

                @media screen and (max-width: 720px) {
                    font-size: 16px;
                }
            }
        }

        .cards {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            perspective: 700px;

            .card {
                margin: 20px;
                width: 100px;
                height: 100px;
                border-radius: 5px;
                box-shadow: 0 7px 10px 0 rgb(100 100 111 / 30%);
                transition: transform 0.7s;
                transform-style: preserve-3d;
                position: relative;

                @media screen and (max-width: 1060px) {
                    width: 70px;
                    height: 70px;
                    margin: 15px;
                }

                @media screen and (max-width: 720px) {
                    width: 50px;
                    height: 50px;
                    margin: 10px;
                }

                &:hover {
                    cursor: pointer;
                }

                .card_face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }

                .card_front {
                    background-color: white;
                    backface-visibility: hidden;
                }

                .card_back {
                    transform: rotateY(-180deg);
                }
            }

            .flipped {
                transform: rotateY(-180deg);
            }
        }
    }

    .fiveColumn {
        max-width: 700px;

        @media screen and (max-width: 1060px) {
            max-width: 500px;
        }

        @media screen and (max-width: 720px) {
            max-width: 320px;
        }
    }

    .sixColumn {
        max-width: 850px;

        @media screen and (max-width: 1060px) {
            max-width: 600px;
        }

        @media screen and (max-width: 720px) {
            max-width: 320px;
        }
    }

    .win {
        font-size: 20px;
        margin-top: 20px;
    }
}

</style>