"use client";

import React from "react";

// Star interface defining the properties of a single star
interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  flickerDirection: number;
}

// Props for the StarryBackground component
interface StarryBackgroundProps {
  starCount?: number;
  starColor?: string;
  flickerSpeed?: number;
  backgroundColor?: string;
  minStarAlpha?: number;
  maxStarAlpha?: number;
  maxStarRadius?: number;
}

/**
 * A lightweight and configurable starry background component for React.
 * Renders an animated starfield on an HTML canvas.
 *
 * @param {StarryBackgroundProps} props - The component props.
 * @returns {React.ReactElement} A canvas element with the starry background.
 */
const StarryBackground: React.FC<StarryBackgroundProps> = ({
  starCount = 800,
  starColor = "rgba(255, 255, 255, 0.9)",
  flickerSpeed = 0.005,
  backgroundColor = "#00001a",
  minStarAlpha = 0.1,
  maxStarAlpha = 1.0,
  maxStarRadius = 1.2,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const starsRef = React.useRef<Star[]>([]);
  const animationFrameId = React.useRef<number>();

  // Function to initialize stars
  const initializeStars = (canvas: HTMLCanvasElement) => {
    starsRef.current = [];
    for (let i = 0; i < starCount; i++) {
      starsRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * maxStarRadius,
        alpha: Math.random() * (maxStarAlpha - minStarAlpha) + minStarAlpha,
        flickerDirection: Math.random() > 0.5 ? 1 : -1,
      });
    }
  };

  // Animation loop
  const animate = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    starsRef.current.forEach((star) => {
      // Update star alpha for flickering effect
      star.alpha += flickerSpeed * star.flickerDirection;

      // Reverse flicker direction if alpha goes out of bounds
      if (star.alpha >= maxStarAlpha || star.alpha <= minStarAlpha) {
        star.flickerDirection *= -1;
      }

      // Clamp alpha to valid range
      star.alpha = Math.max(minStarAlpha, Math.min(maxStarAlpha, star.alpha));

      // Draw the star
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      const newStarColor = starColor.replace(/(\d(\.\d)?)\)/, `${star.alpha})`);
      ctx.fillStyle = newStarColor;
      ctx.fill();
    });

    animationFrameId.current = requestAnimationFrame(() => animate(ctx));
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars(canvas);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars(canvas);
      }
    };

    window.addEventListener("resize", handleResize);

    animate(ctx);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [
    starCount,
    starColor,
    flickerSpeed,
    backgroundColor,
    minStarAlpha,
    maxStarAlpha,
    maxStarRadius,
  ]);

  return (
    // Use position: fixed to position relative to the viewport
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: 'url("/moon-docs/bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.8",
        }}
      />
    </div>
  );
};

export default StarryBackground;
