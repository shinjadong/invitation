"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  coupleNames: {
    bride: {
      firstName: string;
      lastName: string;
      engName?: string;
    };
    groom: {
      firstName: string;
      lastName: string;
      engName?: string;
    };
  };
  weddingDate: string;
  weddingLocation: string;
  backgroundImage: string;
  message?: string;
}

/**
 * 청첩장 메인 히어로 섹션 컴포넌트
 * 전체 화면 배경 이미지와 함께 커플 이름, 결혼 날짜, 장소 등 핵심 정보 표시
 */
const HeroSection: React.FC<HeroSectionProps> = ({
  coupleNames,
  weddingDate,
  weddingLocation,
  backgroundImage,
  message
}) => {
  // 애니메이션 변형 설정
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="main" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt="Wedding background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" /> {/* 배경 이미지 위에 오버레이 */}
      </div>

      {/* 텍스트 콘텐츠 */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <h2 className="text-2xl md:text-3xl font-light font-sunflower">Happy Wedding Day</h2>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-3xl md:text-5xl font-medium">
            <div className="flex flex-col items-center">
              <span className="font-sunflower">{coupleNames.groom.firstName}</span>
              {coupleNames.groom.engName && (
                <span className="text-sm md:text-base font-light mt-1">{coupleNames.groom.engName}</span>
              )}
            </div>
            <span className="text-primary">&amp;</span>
            <div className="flex flex-col items-center">
              <span className="font-sunflower">{coupleNames.bride.firstName}</span>
              {coupleNames.bride.engName && (
                <span className="text-sm md:text-base font-light mt-1">{coupleNames.bride.engName}</span>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-4">
          <p className="text-lg md:text-xl font-light">{weddingDate}</p>
          <p className="text-lg md:text-xl font-light">{weddingLocation}</p>
        </motion.div>

        {message && (
          <motion.div variants={itemVariants} className="max-w-md mx-auto mt-8">
            <p className="text-sm md:text-base font-light leading-relaxed">{message}</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default HeroSection;
