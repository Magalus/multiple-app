import { createRouter, createWebHistory } from 'vue-router'
import Quiz from '../views/quiz.vue'
import Weather from '../views/weather.vue'

const routes = [
  {
    path: '/quiz',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/meteo',
    name: 'Weather',
    component: Weather
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
