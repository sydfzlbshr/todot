// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"

import SwipeDetector from "../helpers/swipes/detector"
import EventDispatcher from "../helpers/swipes/event_dispatcher"

export default class extends Controller {

  connect() {
    new SwipeDetector(this.element, {
      move: (swipe) => {
        if (swipe.isHorizontal()) swipe.moveElementAlong()
      },

      end: (swipe) => {
        EventDispatcher(swipe.direction(), this.element)
        if (swipe.isHorizontal() && swipe.isRight()) this.element.style.display = 'none'
        swipe.moveElementBack()
      }
    })
  }
}
