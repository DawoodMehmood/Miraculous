// File: ClickAnimationHOC.js
import { useState, useEffect } from 'react';
import ClickAnimation from './ClickAnimation';

const withClickAnimation = (WrappedComponent) => {
  const WithClickAnimation = (props) => {
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

    const handleClick = (event) => {
      const { clientX, clientY } = event;
      setClickPosition({ x: clientX, y: clientY });
    };

    useEffect(() => {
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, []);

    return (
      <>
        <ClickAnimation clickPosition={clickPosition} />
        <WrappedComponent {...props} />
      </>
    );
  };

  WithClickAnimation.displayName = `withClickAnimation(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithClickAnimation;
};

export default withClickAnimation;
