<template>
    <div class="weather" :style="{backgroundImage : 'url(' + require(`@/assets/img/${this.background}.jpg`) + ')'}">
        <form @submit.prevent="getWeather">
            <input type="text" v-model="this.location" placeholder="City..." ref="city">
            <div v-if="this.error" class="error">{{this.error}}</div>
        </form>
        <div v-if="data" class="weatherInfos">
            <span class="city">{{ data.name }}, {{ data.sys.country }}</span>
            <div class="inf">
                <span class="tmp">{{ Math.round(data.main.temp - 273.15)}}°c</span>
                <span class="weath">{{ data.weather[0].main }}</span>
            </div>
            
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            location: "",
            apiKey: "",
            data: undefined,
            background: "Clear",
            error: undefined
        }
    },
    methods: {
        async getWeather() {
            try {
                let {data} = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.location + '&appid=' + this.apiKey)
                this.data = data
                this.location = ""
                this.background = data.weather[0].main
                this.error = undefined
            } catch(e) {
                this.error = "Unknown city"
            }
        }
    },
    mounted() {
        this.$refs.city.focus()
    }
}

</script>

<style lang="scss" scoped>

.weather {
    min-height: 100vh;
    background-size: cover;
    background-position: center;
    padding: 120px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;

    &::after {
        content: "";
        position: absolute;
        top: 0; 
        left: 0;
        width: 100%; 
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }

    @media screen and (max-width: 1024px) {
        padding: 70px 0px;
    }

    form {
        max-width: 400px;
        width: 80%;
        z-index: 1;

        input {
            font-family: Yanone Kaffeesatz,sans-serif;
            font-size: 25px;
            padding: 5px 20px 0px 20px;
            width: 100%;
            height: 50px;
            color: rgb(71, 71, 71);
            box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 10px 0px;
            border: none;
            border-radius: 10px;

            &:focus {
                outline: none;
            }

            @media screen and (max-width: 720px) {
                font-size: 23px;
                height: 45px;
                padding: 4px 20px 0px 20px;
            }

            @media screen and (max-width: 480px) {
                font-size: 20px;
                height: 40px;
                padding: 3px 20px 0px 20px;
            }
        }

        .error {
            text-align: left;
            padding: 10px 0px 0px 20px;
            font-size: 17px;
            color: red;
        }
    }
    

    .weatherInfos {
        z-index: 1;
        color: white;
        max-width: 500px;
        margin-top: 50px;
        width: 85%;
        display: flex;
        flex-direction: column;

        .city {
            font-size: 30px;

            @media screen and (max-width: 720px) {
                font-size: 25px;
            }

            @media screen and (max-width: 480px) {
                font-size: 22px;
            }
        }

        .inf {
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .tmp {
                padding: 10px 25px;
                font-size: 90px;
                font-weight: 900;
                text-shadow: 3px 6px rgb(0 0 0 / 25%);
                background-color: hsla(0,0%,100%,.25);
                border-radius: 16px;
                box-shadow: 3px 6px rgb(0 0 0 / 25%);

                @media screen and (max-width: 720px) {
                    font-size: 65px;
                }

                @media screen and (max-width: 480px) {
                    font-size: 45px;
                }
            }
    
            .weath {
                font-size: 45px;
                font-style: italic;

                @media screen and (max-width: 720px) {
                    font-size: 36px;
                }

                @media screen and (max-width: 480px) {
                    font-size: 28px;
                }
            }
        }
    }
}

</style>