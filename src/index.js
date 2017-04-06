import ToastrHelper from './ToastrHelper.js'

export default {
  install(Vue, {duration = 3000, container = '.toastr-container', autoshow = true, html = false, position = 'right top'} = {}) {
    const toastr = new ToastrHelper(duration, container, autoshow, html, position)
    Object.defineProperties(Vue.prototype, {
      $toastr: {
        get() {
          return toastr
        }
      }
    })
  }
}
