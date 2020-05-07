import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["colorable"]

  REVEAL_DURATION = 3000 // seconds
  REVEAL_COLOR = ''
  
  HIDE_COLOR = 'transparent'

  connect() {
    this.waitAndHideRevealables()
  }

  reveal() {
    this.revealReveables()
    this.waitAndHideRevealables()
  }

  waitAndHideRevealables() {
    setTimeout(() => this.hideRevealables(), this.REVEAL_DURATION)
  }

  revealReveables() { this.setColorablesColor(this.REVEAL_COLOR) }

  hideRevealables() { this.setColorablesColor(this.HIDE_COLOR) }

  setColorablesColor(color) {
    this.colorableTargets.forEach(element => this.setElementColor(element, color))
  }

  setElementColor(element, color) { element.style.color = color }
}
