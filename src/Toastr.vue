<template lang="html">
  <transition name="toastr" appear @after-leave="afterLeave">
    <div class="ui compact animated toastr right message" @click="close" :class="[messageType]" v-if="show">
      <div class="header" v-if="header">{{header}}</div>
      <p v-if="html" v-html="message"></p>
      <p v-else>{{ message }}</p>
    </div>
  </transition>
</template>

<script>
import Vue from 'vue'

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
    }
  },
  created() {
    let $parent = this.$parent
    if (!$parent) {
      let parent = document.querySelector(this.container)
      if (!parent) {
        // Lazy creating `div.conatiner` container.
        const className = this.container.replace('.', '')
        const Container = Vue.extend({
          name: 'Container',
          render (h) {
            return h('div', {
              class: {
                [`${className}`]: true
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
.toastr-container {
  position: fixed;
  top: 0;
  right: 0;
  width: 0;
  /*max-width: 300px;*/
}

.ui.message.toastr {
  min-width: 300px;
  margin: 5px 5px 0px 0px;
  cursor: pointer;
  box-shadow: 0px 0px 0px 1px rgba(34, 36, 38, 0.22) inset, 0px 2px 4px 0px rgba(34, 36, 38, 0.12), 0px 2px 10px 0px rgba(34, 36, 38, 0.15);
}
.ui.message.toastr.right {
  float: right;
}

.ui.toastr.animated.message {
  transition: all 0.35s;
}

/* transition */
.toastr-enter, .toastr-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
