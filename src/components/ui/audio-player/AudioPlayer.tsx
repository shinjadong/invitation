'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  audioSrc: string;
  autoPlay?: boolean;
}

export function AudioPlayer({ audioSrc, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (autoPlay) {
        // 자동 재생은 사용자 상호작용 이후에만 가능하도록 브라우저에서 제한합니다.
        // 일부 모바일 브라우저에서는 작동하지 않을 수 있습니다.
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('자동 재생이 차단되었습니다:', error);
              setIsPlaying(false);
            });
        }
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('오디오 재생 오류:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-md p-2 shadow-lg">
      <button
        onClick={togglePlay}
        className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors"
        aria-label={isPlaying ? '음악 일시정지' : '음악 재생'}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      
      <button
        onClick={toggleMute}
        className={cn(
          "rounded-full p-2 text-foreground hover:bg-accent transition-colors",
          isMuted && "text-muted-foreground"
        )}
        aria-label={isMuted ? '음소거 해제' : '음소거'}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
      
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        className="hidden"
      />
    </div>
  );
} 