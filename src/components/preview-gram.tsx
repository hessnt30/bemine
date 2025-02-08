"use client";

import { Heart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { CSSProperties, useEffect, useState } from "react";

interface PreviewPostProps {
  imageURL: string;
  width: number;
  height: number;
  message: string;
}

export default function PreviewGram({
  imageURL,
  width,
  height,
  message,
}: PreviewPostProps) {
  const heartColors = ["#ff3366", "#ff66b2", "#9b59b6"]; // red, pink, purple
  const [hearts, setHearts] = useState<
    { size: number; style: CSSProperties }[]
  >([]);

  useEffect(() => {
    const generateRandomHearts = () => {
      return Array.from({ length: 30 }, () => ({
        size: Math.floor(Math.random() * 20) + 20, // Random size between 20 and 40px
        style: {
          top: `${Math.random() * 80}%`, // Random top position
          left: `${Math.random() * 80}%`, // Random left position
          transform: `rotate(${Math.random() * 360}deg)`, // Random rotation
          fill: heartColors[Math.floor(Math.random() * heartColors.length)], // Random color
        },
      }));
    };

    setHearts(generateRandomHearts());
  }, []);

  return (
    <div className="relative w-full bg-background">
      {/* Image */}
      <CldImage
        src={imageURL}
        alt="Preview"
        width={width}
        height={height}
        className="rounded-lg"
      />

      {/* Floating Hearts */}
      {hearts.map((heart, index) => (
        <Heart
          key={index}
          size={heart.size} // Each heart gets a unique size
          className="absolute"
          style={heart.style} // Each heart gets unique positioning and rotation
        />
      ))}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 text-white z-10 rounded-b-lg">
        <span className="text-lg">{message}</span>
      </div>
    </div>
  );
}
