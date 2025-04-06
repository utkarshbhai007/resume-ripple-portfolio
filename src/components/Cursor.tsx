
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    // Show the cursor when it first moves
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    // Check for elements that should change cursor
    const handleLinkHoverEvents = () => {
      const handleLinkMouseEnter = () => setLinkHovered(true);
      const handleLinkMouseLeave = () => setLinkHovered(false);

      document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]').forEach(el => {
        el.addEventListener('mouseenter', handleLinkMouseEnter);
        el.addEventListener('mouseleave', handleLinkMouseLeave);
      });

      return () => {
        document.querySelectorAll('a, button, [role="button"], input[type="submit"], input[type="button"]').forEach(el => {
          el.removeEventListener('mouseenter', handleLinkMouseEnter);
          el.removeEventListener('mouseleave', handleLinkMouseLeave);
        });
      };
    };

    addEventListeners();
    const cleanupLinkEvents = handleLinkHoverEvents();

    return () => {
      removeEventListeners();
      cleanupLinkEvents();
    };
  }, []);

  // DNA-inspired cursor patterns
  const DNAPattern = () => {
    return (
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        style={{ 
          x: position.x - 8,
          y: position.y - 8
        }}
      >
        <motion.div
          className="relative"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                width: '2px',
                height: '8px',
                backgroundColor: i % 2 === 0 ? '#0efcb6' : '#ff0eb6',
                left: '8px',
                top: '0px',
                transform: `rotate(${i * 90}deg) translateY(-12px)`,
                borderRadius: '1px'
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 800,
          damping: 25,
        }}
      >
        <div 
          className={`w-2 h-2 rounded-full ${
            linkHovered ? 'bg-accent mix-blend-difference' : 'bg-primary'
          }`}
        />
      </motion.div>

      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 1.2 : linkHovered ? 0 : 1,
          opacity: hidden ? 0 : clicked ? 0.4 : 0.15,
        }}
        transition={{
          type: "spring",
          mass: 0.5,
          stiffness: 400,
          damping: 28,
        }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-primary"></div>
      </motion.div>

      {/* DNA cursor pattern */}
      {!hidden && !clicked && !linkHovered && <DNAPattern />}
    </>
  );
};

export default Cursor;
