import * as React from 'react';
import { createPortal } from 'react-dom';
import { useDebounce } from '../../hooks';
import { cn } from '../../utils';
import { useSpring, animated } from '@react-spring/web';

export type Position = 'top' | 'bottom' | 'left' | 'right';

interface TooltipContentProps {
  isOpened: boolean;
  content: string | JSX.Element;
  position: Position;
  delay: number;
  x: number;
  y: number;
  className?: string;
  arrowClassName?: string;
}

export const TooltipContent = ({
  isOpened,
  content,
  position,
  delay,
  x,
  y,
  className = '',
  arrowClassName = '',
}: TooltipContentProps) => {
  const [mounted, setMounted] = React.useState(false);
  const containerRef = React.useRef<HTMLElement | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const debouncedIsOpened = useDebounce(isOpened, delay);

  const animation = useSpring({
    opacity: !isOpened ? 0 : debouncedIsOpened ? 1 : 0,
    config: { duration: 250 },
  });

  React.useEffect(() => {
    const CONTAINER_ID = 'tooltips-portal';
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
      container = document.createElement('div');
      container.id = CONTAINER_ID;
      document.body.appendChild(container);
    }
    containerRef.current = container;
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!debouncedIsOpened) {
    return null;
  }

  return createPortal(
    <animated.div style={animation} ref={ref}>
      <div
        className={cn(
          'z-100 m-0 break-words bg-black bg-opacity-80 text-white text-sm leading-4 px-2 py-1 rounded whitespace-nowrap absolute',
          position === 'bottom' && '-translate-x-1/2',
          position === 'top' && '-translate-x-1/2 -translate-y-full',
          position === 'left' &&
            'left-0 -translate-y-1/2 -translate-x-[calc(100%+4px)]',
          position === 'right' && '-translate-y-1/2 translate-x-1',
          className
        )}
        style={{
          top: y,
          left: x,
        }}
      >
        {content}
        <div
          className={cn(
            'w-0 h-0 border-solid border-1 border-t-0 border-r-4 border-b-4 border-l-4 border-transparent border-b-black border-opacity-80 absolute',
            position === 'bottom' && '-top-1 left-1/2 -translate-x-1/2',
            position === 'top' &&
              'left-1/2 top-full rotate-180 -translate-x-1/2',
            position === 'left' && 'right-[-6px] top-[calc(50%-2px)] rotate-90',
            position === 'right' &&
              'left-[-6px] top-[calc(50%-2px)] -rotate-90',
            arrowClassName
          )}
        />
      </div>
    </animated.div>,
    containerRef.current as HTMLElement
  );
};
