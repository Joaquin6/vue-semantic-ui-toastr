<template lang="html">
  <transition name="toastr" appear @after-leave="afterLeave">
    <div class="ui animated toastr message" @click="close" :class="[messageType, horizontal, vertical]" v-if="show">
      <div class="header" v-if="header">{{header}}</div>
      <p v-if="html" v-html="message"></p>
      <p v-else>{{ message }}</p>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

const HORIZONTAL = ['left', 'center', 'right']
const VERTICAL = ['top', 'middle', 'bottom']

export default {
  name: 'toastr',
  props: {
    header: String,
    message: String,
    type: String,
    duration: {
      type: Number,
      default: 3000
    },
    html: {
      type: Boolean,
      default: false
    },
    container: {
      type: String,
      default: '.toastr-container'
    },
    position: {
    	type: String,
      default: 'right top',
      validator(val) {
        return HORIZONTAL.some(h => val.includes(h))
          && VERTICAL.some(v => val.includes(v))
      }
    }
  },
  data() {
    return {
      $_parent_: null,
      $_el_: null,
      show: true
    }
  },
  computed: {
    messageType() {
      if (this.type) {
        return {
          [this.type]: true
        }
      }
    },
    horizontal() {
      for (let h of HORIZONTAL) {
        if (this.position.includes(h)) {
          return h
        }
      }
    },
    vertical() {
      for (let v of VERTICAL) {
        if (this.position.includes(v)) {
          return v
        }
      }
    }
  },
  created() {
    let $parent = this.$parent
    if (!$parent) {
      let parent = document.querySelector(this.container)
      if (!parent) {
        // Lazy creating `div.conatiner` container.
        const className = this.container.replace('.', '')
        const horizontal = this.horizontal
        const vertical = this.vertical
        const Container = Vue.extend({
          name: 'Container',
          render (h) {
            return h('div', {
              class: {
                [`${className}`]: true,
                [`${horizontal}`]: true,
                [`${vertical}`]: true
              }
            })
          }
        })
        $parent = new Container().$mount()
        document.body.appendChild($parent.$el)
      } else {
        $parent = parent.__vue__
      }
      // Hacked.
      this.$_parent_ = $parent
      this.$_el_ = $parent
        ? $parent.$el
        : parent
    }
  },
  mounted () {
    if (this.$_el_) {
      this.$_el_.appendChild(this.$el)
    }
    if (this.$_parent_) {
      this.$parent = this.$_parent_
      delete this.$_parent_
    }
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration)
    }
  },
  destroyed () {
    this.$el.remove()
  },
  methods: {
    afterLeave() {
      this.$destroy()
    },
    close() {
      clearTimeout(this.timer)
      this.show = false
    }
  }
}
</script>

<style lang="css">
/* toastr-container */
.toastr-container {
  position: fixed;
  width: 0;
}
.toastr-container.right {
  right: 0;
}
.toastr-container.left {
  left: 300px;
}
.toastr-container.top {
  top: 0;
}
.toastr-container.bottom {
  bottom: 0;
}
.toastr-container.middle {
  top: 50%;
  margin-top: -35px;
}
.toastr-container.center {
  left: 50%;
  margin-left: 150px;
}

/* toastr */
.ui.message.toastr {
  min-width: 300px;
  cursor: pointer;
  box-shadow: 0px 0px 0px 1px rgba(34, 36, 38, 0.22) inset, 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15);
  float: right;
}
.ui.message.toastr.top {
  margin-top: 5px;
  margin-bottom: 0px;
}
.ui.message.toastr.left {
  margin-right: -5px;
}
.ui.message.toastr.right {
  margin-right: 5px;
}
.ui.message.toastr.bottom {
  margin-top: 0px;
  margin-bottom: 5px;
}
.ui.message.toastr.middle {
  margin-top: 0px;
  margin-bottom: 5px;
}

/* transition */
.ui.toastr.animated.message {
  transition: all 0.35s;
}
.toastr-enter,
.toastr-leave-to {
  opacity: 0;
}
.left > .toastr-enter,
.left > .toastr-leave-to {
  transform: translateX(-30px);
}
.right > .toastr-enter,
.right > .toastr-leave-to {
  transform: translateX(30px);
}
.top.center > .toastr-enter,
.top.center > .toastr-leave-to {
  transform: translateY(-30px);
}
.bottom.center > .toastr-enter,
.bottom.center > .toastr-leave-to {
  transform: translateY(30px);
}
</style>
