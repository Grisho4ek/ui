export function getBoundingAbsoluteRect(el: HTMLElement): {
  x: number;
  y: number;
  bottom: number;
  top: number;
  left: number;
  right: number;
  width: number;
  height: number;
} {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.x + window.scrollX,
    y: rect.y + window.scrollY,
    bottom: rect.bottom + window.scrollY,
    top: rect.top + window.scrollY,
    left: rect.x + window.scrollX,
    right: rect.x + window.scrollX + rect.width,
    width: rect.width,
    height: rect.height,
  };
}

export function lockScroll(isLocked: boolean) {
  document.querySelector('html')!.style.overflow = isLocked ? 'hidden' : '';
}
