<template>
    <div class="results">
        <div>Results :</div>
        <div>{{this.score}} / 10</div>
        <div class="newQuiz" @click="newGame()">New Quiz</div>
    </div>
</template>

<script>

export default {
    props: {
        score: Number,
    },
    methods: {
        newGame() {
            this.$emit('newGame', true)
        }
    }
}

</script>

<style lang="scss" scoped>

.results {
    color: white;

    div {
        &:first-of-type {
            font-size: 20px;

            @media screen and (max-width: 720px) {
                font-size: 17px;
            }

            @media screen and (max-width: 480px) {
                font-size: 14px;
            }
        }

        &:nth-last-of-type(2) {
            font-size: 60px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 60px;

            @media screen and (max-width: 720px) {
                font-size: 50px;
            }

            @media screen and (max-width: 480px) {
                font-size: 40px;
            }
        }
    }

    .newQuiz {
        background-color: #25282D;
        font-size: 15px;
        width: 120px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        margin: auto;

        &:hover {
            cursor: pointer;
            background-color: #37393f;
        }

        @media screen and (max-width: 720px) {
            font-size: 12px;
            width: 115px;
            height: 28px;
            line-height: 28px;
        }

        @media screen and (max-width: 480px) {
            font-size: 10px;
            width: 110px;
            height: 26px;
            line-height: 26px;
        }
    }
}

</style>
