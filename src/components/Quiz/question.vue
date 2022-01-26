<template>
    <div class="question">
        <span class="number">{{ this.questionNumber + 1 }} / 10</span>
        <div class="myBar" :key="fillBar">
            <div id="fillBar" ref="fillbar"></div>
        </div>
        <div class="questionTitle" v-html="this.questionTitle"></div>
        <div class="answers">
            <div v-for="(answer, index) in this.shuffledAnswers" 
                :key="index" 
                class="answer"
                @click="this.submitAnswer(answer)">
                <div :class="{right : answer == this.correctAnswer && this.countDown == 0,
                            wrong : this.answerSubmit != this.correctAnswer && answer == this.answerSubmit && this.countDown == 0,
                            selected: this.countDown > 0 && this.answerSubmit == answer}">
                    <span v-html="answer"></span>
                </div>
            </div>
        </div>
        <div v-if="this.countDown == 0 && this.questionNumber < 9" class="nextQuestion" @click="updateQuestion()">Next Question</div>
        <div v-else-if="this.countDown == 0 && this.questionNumber == 9" class="results" @click="endGame()">Results</div>
        <div v-else class="nextQuestionEmpty"></div>
    </div>
</template>

<script>

export default {
    props: {
        questions: Array,
    },
    data() {
        return{
            questionNumber: -1,
            questionTitle: undefined,
            correctAnswer: undefined,
            shuffledAnswers: undefined,
            answerSubmit: undefined,
            countDown: 10,
            score: 0,
            fillBar: 0
        }
    },
    methods: {
        updateQuestion() {
            if (this.questionNumber >=0) {
                this.updateScore()
                this.fillBar += 1
            }
            this.answerSubmit = undefined
            this.questionNumber += 1;
            this.questionTitle = this.questions[this.questionNumber].question;
            this.correctAnswer = this.questions[this.questionNumber].correct_answer;
            var answers = []
            this.questions[this.questionNumber].incorrect_answers.forEach(element => {
                answers.push(element)
            });
            answers.push(this.questions[this.questionNumber].correct_answer);
            this.shuffledAnswers = this.shuffleArr(answers);
            this.countDown = 10;
            this.countDownTimer();
        },
        updateScore() {
            if (this.correctAnswer == this.answerSubmit) {
                this.score += 1
            }
        },
        shuffleArr(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var rand = Math.floor(Math.random() * (i + 1));
                [array[i], array[rand]] = [array[rand], array[i]]
            }
            return array;
        },
        submitAnswer(answer) {
            if (this.countDown > 0) {
                this.answerSubmit = answer
            }
        },
        countDownTimer() {
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            }
        },
        endGame() {
            this.$emit('showResults', {end: true, score: this.score})
        }
    },
    mounted() {
        this.updateQuestion()
    },
}
</script>

<style lang="scss" scoped>

.number {
    font-size: 16px;
    font-weight: bold;

    @media screen and (max-width: 720px) {
        font-size: 14px;
    }

    @media screen and (max-width: 480px) {
        font-size: 12px;
    }
}

.nextQuestion, .results {
    background-color: #25282D;
    color: white;
    font-size: 14px;
    width: 140px;
    height: 30px;
    margin-top: 30px;
    line-height: 30px;
    border-radius: 5px;
    align-self: center;

    &:hover {
        cursor: pointer;
        background-color: #37393f;
    }

    @media screen and (max-width: 720px) {
        font-size: 12px;
        width: 130px;
        height: 28px;
        line-height: 28px;
    }

    @media screen and (max-width: 480px) {
        font-size: 10px;
        width: 120px;
        height: 26px;
        line-height: 26px;
    }
}

.nextQuestionEmpty {
    width: 140px;
    height: 30px;
    margin-top: 30px;
}

.question {
    display: flex;
    flex-direction: column;
    max-width: 700px;
    width: 80%;

    .myBar {
        background-color: #D6D2D0;
        margin-top: 25px;
    }

    #fillBar {
        background-image: linear-gradient(#E77300, #EA8C30);
        height:15px;
        width: 0%;
        animation: fillBar 10s linear forwards;
    }
    
    @keyframes fillBar {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }

    .questionTitle {
        color: white;
        background-color: #25282D;
        border-radius: 5px;
        padding: 25px 50px;
        margin-bottom: 50px;
        line-height: 25px;

        @media screen and (max-width: 720px) {
            padding: 20px 45px;
            font-size: 13px;
            line-height: 20px;
        }

        @media screen and (max-width: 480px) {
            padding: 15px 35px;
            font-size: 10px;
            line-height: 15px;
        }
    }
    
    .answers {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .right {
            animation: blinkingBackgroundRight 1.2s linear 1 forwards;
        }

        @keyframes blinkingBackgroundRight{
            0%		{ background-color: #25282D;}
            33%		{ background-color: #02CF02;}
            66%		{ background-color: #25282D;}
            100%	{ background-color: #02CF02;}
        }

        .wrong {
            animation: blinkingBackgroundWrong 1.2s linear 1 forwards;
        }

        @keyframes blinkingBackgroundWrong{
            0%		{ background-color: #25282D;}
            33%		{ background-color: #E30000;}
            66%		{ background-color: #25282D;}
            100%    { background-color: #ef0a1a;}
        }

        .selected {
            background-color: #5D616B !important;
        }

        .answer {
            display: flex;
            align-items: center;
            width: 48%;

            div {
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #25282D;
                border-radius: 5px;
                width: 100%;
                height: 80px;
                margin-bottom: 20px;
                padding: 15px;

                @media screen and (max-width: 720px) {
                    height: 70px;
                    font-size: 13px;
                }

                @media screen and (max-width: 480px) {
                    height: 60px;
                    font-size: 10px;
                }

                &:hover {
                    cursor: pointer;
                    background-color: #37393f;
                }

                span {
                    color: white;
                }
            }
        }
    }
}

</style>