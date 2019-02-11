/* eslint-disabled */
 import Vue from 'vue'

Vue.config.productionTip = false

const componentsToRegister = [
    {
      tagName: 'hello-world',
    componentResolver(resolve) {
        require(['./components/HelloWorld.vue'], resolve);
    }
  },
  {
      tagName: 'slot-component',
    componentResolver (resolve) {
        require(['./components/SlotComponent.vue'], resolve)
    }
  }
];

const registerComponents = () => {
    componentsToRegister.map(({ tagName, componentResolver }) => {
      Vue.component(tagName, componentResolver)
  });
};
registerComponents();

 new Vue({
     el: '#app-container',
 })