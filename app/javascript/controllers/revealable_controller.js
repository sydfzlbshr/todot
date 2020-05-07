import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["revealable"]

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

  revealReveables() { this.setRevealablesColor(this.REVEAL_COLOR) }

  hideRevealables() { this.setRevealablesColor(this.HIDE_COLOR) }

  setRevealablesColor(color) {
    this.revealableTargets.forEach(element => this.setElementColor(element, color))
  }

  setElementColor(element, color) { element.style.color = color }
}
