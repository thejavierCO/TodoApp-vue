import HomeV from '../page/Home.vue'
import dbTodo from './dbTodo'
import { createApp } from 'vue'
import { Button } from 'vant';
import { NavBar } from 'vant';
import TodoApi from './TodoApp'
import 'vant/lib/index.css';

let app = createApp(HomeV, {
  title: 'My app in working',
})

app.use(Button);
app.use(NavBar)

app.use(dbTodo, {
  use: new TodoApi(
    JSON.parse(localStorage.getItem('items')) ||
    JSON.stringify(localStorage.setItem('items', '{}')),
  ),
})

app.mount('#app')
