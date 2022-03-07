// let testing = ({ use }) => ({
//   created() {
//     console.log(use, this)
//   },
//   mounted() {
//     use.init()
//   },
// })

export default {
  install: (app, options) => {
    app.directive('db', (HTML, { modifiers }, component) => {
      const { use } = options
      if (modifiers) {
        const { max, lastItem, firstItem } = modifiers
        if (HTML.nodeName == 'INPUT') {
          if (max) {
            if (typeof HTML.min === 'number') {
              HTML.max = use.length
            } else if (typeof HTML.value === 'string') {
              HTML.value = use.length
            }
          } else if (lastItem) {
          } else if (firstItem) {
          }
        } else {
          console.log('none')
        }
      }
    })
    // app.mixin(testing(options))
  },
}
