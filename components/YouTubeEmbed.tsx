'use client';

import { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  description?: string;
  autoplay?: boolean;
  lazy?: boolean;
  className?: string;
}

export default function YouTubeEmbed({
  videoId,
  title,
  description,
  autoplay = false,
  lazy = true,
  className = '',
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${autoplay ? 'autoplay=1&' : ''}rel=0&modestbranding=1`;

  const handlePlay = () => {
    setIsLoaded(true);
    setIsPlaying(true);
  };

  if (!isLoaded) {
    return (
      <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
        {/* Aspect Ratio Container */}
        <div className="aspect-video relative">
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all duration-200">
            <button
              onClick={handlePlay}
              className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label={`播放视频: ${title}`}
            >
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
              {title}
            </h3>
            {description && (
              <p className="text-gray-300 text-sm line-clamp-2">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      
      {/* Video Info Below */}
      {description && (
        <div className="p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="mt-3 flex items-center justify-between">
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors duration-200"
            >
              在 YouTube 上观看 →
            </a>
            <a
              href="https://www.youtube.com/@guochunlinthink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200"
            >
              订阅频道
            </a>
          </div>
        </div>
      )}
    </div>
  );
}