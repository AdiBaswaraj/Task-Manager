import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

const Tooltip = ({ children, text, position = "bottom", space = 5 }) => {
  const [open, setOpen] = useState(false);
  const tooltipRef = useRef();
  const elementRef = useRef();

  const handleMouseEnter = () => {
    if (!tooltipRef.current || !elementRef.current) return;

    setOpen(true);
    const { x, y } = getPosition(elementRef.current, tooltipRef.current, position, space);
    tooltipRef.current.style.left = `${x}px`;
    tooltipRef.current.style.top = `${y}px`;
  };

  const handleMouseLeave = () => setOpen(false);

  const getPosition = (element, tooltip, position, space) => {
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    const offset = space + 10;
    const centerX = rect.left + (rect.width - tooltipRect.width) / 2;
    const centerY = rect.top + (rect.height - tooltipRect.height) / 2;

    const positions = {
      top:    { x: centerX, y: rect.top - tooltipRect.height - offset },
      bottom: { x: centerX, y: rect.bottom + offset },
      left:   { x: rect.left - tooltipRect.width - offset, y: centerY },
      right:  { x: rect.right + offset, y: centerY },
    };

    return positions[position] || positions.bottom;
  };

  const tooltipBase = `
    fixed z-50 w-max max-w-[150px] px-4 py-2 text-sm rounded-md text-white 
    bg-zinc-800 shadow-lg border border-zinc-600 
    text-center pointer-events-none transition-opacity duration-150 
    ${open ? "opacity-100" : "opacity-0"}
  `;

  const arrowBase = `
    after:absolute after:content-[''] after:border-[8px] after:border-transparent
  `;

  const positionStyles = {
    top: "after:left-1/2 after:top-full after:-translate-x-1/2 after:border-t-zinc-800",
    bottom: "after:left-1/2 after:bottom-full after:-translate-x-1/2 after:border-b-zinc-800",
    left: "after:top-1/2 after:left-full after:-translate-y-1/2 after:border-l-zinc-800",
    right: "after:top-1/2 after:right-full after:-translate-y-1/2 after:border-r-zinc-800",
  };

  return (
    <>
      {React.cloneElement(React.Children.only(children), {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        ref: elementRef,
      })}

      <Portal>
        <div
          ref={tooltipRef}
          className={`${tooltipBase} ${arrowBase} ${positionStyles[position] || ""}`}
        >
          {text}
        </div>
      </Portal>
    </>
  );
};

export default Tooltip;
