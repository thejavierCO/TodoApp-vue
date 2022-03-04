let testing = ({ use }) => ({
  created(a) {
    console.log(a, use)
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
