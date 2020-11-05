import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import'../public/build/css/output.css'
import PulseLoader from '../node_modules/vue-spinner/src/PulseLoader.vue'
import axios from 'axios'
import httpClient from './api/httpClient'
import store from './store'
//"tailwind": "./node_modules/.bin/tailwind build ./src/assets/css/tailwind.css -c ./tailwind.js -o ./src/assets/css/output.css"

const app = createApp(App)
app.component('PulseLoader', PulseLoader)
app.use(router)
app.use(store)
app.mount('#app')
