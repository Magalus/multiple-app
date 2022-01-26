<template>
    <div class="quiz">
        <component 
            :is="this.view" 
            class="actualView" 
            @startGame="isGameStart($event)" 
            @showResults="isGameEnd($event)"
            @newGame="createNewGame($event)"
            :questions="this.questions" 
            :score="this.score"
        ></component>
    </div>
</template>

<script>

import axios from 'axios'

import StartQuiz from '@/components/Quiz/startQuiz.vue'
import Question from '@/components/Quiz/question.vue'
import Results from '@/components/Quiz/results.vue'

export default {
    components: {
      StartQuiz,
      Question,
      Results
    },
    data() {
        return {
            view: "StartQuiz",
            questions: undefined,
            score: undefined
        }
    },
    methods: {
        isGameStart(e) {
            if (e == true) {
                this.view = "Question"
            }
        },
        isGameEnd(e) {
            if (e.end == true) {
                this.score = e.score
                this.view = "Results"
            }
        },
        async createNewGame() {
            let {data} = await axios.get("https://opentdb.com/api.php?amount=10")
            this.questions = data.results
            this.view = "Question"
        },
    },
    async created() {
        let {data} = await axios.get("https://opentdb.com/api.php?amount=10")
        this.questions = data.results
    }
} 

</script>

<style lang="scss" scoped>

.quiz {
    background-image: linear-gradient(#4F56EE, #0070C9);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.actualView {
    animation: Translate 2s ease;

    @keyframes Translate {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
}

</style>