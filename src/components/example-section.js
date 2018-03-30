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
    sources: {
      type: Array,
      default: () => [
        { id: 'demo', title: 'Source code' },
        { id: 'dialog', title: 'Dialog component' }
      ]
    },
    moreSources: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeTab: 0
  }),
  render (h) {
    const Demo = loadDemo(this.id)
    const Content = loadContent(this.id)

    const sources = this.sources
      .concat(this.moreSources)
      .map(source => {
        source.Source = loadSource(this.id, source.id)
        return source
      })

    return (
      <section id={this.id} class="example">
        <header>
          <Content class="example-content"></Content>
        </header>
        <Card class="example-card">
          <Demo class="demo"></Demo>
          <Collapse>
            { sources.map(({ id, title, Source }) => (
              <CollapseItem title={title} key={id}>
                <Source></Source>
              </CollapseItem>
            )) }
          </Collapse>
        </Card>
      </section>
    )
  }
})
