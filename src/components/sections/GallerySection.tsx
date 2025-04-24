"use client";

import React from 'react';
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';

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

  // const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
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
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-3xl p-0 bg-transparent border-none">
                        <div className="relative w-full h-full max-h-[80vh] overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={image.width}
                            height={image.height}
                            className="w-full h-auto object-contain"
                            priority
                          />
                        </div>
                      </DialogContent>
                    </Dialog>
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
    </section>
  );
};

export default GallerySection;
