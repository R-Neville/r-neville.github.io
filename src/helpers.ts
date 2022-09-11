const MIN_INTERVAL_DURATION = 10; // Milliseconds.

export function applyStyles(
  element: HTMLElement,
  styles: { [prop: string]: string }
) {
  for (let prop in styles) {
    console.log(prop);
    element.style.setProperty(prop, styles[prop]);
  }
}

export function slideDown(
  element: HTMLElement,
  displayType: string,
  durationFactor: number
) {
  if (element.style.display === displayType) {
    // The element is already displayed.
    // Abort transition.
    return;
  }

  // Get the elements display height
  // and prepare for transition:
  element.style.visibility = "hidden";
  element.style.display = displayType;
  const targetHeight = element.getBoundingClientRect().height;
  element.style.height = "0px";
  element.style.visibility = "visible";

  // Perform transition:
  const HEIGHT_INCREMENT = targetHeight / durationFactor;
  let currentHeight = 0;
  const intervalID = setInterval(() => {
    durationFactor -= 1;
    currentHeight += HEIGHT_INCREMENT;
    element.style.height = currentHeight + "px";
    if (durationFactor === 0) {
      element.style.height = "auto";
      clearInterval(intervalID);
    }
  }, MIN_INTERVAL_DURATION);
}

export function slideUp(
  element: HTMLElement,
  durationFactor: number,
  callback?: () => void
) {
  if (element.style.display === "none") {
    // The element is already not displayed.
    // Abort transition.
    return;
  }

  // Perform transition:
  let currentHeight = element.getBoundingClientRect().height;
  const HEIGHT_INCREMENT = currentHeight / durationFactor;
  const intervalID = setInterval(() => {
    durationFactor -= 1;
    currentHeight -= HEIGHT_INCREMENT;
    element.style.height = currentHeight + "px";
    if (durationFactor === 0) {
      element.style.display = "none";
      element.style.height = "auto";
      clearInterval(intervalID);
      if (callback) {
        callback();
      }
    }
  }, MIN_INTERVAL_DURATION);
}

export function slideIn(
  element: HTMLElement,
  displayType: string,
  durationFactor: number
) {
  if (element.style.display === displayType) {
    // The element is already displayed.
    // Abort transition.
    return;
  }

  // Get the elements display width
  // and prepare for transition:
  element.style.visibility = "hidden";
  element.style.display = displayType;
  const targetWidth = element.getBoundingClientRect().width;
  element.style.width = "0px";
  element.style.visibility = "visible";

  // Perform transition:
  const WIDTH_INCREMENT = targetWidth / durationFactor;
  let currentWidth = 0;
  const intervalID = setInterval(() => {
    durationFactor -= 1;
    currentWidth += WIDTH_INCREMENT;
    element.style.width = currentWidth + "px";
    if (durationFactor === 0) {
      element.style.width = targetWidth + "px";
      clearInterval(intervalID);
    }
  }, MIN_INTERVAL_DURATION);
}

export function slideOut(element: HTMLElement, durationFactor: number) {
  if (element.style.display === "none") {
    // The element is already not displayed.
    // Abort transition.
    return;
  }

  // Perform transition:
  let currentWidth = element.getBoundingClientRect().width;
  const WIDTH_INCREMENT = currentWidth / durationFactor;
  const intervalID = setInterval(() => {
    durationFactor -= 1;
    currentWidth -= WIDTH_INCREMENT;
    element.style.width = currentWidth + "px";
    if (durationFactor === 0) {
      element.style.display = "none";
      element.style.width = "auto";
      clearInterval(intervalID);
    }
  }, MIN_INTERVAL_DURATION);
}
