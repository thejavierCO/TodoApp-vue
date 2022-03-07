let testing = ({ use }) => ({
  created() {
    if (this.$options.hasOwnProperty('events')) {
      // console.log(Object.keys(this.$options.events))
      if (this.$options.events.hasOwnProperty('update')) {
        if (typeof this.$options.events.update === 'function') {
          use.on('update', this.$options.events.update)
        }
      } else if (this.$options.events.hasOwnProperty('delete')) {
        if (typeof this.$options.events.delete === 'function') {
          use.on('delete', this.$options.events.delete)
        }
      } else if (this.$options.events.hasOwnProperty('clear')) {
        if (typeof this.$options.events.clear === 'function') {
          use.on('clear', this.$options.events.clear)
        }
      }
    }
    console.log(use)
  },
  mounted() {
    use.init()
  },
})

export default {
  install: (app, options) => {
    app.mixin(testing(options))
  },
}
