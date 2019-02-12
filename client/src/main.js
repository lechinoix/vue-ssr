/* eslint-disabled */
import Vue from 'vue/dist/vue.js';

Vue.config.productionTip = false

console.log(window.__TEMPLATE__)

 new Vue({
     template: window.__TEMPLATE__,
     components: {
      'hello-world': {
        template: `
          <div>{{ title }}</div>
        `,
        props: {
          title: String
        },
        created: function() {
          console.log('created')
        }
      },
      'slot-component': {
        template: `
          <div>
            HELLLOO
            <button @click="onClick">Click me</button>
            <slot></slot>
          </div>
        `,
        methods: {
          onClick: function() {
            alert('hello');
          }
        }
      }
    }
 }).$mount('#app-container')