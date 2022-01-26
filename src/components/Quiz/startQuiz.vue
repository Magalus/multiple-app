<template>
    <div class="startGame" @click="startGame()">Start Quiz</div>
</template>

<script>

export default {
    methods: {
        startGame() {
            this.$emit('startGame', true)
        }
    }
}

</script>

<style lang="scss" scoped>

.startGame {
    background-color: #25282D;
    width: 280px;
    height: 100px;
    font-weight: bold;
    font-size: 20px;
    line-height: 100px;
    color: white;
    border-radius: 5px;
    margin: auto;
    align-self: center;

    &:hover {
        cursor: pointer;
        background-color: #37393f;
    }

    @media screen and (max-width: 720px) {
        width: 250px;
        height: 80px;
        line-height: 80px;
        font-weight: bold;
        font-size: 18px;
    }

    @media screen and (max-width: 480px) {
        width: 200px;
        height: 60px;
        line-height: 60px;
        font-weight: bold;
        font-size: 16px;
    }
}

</style>