import React from "react";

interface PhotoCardProps {
  label: string; // teks di kiri
  imageSrc: string; // path atau url gambar
  width?: number; // ukuran lebar default 400
  height?: number; // ukuran tinggi default 400
  className?: string; // untuk custom styling container
}

export function PhotoCard({
  label,
  imageSrc,
  width = 400,
  height = 400,
  className = "",
}: PhotoCardProps) {
  return (
    <div
      className={`relative w-full md:w-[500px] h-[300px] md:h-[500px] ${className}`}
    >
      <p
        className="absolute left-[-8px] sm:left-[-15px] md:left-[-10px] lg:left-[-15px] 
        top-60 sm:top-110 md:top-80 lg:md:top-110 
        -translate-y-1/2 -rotate-90 origin-left text-[#868a8f] tracking-widest"
        style={{ fontSize: "clamp(8px, 1.5vw, 12px)" }}
      >
        {label}
      </p>

      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`}>
        <clipPath id="clip2">
          <polygon points="0,0 380,0 400,20 400,400 30,400 0,355" />
        </clipPath>

        <image
          href={imageSrc}
          width={width}
          height={height}
          clipPath="url(#clip2)"
          preserveAspectRatio="xMidYMid slice"
        />

        <polygon
          points="0,0 380,0 400,20 400,400 30,400 0,355"
          stroke="white"
          fill="none"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
