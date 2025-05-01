"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GallerySectionProps {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
}

/**
 * 갤러리 섹션 컴포넌트
 * 커플 사진을 캐러셀 형태로 표시하고, 클릭 시 확대해서 볼 수 있는 기능 제공
 * 레이지 로딩 적용으로 성능 최적화
 */
const GallerySection: React.FC<GallerySectionProps> = ({
  title,
  subtitle,
  images
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // 모달 닫기 함수
  const closeModal = () => {
    setSelectedImage(null);
  };

  // ESC 키로 모달 닫기
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {subtitle && (
            <h3 className="text-sm md:text-base text-muted-foreground uppercase tracking-wider mb-2">
              {subtitle}
            </h3>
          )}
          <h2 className="text-2xl md:text-3xl font-medium font-sunflower">
            {title}
          </h2>
        </motion.div>

        {/* 갤러리 캐러셀 */}
        <div className="max-w-4xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card 
                      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedImage(image)}
                    >
                      <CardContent className="p-0 aspect-square relative">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform hover:scale-105 duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          // 레이지 로딩 적용 (첫 3개 이미지는 바로 로드)
                          loading={index < 3 ? "eager" : "lazy"}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              <CarouselPrevious className="relative static mr-2" />
              <CarouselNext className="relative static ml-2" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* 커스텀 모달 */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-3xl max-h-[90vh] bg-background p-2 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 bg-background/80 rounded-full"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </Button>
            <div className="max-h-[85vh] overflow-hidden">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt || "Gallery image"}
                width={selectedImage.width}
                height={selectedImage.height}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
