import HomeV from '../components/Home.vue'
import dbTodo from './dbTodo'
import { createApp } from 'vue'

let app = createApp(HomeV)
app.use(dbTodo, { db: localStorage })
app.mount('#app')
