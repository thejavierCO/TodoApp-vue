const Tools = {
  DisplayElement(HTML, modifiers, instance) {
    const { id } = HTML.parentNode
    const { show, hidden } = modifiers
    if (modifiers.hasOwnProperty('auto')) {
      const autoComplete = (db) =>
        instance.db.get(db)
          ? (HTML.className = show ? 'show' : hidden ? 'hidden' : '')
          : (HTML.className = show ? 'hidden' : hidden ? 'show' : '')
      autoComplete(instance.db.length)
      id.addEventListener('change', ({ target }) => autoComplete(target.value))
      instance.db.on('update', () => autoComplete(id.value))
    } else HTML.className = show ? 'show' : hidden ? 'hidden' : ''
  },
  AutoCompleteMaxInput(HTML, modifiers, instance, value) {
    return modifiers.hasOwnProperty('auto')
      ? (HTML.max = instance.db.length)
      : (HTML.max = value)
  },
  DefinedBtn(HTML, modifiers, value, instance) {
    const { id } = HTML.parentNode
    let v = ''
    if (modifiers.hasOwnProperty('auto')) v = HTML.name
    else if (value != '') v = value
    HTML.addEventListener('click', function () {
      if (v == 'delete') instance.db.del(id.value)
      else if (v == 'clear') instance.db.clear()
      else instance.db.alert('not defined more btns')
    })
  },
  AutoCompleteDataForEventChange(HTML, modifiers, instance) {
    const { id } = HTML.parentNode
    if (modifiers.hasOwnProperty('onChange')) {
      id.addEventListener('change', ({ target }) => {
        if (instance.db.get(target.value)) {
          if (HTML.type == 'checkbox')
            HTML.checked = instance.db.get(target.value)[HTML.name]
          else if (HTML.type == 'text')
            HTML.value = instance.db.get(target.value)[HTML.name]
          else
            instance.db.alert('not defined accion in onchange task directive')
        } else {
          if (HTML.type == 'checkbox') HTML.checked = false
          else if (HTML.type == 'text') HTML.value = ''
          else
            instance.db.alert('not defined accion in onchange task directive')
        }
      })
    }
  },
}

export default {
  install(app, options) {
    app.config.globalProperties.db = options.use
    app.directive('db', this.DBdirective)
    app.mixin(this.DBmixin(options))
  },
  DBmixin({ use }) {
    return {
      data() {
        return {
          dbget: (a) => use.get(a),
          dbdel: (a) => use.del(a),
          dbpush: (a) => use.push(a),
          dbupdate: (a, b) => use.update(a, b),
        }
      },
      created() {
        if (
          this.$options.hasOwnProperty('events') &&
          typeof this.$options.events === 'object'
        )
          Object.keys(this.$options.events).forEach((e) =>
            typeof this.$options.events[e] === 'function'
              ? use.on(e, (evt) => this.$options.events[e](evt, this))
              : '',
          )
        else if (
          this.$options.hasOwnProperty('events') &&
          typeof this.$options.events === 'function'
        )
          try {
            const Fn = this.$options.events()
            if (typeof Fn === 'object')
              Object.keys(Fn).forEach((e) =>
                typeof Fn[e] === 'function'
                  ? use.on(e, (evt) => Fn[e](evt, this))
                  : '',
              )
          } catch (err) {
            this.db.alert('not return object in event', err)
          }
      },
    }
  },
  DBdirective(HTML, props) {
    if (HTML.parentNode.nodeName == 'FORM') {
      const { instance, modifiers, value } = props
      let { show, hidden, max, btn, task } = modifiers
      if ((show || hidden) && !(show & hidden))
        Tools.DisplayElement(HTML, modifiers, instance)
      else if (max && HTML.nodeName == 'INPUT')
        Tools.AutoCompleteMaxInput(HTML, modifiers, instance, value)
      else if (btn) Tools.DefinedBtn(HTML, modifiers, value, instance)
      else if (task)
        Tools.AutoCompleteDataForEventChange(HTML, modifiers, instance)
    } else instance.db.alert('require parent form')
  },
}
