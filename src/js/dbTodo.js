import TodoApi from './TodoApp'

let testing = {
  created() {
    console.log(this)
  },
}

export default {
  install: (app, options) => {
    console.log(app.mixin(testing))
  },
}
