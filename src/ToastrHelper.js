import Vue from 'vue'
import Toastr from './Toastr.vue'

const ToastrCotr = Vue.extend(Toastr)
const openToastr = (propsData) => {
  return new ToastrCotr({
    el: document.createElement('div'),
    propsData
  })
}

class ToastrHelper {
  constructor(duration = 3000, container = '.toastr-container', autoshow = true, html = false, position = 'right top') {
    this.header = ''
    this.message = ''
    this.type = ''
    this.duration = duration
    this.container = container
    this.autoshow = autoshow
    this.html = html
    this.position = position
  }

  h(header) {
    this.header = header
    return this
  }

  _m(message) {
    this.message = message
    if (this.autoshow && this.type !== '') {
      this.show()
    }
    return this
  }

  i(message) {
    this.type = 'info'
    this._m(message)
    return this
  }

  s(message) {
    this.type = 'success'
    this._m(message)
    return this
  }

  e(message) {
    this.type = 'error'
    this._m(message)
    return this
  }

  w(message) {
    this.type = 'warning'
    this._m(message)
    return this
  }

  html(isHtml) {
    this.html = !!isHtml
    return this
  }

  duration(duration) {
    this.duration = duration
    return this
  }

  show() {
    return openToastr(this)
  }
}

export default ToastrHelper
