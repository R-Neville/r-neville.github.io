export function dispatch(
  eventType: string,
  element: HTMLElement,
  detail: object
) {
  const event = new CustomEvent(eventType, {
    bubbles: true,
    detail,
  });
  element.dispatchEvent(event);
}

export function addEvent(
  element: HTMLElement|Document|Window,
  eventType: string,
  handler: (event: CustomEvent) => void
) {
  element.addEventListener(eventType, handler as EventListener);
}

export function removeEvent(
  element: HTMLElement|Document|Window,
  eventType: string,
  handler: (event: CustomEvent) => void
) {
  element.removeEventListener(eventType, handler as EventListener);
}
