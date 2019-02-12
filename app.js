const fs = require('fs')
const { JSDOM } = require('jsdom')

const Vue = require('vue/dist/vue.js')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  const content = fs.readFileSync('./index.html', 'utf8');
  global.document = new JSDOM(content).window.document;

  function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

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
      res.status(500).end('Internal Server Error')
      return
    }

    const appEL = document.getElementById('app-container')

    const scriptEl = document.createElement('script');
    const inlineScript = document.createTextNode(`window.__TEMPLATE__ = \`${appEL.outerHTML}\`;`);
    scriptEl.appendChild(inlineScript)
    insertAfter(scriptEl, appEL)

    appEL.parentElement.replaceChild(createElementFromHTML(html), appEL)

    res.end(document.documentElement.innerHTML)
  })
})

server.listen(4001)