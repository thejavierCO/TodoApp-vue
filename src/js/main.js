import HomeV from '../page/Home.vue'
import dbTodo from './dbTodo'
import { createApp } from 'vue'
import TodoApi from './TodoApp'

let app = createApp(HomeV, {
  title: 'Hola',
})

app.use(dbTodo, {
  dbtype: 'local',
  use: new TodoApi(
    JSON.parse(localStorage.getItem('items')) ||
      JSON.stringify(localStorage.setItem('items', '{}')),
  ),
})

app.mount('#app')
