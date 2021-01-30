import { debounce, throttle } from 'lodash';

/**
 * find scroll position at the end of scroll event
 * fires callback1 if we're reaching bottom line of a given element
 * (some pixels reserved to load in advance)
 * isEndOfMoviesRef.current is updated in a callback after fetched result
 */
export const throttledDetectBottomLine = (
  element: HTMLElement | null,
  callback1: Function,
  callback2?: Function,
  delay: number = 500,
  reserve: number = 100
) =>
  throttle(() => {
    if (!element) return;
    const scroll = window.pageYOffset + window.innerHeight;
    const offset = element.offsetTop + element.offsetHeight;

    if (scroll > offset - reserve) {
      callback1 && callback1();
    } else {
      callback2 && callback2();
    }
  }, delay);

/**
 * find scroll position at the end of scroll event
 * fires callback1 if we're reaching bottom line of a given element
 * (some pixels reserved to load in advance)
 * isEndOfMoviesRef.current is updated in a callback after fetched result
 */
export const debouncedDetectBottomLine = (
  element: HTMLElement | null,
  callback1: Function,
  callback2?: Function,
  delay: number = 500,
  reserve: number = 100
) =>
  debounce(() => {
    if (!element) return;
    const scroll = window.pageYOffset + window.innerHeight;
    const offset = element.offsetTop + element.offsetHeight;

    if (scroll > offset - reserve) {
      callback1 && callback1();
    } else {
      callback2 && callback2();
    }
  }, delay);
