import { VueElement } from "vue"

export default {
  install: (app: any, options: any) => {
    let { db } = options
    if (typeof db === 'object') {
      console.log(db, app)
    } else {
      throw 'require db'
    }
  },
}