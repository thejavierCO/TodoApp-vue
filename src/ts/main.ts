import Home from '../components/Home.vue'
import dbTodo from './dbTodo'
import { createApp } from 'vue'
let app = createApp(Home)

app.use(dbTodo, { db: localStorage })

app.mount('#app').$props = {
  title: "test"
}