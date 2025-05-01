"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { Card, CardContent } from '@/components/ui/card';

interface ParentInfo {
  relation: string; // '아버지' | '어머니'
  name: string;
  phoneNumber?: string;
}

interface PersonInfo {
  fullName: string;
  engName?: string;
  description?: string;
  image: string;
  parents?: ParentInfo[];
  tags?: string[];
  phoneNumber?: string;
}

interface CoupleSectionProps {
  title: string;
  subtitle?: string;
  bride: PersonInfo;
  groom: PersonInfo;
}

/**
 * 신랑신부 및 부모님 정보 섹션 컴포넌트
 * 신랑신부의 사진, 소개, 해시태그와 부모님 정보 표시
 */
const CoupleSection: React.FC<CoupleSectionProps> = ({
  title,
  subtitle,
  bride,
  groom
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // 애니메이션 설정
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
    <section id="couple" className="py-20 bg-muted/30">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* 신부 정보 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6">
              <Image
                src={bride.image}
                alt={bride.fullName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 12rem, 16rem"
              />
            </div>
            
            <h3 className="text-xl font-medium mb-1">{bride.fullName}</h3>
            {bride.engName && (
              <p className="text-sm text-muted-foreground mb-3">{bride.engName}</p>
            )}
          </motion.div>

          {/* 신랑 정보 */}
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6">
              <Image
                src={groom.image}
                alt={groom.fullName}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 12rem, 16rem"
              />
            </div>
            
            <h3 className="text-xl font-medium mb-1">{groom.fullName}</h3>
            {groom.engName && (
              <p className="text-sm text-muted-foreground mb-3">{groom.engName}</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
