import scrollama from 'scrollama';

export function initScrollama(options) {
  const scroller = scrollama();
  scroller.setup(options);
  return scroller;
}

export function destroyScrollama(scroller) {
  if (scroller) {
    scroller.destroy();
  }
}