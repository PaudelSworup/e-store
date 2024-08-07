"use client";
import { useState, MouseEvent } from "react";

interface ImageMagnifierProps {
  src: string;
  className?: string;
  width: number;
  height: number;
  alt: string;
  magnifierHeight?: number;
  magnifierWidth?: number;
  zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  className,
  width,
  height,
  alt,
  magnifierHeight = 200,
  magnifierWidth = 200,
  zoomLevel = 20,
}) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [[x, y], setXY] = useState([0, 0]);

  const mouseEnter = (e: MouseEvent<HTMLImageElement>) => {
    const el = e.currentTarget;

    const { width, height } = el.getBoundingClientRect();
    setSize([width, height]);
    setShowMagnifier(true);
  };

  const mouseLeave = (e: MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setShowMagnifier(false);
  };

  const mouseMove = (e: MouseEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    const { top, left } = el.getBoundingClientRect();

    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    setXY([x, y]);
  };

  return (
    <div className="relative inline-block">
      <img
        src={src}
        className={className}
        width={width}
        height={height}
        alt={alt}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        onMouseMove={mouseMove}
      />
      {showMagnifier && (
        <div
          style={{
            position: "absolute",
            pointerEvents: "none",
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            border: "1px solid lightgrey",
            backgroundColor: "white",
            borderRadius: "5px",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            transition: "opacity 0.2s",
            opacity: "1",
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
