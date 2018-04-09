import { Button } from 'element-ui'
import { Component, Prop } from 'vue-property-decorator'
import { DialogComponent } from 'vue-modal-dialogs'

@Component
export default class TsComfirm extends DialogComponent<boolean> {
  @Prop()
  title: string

  @Prop()
  content: string

  yes () {
    this.$close(true)
  }

  no () {
    this.$close(false)
  }

  render (h) {
    // Highlight.js seems not happy with jsx currently
    return (
      <div class="message-box dialog-mask" onClick={ this.no }>
        <div class="dialog-content">
          <header>{ this.title }</header>
          <div class="dialog-body">
            <p>{ this.content }</p>
          </div>
          <footer>
            <Button type="text" size="mini" onClick={ this.yes }>Yes</Button>
            <Button type="text" size="mini" onClick={ this.no }>No</Button>
          </footer>
        </div>
      </div>
    )
  }
}
