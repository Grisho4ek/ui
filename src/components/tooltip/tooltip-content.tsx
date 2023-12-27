import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDebounce } from '../../hooks';
import { CSSTransition } from 'react-transition-group';
import { cn } from '../../utils';

export type Position = 'top' | 'bottom' | 'left' | 'right';

interface Props {
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
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const debouncedIsOpened = useDebounce(isOpened, delay);

  useEffect(() => {
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

  return createPortal(
    <CSSTransition
      in={isOpened ? debouncedIsOpened : isOpened}
      timeout={{
        exit: 250,
      }}
      nodeRef={ref}
      unmountOnExit
      classNames={{
        enterDone: 'fadeIn',
        exit: 'fadeOut',
      }}
    >
      <div
        className={cn(
          'z-100 m-0 break-words bg-black bg-opacity-80 text-white text-sm leading-4 px-2 py-1 rounded opacity-0 whitespace-nowrap animate-fadeIn absolute',
          position === 'bottom' && '-translate-x-1/2',
          position === 'top' && '-translate-x-1/2 -translate-y-full',
          position === 'left' && '-translate-x-full translate-y-1/2',
          position === 'right' && 'translate-y-1/2',
          className
        )}
        ref={ref}
        style={{
          top: y,
          left: x,
        }}
      >
        {content}
        <div
          className={cn(
            'w-0 h-0 border-solid border-1 border-t-0 border-r-1 border-b-1 border-l-1 border-transparent border-b-black border-opacity-80 absolute',
            position === 'bottom' &&
              '-translate-x-1/2 -top-1 left-[calc(50%-4px)]',
            position === 'top' && 'top-full rotate-180',
            position === 'left' && 'right-[-6px] top-[calc(50%-2px)] rotate-90',
            position === 'right' &&
              'left-[-6px] top-[calc(50%-2px)] -rotate-90',
            arrowClassName
          )}
        />
      </div>
    </CSSTransition>,
    containerRef.current as HTMLElement
  );
};
