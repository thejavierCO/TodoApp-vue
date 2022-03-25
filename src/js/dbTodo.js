let testing = ({ use }) => ({
  data() {
    return {
      dbget: (a) => use.get(a),
      dbdel: (a) => use.del(a),
      dbpush: (a) => use.push(a),
      dbupdate: (a, b) => use.update(a, b),
    }
  },
  created() {
    if (this.$options.hasOwnProperty('events'))
      Object.keys(this.$options.events).forEach((e) =>
        typeof this.$options.events[e] === 'function'
          ? use.on(e, (evt) => this.$options.events[e](evt, this))
          : '',
      )
  },
})

export default {
  install: (app, options) => {
    const { use } = options
    app.config.globalProperties.db = use
    app.directive('db', (HTML, props) => {
      if (HTML.parentNode.nodeName == 'FORM') {
        const { instance, modifiers, value } = props
        let { show, hidden, max, btn, task } = modifiers
        if ((show || hidden) && !(show & hidden)) {
          const { id } = HTML.parentNode
          const { auto } = modifiers
          if (auto) {
            const autoComplete = (db) =>
              instance.db.get(db)
                ? (HTML.className = show ? 'show' : hidden ? 'hidden' : '')
                : (HTML.className = show ? 'hidden' : hidden ? 'show' : '')
            autoComplete(instance.db.length)
            id.addEventListener('change', ({ target }) =>
              autoComplete(target.value),
            )
            instance.db.on('update', () => autoComplete(id.value))
          } else HTML.className = show ? 'show' : hidden ? 'hidden' : ''
        } else if (max && HTML.nodeName == 'INPUT') {
          modifiers.hasOwnProperty('auto')
            ? (HTML.max = instance.db.length)
            : (HTML.max = value)
        } else if (btn) {
          const { id } = HTML.parentNode
          const { auto } = modifiers
          let v = ''
          if (auto) v = HTML.name
          else if (value != '') v = value
          HTML.addEventListener('click', function () {
            if (v == 'delete') instance.db.del(id.value)
            else if (v == 'clear') instance.db.clear()
            else instance.db.alert('not defined more btns')
          })
        } else if (task) {
          const { id } = HTML.parentNode
          const { onChange } = modifiers
          if (onChange) {
            id.addEventListener('change', ({ target }) => {
              if (instance.db.get(target.value)) {
                if (HTML.type == 'checkbox')
                  HTML.checked = instance.db.get(target.value)[HTML.name]
                else if (HTML.type == 'text')
                  HTML.value = instance.db.get(target.value)[HTML.name]
                else
                  instance.db.alert(
                    'not defined accion in onchange task directive',
                  )
              } else {
                if (HTML.type == 'checkbox') HTML.checked = false
                else if (HTML.type == 'text') HTML.value = ''
                else
                  instance.db.alert(
                    'not defined accion in onchange task directive',
                  )
              }
            })
          }
        }
      } else instance.db.alert('require parent form')
    })
    app.mixin(testing(options))
  },
}
