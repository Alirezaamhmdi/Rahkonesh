import React, { useState, useEffect, useRef, useCallback } from 'react';
import './minipicture.css'
interface  MiniPictureProps {
  readonly url: string;
  shouldLoad?: boolean;
  classname?: string;
  readonly onClick?: () => void;
  selected?: boolean;
  ref?: React.Ref<HTMLImageElement>;
  rounded ?: string ; 
  loaded ?: number 
  onFail ?: ""
}

const MiniPicture = React.forwardRef<HTMLImageElement, MiniPictureProps>(({
  url,
  shouldLoad = true,
  classname = '',
  onClick = () => {},
  selected = false,
  rounded = 'xl' 
  ,onFail = ""
}, forwardedRef) => {
  // "use memo"
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const internalRef = useRef<HTMLImageElement>(null);
  const ref = forwardedRef || internalRef;
  const mountedRef = useRef(true);

  const handleLoad = useCallback(() => {
    if (mountedRef.current) {
      setIsLoading(false);
    }
  }, []);

  const handleError = useCallback(() => {
    if (mountedRef.current) {
      setIsLoading(true);
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    
    if (!url || !shouldLoad) {
      setHasError(true);
      setIsLoading(true);
      return;
    }

    // Reset state for new image
    setHasError(false);
    setIsLoading(true);

    const  img = new Image();
    img.src = url;

    img.onload = handleLoad;
    img.onerror = handleError;
    img.onloadeddata = () => {
      setIsLoading(false)
    }
    return () => {
      mountedRef.current = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [url, shouldLoad, handleLoad, handleError]);

  return (
    <div 
  className={`relative  rounded-xl w-full  shrink-0 overflow-hidden ${classname} ${
    rounded + (selected ? ' ring-2 ring-blue-500 ' : ' ')
  }`}
  onClick={onClick}
>
  {isLoading && (
    <div className="absolute  flex items-center justify-center bg-gray-100 select-none h-full w-full">
      <div className="w-full h-full  animate-loading select-none" />
    </div>
  )}

  {!isLoading && (
    <img
      ref={ref}
      src={shouldLoad ? url : undefined}
      className="w-full  h-full  select-none"
      alt=""
      onLoad={handleLoad}
      onError={handleError}
    />
  )}
</div>
  );
});

export default MiniPicture;