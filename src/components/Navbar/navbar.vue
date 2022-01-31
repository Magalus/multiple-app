<template>
    <nav>
        <div id="nav">
            <router-link to="/todo">To-do list</router-link>
            <router-link to="/meteo">Météo</router-link>
            <router-link to="/quiz">Quiz</router-link>
            <router-link to="/de">Jeu de dés</router-link>
            <router-link to="/memoire">Jeu des paires</router-link>
        </div>
        <div class="button-responsive" @click="this.isResponsiveNav = !this.isResponsiveNav">
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
        </div>
        <div class="nav-responsive" :style="this.isResponsiveNav ? 'width: 280px;' : 'width: 0px;' ">
            <div class="close" @click="this.isResponsiveNav = !this.isResponsiveNav"></div>
            <router-link 
                class="nav-links-responsive" 
                @click="this.isResponsiveNav = !this.isResponsiveNav"
                to="/todo">
                To-do list
            </router-link>
            <router-link 
                class="nav-links-responsive" 
                @click="this.isResponsiveNav = !this.isResponsiveNav"
                to="/meteo">
                Météo
            </router-link> 
            <router-link 
                class="nav-links-responsive" 
                @click="this.isResponsiveNav = !this.isResponsiveNav"
                to="/quiz">
                Quiz
            </router-link> 
            <router-link 
                class="nav-links-responsive" 
                @click="this.isResponsiveNav = !this.isResponsiveNav"
                to="/de">
                Jeu de dés
            </router-link>
            <router-link 
                class="nav-links-responsive" 
                @click="this.isResponsiveNav = !this.isResponsiveNav"
                to="/memoire">
                Jeu des paires
            </router-link> 
        </div>
    </nav>
</template>

<script>

export default {
    data() {
        return {
            isResponsiveNav: false,
        }
    }
}

</script>

<style lang="scss" scoped>

#nav {
    font-family: Yanone Kaffeesatz,sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    font-size: 22px;
    padding: 30px;
    width: 100%;
    height: 25px;
    position: absolute;
    z-index: 1;

    @media screen and (max-width: 1024px) {
        display: none;
    }

    a {
        text-decoration: none;
        color: white;
        margin: 0px 15px;
        transition: all ease 0.35s;

        &:hover {
            color:#42b983;
        }
    }

    .router-link-exact-active {
        color: #42b983;
    }
}

.nav-responsive {
    font-family: Yanone Kaffeesatz,sans-serif;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    width: 320px;
    height: 100%;
    z-index: 99;
    background-color: #141312;
    box-shadow: 0 0 10px rgb(0 0 0 / 20%);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 60px 0 40px 0;
    transition: ease-in-out 0.5s;
    
    .close {
        position: absolute;
        right: 15px;
        top: 17px;
        width: 32px;
        height: 32px;
        opacity: 0.6;

        &:hover {
            opacity: 1;
            cursor: pointer;
        }

        &:after, &::before {
            position: absolute;
            left: 15px;
            top: 5px;
            content: ' ';
            height: 20px;
            width: 2px;
            background-color: white;
        }

        &:after {
            transform: rotate(45deg);
        }
        
        &:before {
            transform: rotate(-45deg);
        }
    }

    .nav-links-responsive {
        color: #ddd;
        text-align: center;
        font-size: 23px;
        font-weight: 300;
        text-decoration: none;
        width: 100%;
        cursor: pointer;
        padding: 10px 15px;
        white-space: nowrap;
        overflow: hidden;
        transition: all ease 0.35s;

        &:nth-child(2) {
            padding-top: 20px;
        }


        &:hover {
            color:#42b983;
        }
    }

    .router-link-exact-active {
            color: #42b983;
    }

    @media screen and (min-width: 1024px) {
        width: 0px !important;
    }
}

.button-responsive {
    position: absolute;
    top: 10px;
    right: 18px;
    width: 35px;
    height: 35px;
    cursor: pointer;
    display: none;
    z-index: 1;

    span {
        width: 22px;
        height: 2px;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0px;
        margin: auto;
        background: #fff;

        &:first-child {
            top: -12px;
        }

        &:last-child {
            top: 13px;
        }
    }

    @media screen and (max-width: 1024px) {
        display: inline;
    }
}
</style>