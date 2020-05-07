export default function (swipedir, element) {
  element.dispatchEvent(new Event(`swipe${swipedir}`))
}
