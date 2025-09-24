import React, { ReactNode } from "react";

interface PhotoCardProps {
  label: string;
  imageSrc: string; 
  width?: number;
  height?: number; 
  polygonPoints?: string;
  children?: ReactNode; 
  className?: string;
}

export function PhotoCard({
  label,
  imageSrc,
  width = 400,
  height = 400,
  polygonPoints,
  children,
  className = "",
}: PhotoCardProps) {
  const defaultPolygon = `0,0 ${width - 20},0 ${width},20 ${width},${height} 30,${height} 0,${
    height - 45
  }`;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: "100%", maxWidth: `${width}px`, height: "auto" }}
    >
      <div className="relative w-full h-70 md:w-[430px] md:h-[430px]">
        <p
          className="absolute -left-2 top-55 md:-left-5 md:top-90 md:-translate-y-1/2 -rotate-90 origin-left text-[#868a8f] tracking-widest"
          style={{ fontSize: "clamp(8px, 1.5vw, 12px)" }}
        >
          {label}
        </p>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${width} ${height}`}
        >
          <clipPath id="clip2">
            <polygon points={polygonPoints ?? defaultPolygon} />
          </clipPath>

          <image
            href={imageSrc}
            width={width}
            height={height}
            clipPath="url(#clip2)"
            preserveAspectRatio="xMidYMid slice"
          />

          <polygon
            points={polygonPoints ?? defaultPolygon}
            stroke="white"
            fill="none"
            strokeWidth="1"
          />
        </svg>

        {children && <div className="absolute inset-0 z-10">{children}</div>}
      </div>
    </div>
  );
}

