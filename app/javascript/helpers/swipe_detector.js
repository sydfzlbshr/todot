import SwipeEventDispatcher from "./swipe_event_dispatcher"

export default class {

  startTouchObj;
  startTime;

  endTouchObj;
  endTime;

  swipedir = 'none';

  constructor(element) {
    this.element = element

    this.addSwipeDetector()
  }

  addSwipeDetector() {
    this.element.addEventListener('touchstart', this.touchStart.bind(this), false)
    this.element.addEventListener('touchmove', this.touchMove.bind(this), false)
    this.element.addEventListener('touchend', this.touchEnd.bind(this), false)
  }

  touchStart(e) {
    this.startTouchObj = e.changedTouches[0]
    this.startTime = new Date().getTime()

    e.preventDefault()
  }

  touchMove(e) {
    e.preventDefault()
  }

  touchEnd(e) {
    this.endTouchObj = e.changedTouches[0]
    this.endTime = new Date().getTime()

    this.calculateSwipeDirection()
    SwipeEventDispatcher(this.swipedir, e.currentTarget)

    e.preventDefault()
  }

  calculateSwipeDirection() {
    var threshold = 150, //required min distance traveled to be considered swipe
      restraint = 100, // maximum distance allowed at the same time in perpendicular direction
      allowedTime = 300 // maximum time allowed to travel that distance


    var distX = this.endTouchObj.pageX - this.startTouchObj.pageX, // get horizontal dist traveled by finger while in contact with surface
      distY = this.endTouchObj.pageY - this.startTouchObj.pageY // get vertical dist traveled by finger while in contact with surface

    if (this.endTime - this.startTime <= allowedTime) { // first condition for awipe met
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
        this.swipedir = (distX < 0) ? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
      }
      else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
        this.swipedir = (distY < 0) ? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
      }
    }
  }
}
