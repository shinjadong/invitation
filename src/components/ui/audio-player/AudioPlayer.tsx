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
    // 컴포넌트가 마운트될 때 오디오 요소 생성
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.muted = false; // 초기에 음소거 해제
      audioRef.current = audio;
      
      // 이벤트 리스너 등록
      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('error', (e) => console.error('오디오 로드 오류:', e));
    }
    
    // 자동 재생 시도
    const playAudio = async () => {
      try {
        if (audioRef.current && autoPlay) {
          // muted 설정을 통해 자동 재생 정책 우회
          audioRef.current.muted = true;
          await audioRef.current.play();
          // 재생이 시작되면 음소거 해제 (선택적)
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.muted = false;
              setIsMuted(false);
            }
          }, 1000);
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('자동 재생 오류:', error);
        setIsPlaying(false);
      }
    };
    
    playAudio();
    
    // 클린업 함수
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [audioSrc, autoPlay]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error('오디오 재생 오류:', error);
        });
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex items-center gap-2 rounded-full bg-white/30 backdrop-blur-md p-2 shadow-lg">
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
    </div>
  );
} 