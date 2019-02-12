const fs = require('fs')
const { JSDOM } = require('jsdom')

const Vue = require('vue/dist/vue.js')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()
const { createElementFromHTML, insertAfter } = require('./utils')

server.get('*', (req, res) => {
  const content = fs.readFileSync('./index.html', 'utf8');
  global.document = new JSDOM(content).window.document;

  const app = new Vue({
    el: '#app-container',
    components: {
      'hello-world': {
        template: `
          <div>{{ title }}</div>
        `,
        props: {
          title: String
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
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      console.error(err)
      res.status(500).end('Internal Server Error')
      return
    }

    const appEL = document.getElementById('app-container')

    // Insert global __TEMPLATE__ variable to be used by front
    const scriptEl = document.createElement('script');
    const inlineScript = document.createTextNode(`window.__TEMPLATE__ = \`${appEL.outerHTML}\`;`);
    scriptEl.appendChild(inlineScript)
    insertAfter(scriptEl, appEL)
    //

    appEL.parentElement.replaceChild(createElementFromHTML(html), appEL)

    res.end(document.documentElement.innerHTML)
  })
})

server.listen(4001)