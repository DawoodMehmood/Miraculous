// File: ClickAnimation.js
// import React from 'react';
import Confetti from 'react-dom-confetti';

const ClickAnimation = ({ clickPosition }) => {
  const config = {
    angle: 90,
    spread: 45,
    startVelocity: 35,
    elementCount: 50,
    dragFriction: 0.1,
    duration: 2000,
    stagger: 3,
    width: '10px',
    height: '10px',
    colors: ['#ff0000', '#00ff00', '#0000ff'], // Add your desired colors here
  };

  return (
    <Confetti
      active
      config={config}
      style={{ position: 'fixed', top: clickPosition.y, left: clickPosition.x }}
    />
  );
};

export default function ClickAnimationWrapper(props) {
  return <ClickAnimation {...props} />;
}
