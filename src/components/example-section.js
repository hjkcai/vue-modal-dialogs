'use strict'

import Vue from 'vue'
import { Card, Collapse, CollapseItem } from 'element-ui'

import '../assets/example-section.scss'

function loadDemo (id) {
  return require(`../examples/${id}/demo.vue`).default
}

function loadContent (id) {
  return require(`../examples/${id}/index.vue`).default
}

function loadSource (id, name) {
  return require(`!!vue-loader!../lib/source-loader!../examples/${id}/${name}.vue`).default
}

export default Vue.extend({
  props: {
    id: String,
    description: String
  },
  data: () => ({
    activeTab: 0
  }),
  render (h) {
    const Demo = loadDemo(this.id)
    const Content = loadContent(this.id)
    const DemoSource = loadSource(this.id, 'demo')
    const DialogSource = loadSource(this.id, 'dialog')

    return (
      <section id={this.id} class="example">
        <header>
          <Content class="example-content"></Content>
        </header>
        <Card class="example-card">
          <Demo class="demo"></Demo>
          <Collapse>
            <CollapseItem title="Source code">
              <DemoSource></DemoSource>
            </CollapseItem>
            <CollapseItem title="Dialog component">
              <DialogSource></DialogSource>
            </CollapseItem>
          </Collapse>
        </Card>
      </section>
    )
  }
})
