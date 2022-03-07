let testing = ({ use }) => ({
  data() {
    return {
      db: use,
      dbget: (a) => use.get(a),
      dbdel: (a) => use.del(a),
      dbpush: (a) => use.push(a),
      dbupdate: (a, b) => use.update(a, b),
    }
  },
  created() {
    if (this.$options.hasOwnProperty('events')) {
      Object.keys(this.$options.events).forEach((e) => {
        if (typeof this.$options.events[e] === 'function') {
          use.on(e, this.$options.events[e])
        }
      })
    }
  },
})

export default {
  install: (app, options) => {
    app.mixin(testing(options))
  },
}
