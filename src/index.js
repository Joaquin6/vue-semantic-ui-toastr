import ToastrHelper from './ToastrHelper.js'

export default {
  install(Vue, {duration = 3000, container = '.toastr-container', autoshow = true, html = false} = {}) {
    Object.defineProperties(Vue.prototype, {
      $toastr: {
        get() {
          return new ToastrHelper(duration, container, autoshow, html)
        }
      }
    })
  }
}
