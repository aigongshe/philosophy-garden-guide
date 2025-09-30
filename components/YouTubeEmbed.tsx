'use client';

import { useState, useRef, useEffect } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  thumbnail?: string;
  className?: string;
  autoplay?: boolean;
  showInfo?: boolean;
}

export default function YouTubeEmbed({ 
  videoId, 
  title, 
  thumbnail,
  className = '',
  autoplay = false,
  showInfo = true 
}: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  const embedUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    rel: '0',
    modestbranding: '1',
    showinfo: showInfo ? '1' : '0',
    iv_load_policy: '3',
    enablejsapi: '1',
    origin: typeof window !== 'undefined' ? window.location.origin : ''
  }).toString()}`;

  const handlePlay = () => {
    setIsLoaded(true);
    setIsPlaying(true);
  };

  const handleThumbnailClick = () => {
    handlePlay();
  };

  useEffect(() => {
    // Preload the thumbnail image
    if (thumbnailUrl) {
      const img = new Image();
      img.src = thumbnailUrl;
    }
  }, [thumbnailUrl]);

  return (
    <div className={`relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ${className}`}>
      {!isLoaded ? (
        // Thumbnail with Play Button
        <div 
          className="relative w-full h-full cursor-pointer group"
          onClick={handleThumbnailClick}
        >
          {/* Thumbnail Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulse Animation */}
              <div className="absolute inset-0 w-20 h-20 bg-red-500/30 rounded-full animate-ping"></div>
              
              {/* Main Play Button */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* YouTube Logo */}
          <div className="absolute top-4 right-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-12 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-white font-bold text-lg line-clamp-2">{title}</h3>
          </div>
        </div>
      ) : (
        // YouTube Iframe
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}

      {/* Loading Indicator */}
      {isLoaded && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

// Utility function to extract YouTube video ID from URL
export function extractYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Utility function to get YouTube thumbnail URL
export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' | 'maxresdefault' = 'maxresdefault'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Utility function to get YouTube embed URL
export function getYouTubeEmbedUrl(videoId: string, options: Record<string, string> = {}): string {
  const defaultOptions = {
    rel: '0',
    modestbranding: '1',
    showinfo: '0',
    iv_load_policy: '3',
    enablejsapi: '1'
  };
  
  const params = new URLSearchParams({ ...defaultOptions, ...options });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}