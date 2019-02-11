global.window = {
  navigator: {
    userAgent: 'a'
  }
}
const fs = require('fs')
const { JSDOM } = require('jsdom')

const content = fs.readFileSync('./index.html', 'utf8');

global.document = new JSDOM(content).window.document;


const Vue = require('vue/dist/vue.js')
const server = require('express')()
const HelloWorld = require('./client/dist/js/chunk-71654c89.f4a4b58b.js');
const SlotComponent = require('./client/dist/js/chunk-0d5eb1c6.644b291d.js');

const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
  Vue.component('hello-world', (h) => h(HelloWorld))
  Vue.component('slot-component', (h) => h(SlotComponent))

  const app = new Vue({
    el: '#app-container'
  })

  renderer.renderToString(app, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head><title>Hello</title></head>
        <body>${html}</body>
      </html>
    `)
  })
})

server.listen(4001)