import TodoApi from './TodoApp'

export default {
  install: (app, options) => {
    let { db } = options
    if (typeof db === 'object') {
      console.log(db, app)
    } else {
      throw 'require db'
    }
  },
}
