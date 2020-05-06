import SwipeEventDispatcher from "./swipe_event_dispatcher"

export default class {

  THRESHOLD = 150
  RESTRAINT = 100
  DURATION = 300

  originalPosition;
  start;
  end;

  constructor(element) {
    this.element = element

    this.originalPosition = this.element.getBoundingClientRect().left - this.element.parentElement.getBoundingClientRect().left;
    this.addSwipeDetector()
  }

  addSwipeDetector() {
    this.element.addEventListener('touchstart', this.touchStart.bind(this), false)
    this.element.addEventListener('touchmove', this.touchMove.bind(this), false)
    this.element.addEventListener('touchend', this.touchEnd.bind(this), false)
  }

  touchStart(e) {
    this.start = {
      touch: e.changedTouches[0],
      time: new Date().getTime()
    }
  }

  touchMove(e) {
    this.end = {
      touch: e.changedTouches[0],
      time: new Date().getTime()
    }

    if (this.isHorizontalSwipe() && this.isRightSwipe()) {
      e.currentTarget.style.left = `${this.originalPosition + e.changedTouches[0].pageX}px`
    }

    e.preventDefault()
  }

  touchEnd(e) {
    this.end = {
      touch: e.changedTouches[0],
      time: new Date().getTime()
    }

    SwipeEventDispatcher(this.direction(), e.currentTarget)
    if (this.isHorizontalSwipe() && this.isRightSwipe()) e.currentTarget.style.display = 'none'
  }

  direction() {
    if (!this.isShortTouchDuration()) return 'none'

    if (this.isHorizontalSwipe()) return this.isRightSwipe() ? 'right' : 'left'
    if (this.isVerticalSwipe()) return this.isUpSwipe() ? 'up' : 'down'
  }

  isShortTouchDuration = () => this.end.time - this.start.time <= this.DURATION

  isRightSwipe = () => this.distanceX() > 0
  isHorizontalSwipe = () => Math.abs(this.distanceX()) >= this.THRESHOLD && Math.abs(this.distanceY()) <= this.RESTRAINT
  distanceX = () => this.end.touch.pageX - this.start.touch.pageX

  isUpSwipe = () => this.distanceY() < 0
  isVerticalSwipe = () => Math.abs(this.distanceY()) >= this.THRESHOLD && Math.abs(this.distanceX()) <= this.RESTRAINT
  distanceY = () => this.end.touch.pageY - this.start.touch.pageY
}
