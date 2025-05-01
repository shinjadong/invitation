'use client';

import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { AudioPlayer } from './AudioPlayer';

export default function AudioPlayerWrapper() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AudioPlayer 
        audioSrc="https://bhmrakolqc17mtsl.public.blob.vercel-storage.com/wedding-bgm-rTpLCrgAUDIQnLVOZ2oz5XwhZLOL4k.mp3" 
        autoPlay={true} 
      />
    </div>
  );
} 