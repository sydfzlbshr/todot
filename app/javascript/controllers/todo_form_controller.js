import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["titleInput", "dueAtSelect", "actionsDiv"]

  connect() {}

  toggleShow() {
    if (this.titleInputTarget.value.length > 0) {
      this.dueAtSelectTarget.style.visibility = 'visible'
      this.actionsDivTarget.style.visibility = 'visible'
    } else {
      this.dueAtSelectTarget.style.visibility = 'hidden'
      this.actionsDivTarget.style.visibility = 'hidden'
    }
  }

  reset(e) {
    this.titleInputTarget.value = ''
    this.dueAtSelectTarget.style.visibility = 'hidden'
    this.actionsDivTarget.style.visibility = 'hidden'

    e.preventDefault()
  }
}
