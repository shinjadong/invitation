"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
 * 신랑신부의 사진, 소개, 해시태그와 부모님 정보 및 연락처 표시
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

  // 연락처 다이얼로그 컴포넌트
  const ContactDialog = ({ person, title }: { person: PersonInfo, title: string }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4">
          연락하기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{title} 연락처</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex flex-col items-center mb-4">
              <h4 className="font-medium">{person.fullName}</h4>
              {person.phoneNumber && (
                <div className="flex gap-2 mt-2">
                  <a href={`tel:${person.phoneNumber}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    전화
                  </a>
                  <a href={`sms:${person.phoneNumber}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    문자
                  </a>
                </div>
              )}
            </div>

            {person.parents && person.parents.length > 0 && (
              <div className="space-y-4 border-t pt-4">
                <h5 className="text-center text-sm font-medium text-muted-foreground mb-2">혼주</h5>
                {person.parents.map((parent, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{parent.relation}</span>
                      <span className="font-medium">{parent.name}</span>
                    </div>
                    {parent.phoneNumber && (
                      <div className="flex gap-2 mt-2">
                        <a href={`tel:${parent.phoneNumber}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          전화
                        </a>
                        <a href={`sms:${parent.phoneNumber}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          </svg>
                          문자
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

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
            
            {bride.description && (
              <p className="text-sm text-center max-w-xs mb-4">{bride.description}</p>
            )}
            
            {bride.tags && bride.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {bride.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <ContactDialog person={bride} title="신부측" />
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
            
            {groom.description && (
              <p className="text-sm text-center max-w-xs mb-4">{groom.description}</p>
            )}
            
            {groom.tags && groom.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {groom.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <ContactDialog person={groom} title="신랑측" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
