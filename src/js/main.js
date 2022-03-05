import HomeV from '../page/Home.vue'
import dbTodo from './dbTodo'
import { createApp } from 'vue'
import TodoApi from './TodoApp'

let app = createApp(HomeV, {
  title: 'My app in working',
})

app.use(dbTodo, {
  use: new TodoApi(
    JSON.parse(localStorage.getItem('items')) ||
      JSON.stringify(localStorage.setItem('items', '{}')),
  ),
})

app.mount('#app')
