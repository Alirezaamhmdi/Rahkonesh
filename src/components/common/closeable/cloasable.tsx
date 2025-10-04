import React, { useEffect, useRef } from 'react';

interface CloseableTabProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  vertical?: boolean | null;
  children: React.ReactNode;
}

function CloseableTab({ setOpen, open, vertical = null, children }: CloseableTabProps) {
  const way = vertical === null ? "h" : vertical ? "h" : "w";
  const popRef = useRef<HTMLDivElement>(null);
  
  const MouseDownHandler = (e: MouseEvent) => { 
    if (popRef.current && !popRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    
    document.addEventListener('mousedown', MouseDownHandler);
    return () => {
      document.removeEventListener('mousedown', MouseDownHandler);
    };
  }, [open]);

  return (
    <div 
      ref={popRef} 
      className={`overflow-hidden transition-all duration-300 ${!open ? 'max-h-0 opacity-0' : 'max-h-screen opacity-100'}`}
    > 
      {children}
    </div>
  );
}

export default CloseableTab;