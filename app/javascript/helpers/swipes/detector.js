export default class {

  THRESHOLD = 15
  RESTRAINT = 50
  DURATION = 300

  originalPosition;
  startTouch;
  endTouch;

  constructor(element, callbacks) {
    this.element = element

    this.originalPosition = this.element.getBoundingClientRect().left - this.element.parentElement.getBoundingClientRect().left;

    this.startCallback = callbacks.start || function (swipe) { }
    this.moveCallback = callbacks.move || function (swipe) { }
    this.endCallback = callbacks.end || function (swipe) { }

    this.addDetectors()
  }

  addDetectors() {
    this.element.addEventListener('touchstart', this.touchStart.bind(this), false)
    this.element.addEventListener('touchmove', this.touchMove.bind(this), false)
    this.element.addEventListener('touchend', this.touchEnd.bind(this), false)
  }

  touchStart(e) {
    this.startTouch = e.changedTouches[0]

    this.startCallback(this)
  }

  touchMove(e) {
    this.endTouch = e.changedTouches[0]

    this.moveCallback(this)
  }

  touchEnd(e) {
    this.endTouch = e.changedTouches[0]

    this.endCallback(this)
  }

  direction() {
    if (this.isHorizontal()) return this.isRight() ? 'right' : 'left'
    if (this.isVertical()) return this.isUp() ? 'up' : 'down'

    return 'none'
  }

  isRight = () => this.distanceX() > 0
  isHorizontal = () => Math.abs(this.distanceX()) >= this.THRESHOLD && Math.abs(this.distanceY()) <= this.RESTRAINT
  distanceX = () => this.endTouch.pageX - this.startTouch.pageX

  isUp = () => this.distanceY() < 0
  isVertical = () => Math.abs(this.distanceY()) >= this.THRESHOLD && Math.abs(this.distanceX()) <= this.RESTRAINT
  distanceY = () => this.endTouch.pageY - this.startTouch.pageY

  moveElementAlong() {
    this.element.style.left = `${this.originalPosition + this.endTouch.pageX}px`
  }

  moveElementBack() {
    this.element.style.left = `${this.originalPosition}px`
  }
}