import { DialogComponent } from 'vue-modal-dialogs'
import { Prop, Component } from 'vue-property-decorator'

@Component({})
export default class TestTsx extends DialogComponent<boolean> {
  @Prop({ type: String, default: 'test' })
  title: String

  @Prop() content: String

  render (h) {
    return (
      <div class="test" onClick={ this.$close }>
        <span class="title">{ this.title }</span>
        <span class="content">{ this.content }</span>
      </div>
    )
  }
}
