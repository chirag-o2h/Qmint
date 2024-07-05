import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, placeholder, style, className }:any) => {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={imgRef} style={style} className={className}>
      {isVisible ? (
        <img src={src} alt={alt} loading="eager" style={style} />
      ) : (
        <img src={placeholder} alt="Loading..." style={style} />
      )}
    </div>
  );
};

export default LazyImage;
