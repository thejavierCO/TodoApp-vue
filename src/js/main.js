import HomeV from '../page/Home.vue'
import dbTodo from './dbTodo'
import { createApp } from 'vue'

let app = createApp(HomeV, {
  title: 'Hola',
})

app.use(dbTodo, {
  dbtype: 'local',
  use: localStorage,
})

app.mount('#app')
