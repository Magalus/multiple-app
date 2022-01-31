import { createRouter, createWebHistory } from 'vue-router'
import Quiz from '../views/quiz.vue'
import Weather from '../views/weather.vue'
import Dice from '../views/dice.vue'
import Memory from '../views/memory.vue'
import Todo from '../views/todo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Todo
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/meteo',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/de',
    name: 'Dice',
    component: Dice
  },
  {
    path: '/memoire',
    name: 'Memory',
    component: Memory
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
