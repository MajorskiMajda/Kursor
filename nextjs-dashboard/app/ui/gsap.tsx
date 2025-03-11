"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const GSAPComponent = () => {
  const boxRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(boxRef.current, { x: 100, duration: 1 })
      .to(boxRef.current, { y: 100, duration: 1 })
      .to(boxRef.current, { rotation: 360, duration: 1 });
  }, []);

  return (
    <div>
      <div
        ref={boxRef}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          margin: 'auto',
        }}
      >
        GSAP Box
      </div>
    </div>
  );
};

export default GSAPComponent;
