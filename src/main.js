import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import'../public/build/css/output.css'
import axios from 'axios'
//"tailwind": "./node_modules/.bin/tailwind build ./src/assets/css/tailwind.css -c ./tailwind.js -o ./src/assets/css/output.css"

const app = createApp(App)
app.use(router)
app.mount('#app')
