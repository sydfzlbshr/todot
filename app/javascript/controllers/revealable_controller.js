import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["colorable", "hidable"]

  REVEAL_DURATION = 3333 // milliseconds
  REVEAL_COLOR = ''
  REVEAL_VISIBILITY = 'visible'
  
  HIDE_COLOR = 'transparent'
  HIDE_VISIBILITY = 'hidden'

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

  revealReveables() {
    this.setColorablesColor(this.REVEAL_COLOR)
    this.setHidablesVisibility(this.REVEAL_VISIBILITY)
  }

  hideRevealables() {
    this.setColorablesColor(this.HIDE_COLOR)
    this.setHidablesVisibility(this.HIDE_VISIBILITY)
  }

  setColorablesColor(color) {
    this.colorableTargets.forEach(element => this.setElementColor(element, color))
  }

  setHidablesVisibility(visibility) {
    this.hidableTargets.forEach(element => this.setElementVisibility(element, visibility))
  }

  setElementColor(element, color) { this.setElementAttributeValue(element, 'color', color) }
  setElementVisibility(element, visibility) { this.setElementAttributeValue(element, 'visibility', visibility) }

  setElementAttributeValue(element, attribute, value) { element.style[attribute] = value }
}
