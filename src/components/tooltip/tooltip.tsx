import { ReactElement, useRef, useState } from 'react';
import { TooltipContent, Position } from './tooltip-content';
import { getBoundingAbsoluteRect } from '../../helpers';

export interface TooltipProps {
  content: JSX.Element | string;
  children: ReactElement;
  arrowClassName?: string;
  wrapperClassName?: string;
  className?: string;
  delay?: number;
  position?: Position;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  wrapperClassName = '',
  arrowClassName = '',
  className = '',
  delay = 250,
  position = 'bottom',
  disabled = false,
}: TooltipProps) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isOpened, setIsOpened] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseEnter = () => {
    if (!ref.current || disabled) return;

    const { x, y, bottom, height, width } = getBoundingAbsoluteRect(
      ref.current
    );

    if (position === 'bottom') {
      setY(bottom + 4);
      setX(x + width / 2);
    }

    if (position === 'top') {
      setY(y - 4);
      setX(x + width / 2);
    }

    if (position === 'left') {
      setY(y + height / 2);
      setX(x - 4);
    }

    if (position === 'right') {
      setY(y + height / 2);
      setX(x + width + 4);
    }

    setIsOpened(true);
  };

  const onMouseLeave = () => {
    // setIsOpened(false);
  };

  return (
    <div
      className={`inline-block ${wrapperClassName}`}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <TooltipContent
        arrowClassName={arrowClassName}
        delay={delay}
        isOpened={isOpened}
        content={content}
        position={position}
        x={x}
        y={y}
        className={className}
      />
    </div>
  );
}
